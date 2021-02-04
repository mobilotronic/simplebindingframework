import {
    ISBFBindingHandlerOptions,
    ISBFBindingHandlerRepositoryItem,
    ISBFBindingHandlersRepository,
    ISBFDictionary
} from "./interfaces";
import {SBF_PARENT_BINDING_CONTEXT, SBFCommon, SBFReservedWordDictionary} from "./sbfCommon";

// noinspection JSUnfilteredForInLoop
export class SBFBindingsParser{
    private onlyLettersRegEx: RegExp = new RegExp(/[a-z]+/);
    private customSplit(bindingString:string,separator:string=","):Array<string>{
        let commaIndexes = [];
        let curlyBraceStarted = false;
        let curlyBraceEnded = true;
        let result = [];
        for(let i=0;i<=bindingString.length-1;i++){
            if(bindingString[i] == "{") {
                curlyBraceStarted = true;
                curlyBraceEnded = false;
            }
            if(bindingString[i] == "}") {
                curlyBraceEnded = true;
                curlyBraceStarted = false;
            }
            if(bindingString[i]== separator && curlyBraceEnded == true){
                commaIndexes.push(i);
            }
        }
        commaIndexes.forEach((commaIndex,arrayIndex,theArray)=>{
            if(arrayIndex == 0){
                result.push(bindingString.substr(0,commaIndex));
            }
            else{
                result.push(bindingString.substr(theArray[arrayIndex-1]+1,commaIndex- (theArray[arrayIndex-1]+1)));
            }
        });
        result.push(bindingString.substr(commaIndexes[commaIndexes.length-1]+1));
        return result;
    }
    // noinspection JSMethodCanBeStatic
    private isBindingStringBindingOptionsObject(bindingString:string):boolean{
        return typeof bindingString == "string" && bindingString[0] == "{" && bindingString[bindingString.length-1] == "}";
    }
    private isSubBindingStringBindingOptionsObject(bindingString:string):boolean{
        return typeof bindingString == "string" && bindingString.indexOf("{") == bindingString.indexOf(":")+1 && bindingString[bindingString.length-1] == "}";
    }
    private bindingStringToObject(bindingString:string):any{
        let result  = {};
        bindingString = bindingString.substr(bindingString.indexOf("{")+1,bindingString.lastIndexOf("}")-1);
        let splitProperties = (bindingString.indexOf("{") >= 0 || bindingString.indexOf("}") >= 0) ? this.customSplit(bindingString) : bindingString.split(",");
        splitProperties.forEach((p)=>{
            //if the sub string is an object, then iterate through its properties.
            if(this.isSubBindingStringBindingOptionsObject(p)){
                //using recursion to parse all the sub properties.
                let subBindingProperty = p.substr(0,p.indexOf(":"));
                result[subBindingProperty] = this.bindingStringToObject(p.substr(p.indexOf(":")+1));
            }
            else {
                let prop = p.split(":");
                result[prop[0]] = prop[1];
            }
        });
        return result;
    }
    /**
     * Takes in a dotted string and tries to find the property in the given binding context.
     * @param optionValue - The option value.
     * @param bindingContext - The binding context.
     * @param element - The binding element.
     * @private
     */
    private dottedBindingOptionToValue(optionValue:string,bindingContext:any,element:Element):any{
        let currentBindingContext;
        let splitProperties:Array<string> = optionValue.split(".");
        if(optionValue.indexOf(SBFReservedWordDictionary.$window) >= 0) {
            currentBindingContext = window;
            if(currentBindingContext && !currentBindingContext[splitProperties[0]])
                SBFCommon.throwError("referenceError",`Binding context was set to '$window' but property ${splitProperties[0]} doesn't exist.` );
        }
        if(optionValue.indexOf(SBFReservedWordDictionary.$parent) >= 0) {
            currentBindingContext = element[SBF_PARENT_BINDING_CONTEXT];
            if(currentBindingContext && !currentBindingContext[splitProperties[0]])
                SBFCommon.throwError("referenceError",`Binding context was set to '$parent' but property ${splitProperties[0]} doesn't exist.` );
        }
        if(!currentBindingContext)
            currentBindingContext = bindingContext;
        let bindingContextPropertyValue = null;
        //iterate through all properties, till the last.
        splitProperties.forEach((propName)=>{
            if(!bindingContextPropertyValue)
                bindingContextPropertyValue = currentBindingContext[propName];
            else
                bindingContextPropertyValue = bindingContextPropertyValue[propName];
        });
        if(typeof bindingContextPropertyValue == "string"){
            if(!this.onlyLettersRegEx.test(bindingContextPropertyValue)){
                bindingContextPropertyValue = parseFloat(bindingContextPropertyValue);
            }
        }
        return bindingContextPropertyValue;
    }

    private stringBindingOptionToValue(optionValue:string,bindingContext:any,element:Element):any{
        //if the binding value has a dot in it, assume it's a sub property of the bindingContext.
        let result = optionValue.indexOf(".") >= 0 ? this.dottedBindingOptionToValue(optionValue, bindingContext, element) :
            bindingContext[optionValue] ? bindingContext[optionValue] : optionValue;
        if(typeof result == "string"){
            if(!this.onlyLettersRegEx.test(result)){
                result = parseFloat(result);
            }
        }
        return result;
    }

    private objectBindingOptionToValue(obj:object,bindingContext:any,element:any){
        for(let prop in obj){
            if(typeof obj[prop] == "object")
                this.objectBindingOptionToValue(obj[prop],bindingContext,element)
            else
                obj[prop] = this.stringBindingOptionToValue(obj[prop] ,bindingContext,element);
        }
    }

    /**
     * Takes a binding handler's options string and returns a binding options object for the binding handler to use.
     * @param bindingHandlerOptions - The specific binding handler's options string.
     * @param bindingContext - The current binding context of the binding handler, to bind options against.
     * @param bindingHandler - The binding handler to create options for.
     * @param element - The binding element.
     */
    private bindingStringToBindingHandlerOptions<BindingOptions>(bindingHandlerOptions:string,bindingContext:any,bindingHandler:ISBFBindingHandlerRepositoryItem,element:Element):BindingOptions{
        //if the binding string is in object/verbose format, meaning within curly braces, then
        //make it an object and use it. if not format it first before using it.
        let options = this.isBindingStringBindingOptionsObject(bindingHandlerOptions) ? this.bindingStringToObject(bindingHandlerOptions) :
            this.bindingStringToObject(bindingHandler.formatBindingOptions(bindingHandlerOptions));
        for(let opt in options){
            //if the property type is not a string assume it's an object.
            if(typeof options[opt] == "object"){
                this.objectBindingOptionToValue(options[opt],bindingContext,element);
            }
            else{
                options[opt] = this.stringBindingOptionToValue(options[opt],bindingContext,element);
            }
        }
        options["isBindingHandlerOptionsObject"] = true;
        return options;
    }
    /**
     * Takes in a binding options string and returns a key/value pair dictionary for each binding handler declared.
     * @param bindingOptions - The binding options string.
     * @param bindingHandlersRepository - The binding handlers repository.
     * @param bindingContext - The binding context.
     * @param element - The binding element.
     */
    parseBindingOptions(bindingOptions:string,bindingHandlersRepository:ISBFBindingHandlersRepository,bindingContext:any,element:Element):ISBFDictionary<ISBFBindingHandlerOptions>{
        let result : ISBFDictionary<ISBFBindingHandlerOptions> = {};
        let splitBindingHandlers = bindingOptions.split(";");
        splitBindingHandlers.forEach((bindingHandler)=>{
            let firstColon = bindingHandler.indexOf(":");
            let bindingHandlerName = bindingHandler.substr(0,firstColon);//.replace(/[{}]/g,"");
            let bindingHandlerValue = bindingHandler.substr(firstColon+1);//.replace(/[{}]/g,"");
            if(bindingHandlersRepository[bindingHandlerName])
                result[bindingHandlerName] = this.bindingStringToBindingHandlerOptions(bindingHandlerValue,bindingContext,bindingHandlersRepository[bindingHandlerName],element);
        });
        return result;
    }
}