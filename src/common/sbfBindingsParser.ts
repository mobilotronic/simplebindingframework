import {
    ISBFBindingHandlerOptions,
    ISBFBindingHandlerRepositoryItem,
    ISBFBindingHandlersRepository,
    ISBFDictionary, ISBFTextHandlerOptions, ISBFValidationRule
} from "./interfaces";
import {SBF_PARENT_BINDING_CONTEXT, SBFCommon, SBFReservedWordDictionary,isBindingHandlerOptionsObject,isSBFReservedObject} from "./sbfCommon";
import {defaultRuleRepository} from "./sbfObservable";

const boolRegEx = new RegExp(/true|false|yes|no/ig);


// noinspection JSUnfilteredForInLoop
export class SBFBindingsParser {
    private onlyLettersRegEx: RegExp = new RegExp(/[a-z]+/);

    private customSplit(bindingString: string, separator: string = ","): Array<string> {
        let commaIndexes = [];
        let curlyBraceStarted = false;
        let curlyBraceEnded = true;
        let result = [];
        //iterate through the binding string, taking into account curly braces.
        for (let i = 0; i <= bindingString.length - 1; i++) {
            if (bindingString[i] == "{") {
                curlyBraceStarted = true;
                curlyBraceEnded = false;
            }
            if (bindingString[i] == "}") {
                curlyBraceEnded = true;
                curlyBraceStarted = false;
            }
            if (bindingString[i] == separator && curlyBraceEnded == true) {
                commaIndexes.push(i);
            }
        }
        //finally add the length of the string, so the last comma can be processed.
        commaIndexes.push(bindingString.length);
        commaIndexes.forEach((commaIndex, arrayIndex, theArray) => {
            if (arrayIndex == 0) {
                result.push(bindingString.substring(0, commaIndex));
            } else {
                result.push(bindingString.substring(theArray[arrayIndex -1] + 1, commaIndex));
            }
        });
        result.push(bindingString.substring(commaIndexes[commaIndexes.length - 1] + 1));
        return result;
    }

    // noinspection JSMethodCanBeStatic
    private isBindingStringObject(bindingString: string): boolean {
        return typeof bindingString == "string" && bindingString[0] == "{" && bindingString[bindingString.length - 1] == "}";
    }

    private isSubBindingStringObject(bindingString: string): boolean {
        return typeof bindingString == "string" && bindingString.indexOf("{") == bindingString.indexOf(":") + 1 && bindingString[bindingString.length - 1] == "}";
    }

    private processValidationRules(bindingString:string) : Array<ISBFValidationRule>{
        //first take out the array square braces
        let validationRulesString = bindingString.replace("[","").replace("]","");
        //then get each validation rule, by splitting the string by comma
        let validationRules = validationRulesString.split(",");
        let result = [];
        validationRules.forEach((validationRuleString)=>{
            let validationRule = validationRulesString.replace('{','').replace('}','').replace("'",'').replace("'","").split(':');
            if(defaultRuleRepository[validationRule[1]]){
                result.push(defaultRuleRepository[validationRule[1]]);
            }
        });
        result[isSBFReservedObject] = true;
        return result;
    }

    /**
     * This method takes in a binding string and returns a binding object, which is then used by the binding handler.
     * @param bindingString
     */
    private bindingStringToObject(bindingString: string): any {
        let result = {};
        bindingString = bindingString.substring(bindingString.indexOf("{") + 1, bindingString.lastIndexOf("}"));
        // if the string starts with curly braces, it is assumed to be a complex structure/object.
        let splitProperties = (bindingString.indexOf("{") >= 0 || bindingString.indexOf("}") >= 0) ? this.customSplit(bindingString) : bindingString.split(",");
        splitProperties.forEach((p) => {
            if(SBFReservedWordDictionary.stringHasReservedWord(p)){
                let prop = p.split(":");
                //if the binding string has validation Rules.
                if(p.indexOf(SBFReservedWordDictionary.$validationRules) >= 0){
                    let validationRules = this.processValidationRules(p.substring(p.indexOf(":")+1));
                    if(validationRules.length > 0){
                        result[SBFReservedWordDictionary.$validationRules.replace('$','')] = validationRules;
                    }
                }
                //if the binding string is a localization string
                if(p.indexOf(SBFReservedWordDictionary.$localization) >= 0){
                    result[prop[0]] = prop[1];
                }
            }
            else{
                //if the sub string is an object, then iterate through its properties.
                if (this.isSubBindingStringObject(p)) {
                    //using recursion to parse all the sub properties.
                    let subBindingProperty = p.substring(0, p.indexOf(":")+1);
                    result[subBindingProperty] = this.bindingStringToObject(p.substring(p.indexOf(":") + 1));
                } else {
                    let prop = p.split(":");
                    let propValue = prop[1];
                    let convertedValue = null;
                    if(typeof propValue == "string"){
                        // converting boolean strings to actual boolean values.
                        if(boolRegEx.test(propValue)){
                            convertedValue = (propValue.toLowerCase() == 'true' || propValue.toLowerCase() == 'yes');
                        }
                    }
                    result[prop[0]] = convertedValue ? convertedValue : propValue;
                }
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
    private dottedBindingOptionToValue(optionValue: string, bindingContext: any, element: Element): any {
        let currentBindingContext;
        let splitProperties: Array<string> = optionValue.split(".");
        if (optionValue.indexOf(SBFReservedWordDictionary.$window) >= 0) {
            currentBindingContext = window;
            if (currentBindingContext && !currentBindingContext[splitProperties[0]])
                SBFCommon.throwError("referenceError", `Binding context was set to '$window' but property ${splitProperties[0]} doesn't exist.`);
        }
        if (optionValue.indexOf(SBFReservedWordDictionary.$parent) >= 0) {
            currentBindingContext = element[SBF_PARENT_BINDING_CONTEXT];
            if (currentBindingContext && !currentBindingContext[splitProperties[0]])
                SBFCommon.throwError("referenceError", `Binding context was set to '$parent' but property ${splitProperties[0]} doesn't exist.`);
        }
        if (!currentBindingContext)
            currentBindingContext = bindingContext;
        let bindingContextPropertyValue = null;
        //iterate through all properties, till the last.
        splitProperties.forEach((propName) => {
            if (!bindingContextPropertyValue)
                bindingContextPropertyValue = currentBindingContext[propName];
            else
                bindingContextPropertyValue = bindingContextPropertyValue[propName];
        });
        if (typeof bindingContextPropertyValue == "string") {
            if (!this.onlyLettersRegEx.test(bindingContextPropertyValue)) {
                bindingContextPropertyValue = parseFloat(bindingContextPropertyValue);
            }
        }
        return bindingContextPropertyValue;
    }

    private stringBindingOptionToValue(optionValue: string, bindingContext: any, element: Element, convertTextToNumber: boolean): any {
        //if the binding option string is a localization string, leave it as is.
        if(optionValue.indexOf(SBFReservedWordDictionary.$localization)>=0)
            return optionValue;
        //if the binding value has a dot in it, assume it's a sub property of the bindingContext.
        let result = optionValue.indexOf(".") >= 0 ? this.dottedBindingOptionToValue(optionValue, bindingContext, element) :
            bindingContext[optionValue] ? bindingContext[optionValue] : optionValue;
        if (typeof result == "string" && convertTextToNumber) {
            if (!this.onlyLettersRegEx.test(result)) {
                result = parseFloat(result);
            }
        }
        return result;
    }

    private objectBindingOptionToValue(obj: object, bindingContext: any, element: any, convertTextToNumber: boolean) {
        for (let prop in obj) {
            if (typeof obj[prop] == "object")
                this.objectBindingOptionToValue(obj[prop], bindingContext, element, convertTextToNumber)
            else
                obj[prop] = this.stringBindingOptionToValue(obj[prop], bindingContext, element, convertTextToNumber);
        }
    }

    /**
     * Takes a binding handler's options string and returns a binding options object for the binding handler to use.
     * @param bindingHandlerOptions - The specific binding handler's options string.
     * @param bindingContext - The current binding context of the binding handler, to bind options against.
     * @param bindingHandlerRepositoryItem - The binding handler to create options for.
     * @param element - The binding element.
     */
    private bindingStringToBindingHandlerOptions<BindingOptions>(bindingHandlerOptions: string, bindingContext: any, bindingHandlerRepositoryItem: ISBFBindingHandlerRepositoryItem, element: Element): BindingOptions {
        //if the binding string is in object/verbose format, meaning within curly braces, then
        //make it an object and use it. if not format it first before using it.
        let options = this.isBindingStringObject(bindingHandlerOptions) ? this.bindingStringToObject(bindingHandlerOptions) :
            this.bindingStringToObject(bindingHandlerRepositoryItem.formatBindingOptions(bindingHandlerOptions));
        let convertTextToNumber = false;
        if (bindingHandlerRepositoryItem.castOptionsAs) {
            let textOptions = bindingHandlerRepositoryItem.castOptionsAs<ISBFTextHandlerOptions>(options);
            convertTextToNumber = textOptions.treatNumericStringsAsNumbers == true;
        }
        for (let opt in options) {
            let propertyType = typeof options[opt];
            switch (propertyType) {
                case "object": {
                    if(!options[opt][isSBFReservedObject])
                        this.objectBindingOptionToValue(options[opt], bindingContext, element, convertTextToNumber);
                    break;
                }
                case "string": { options[opt] = this.stringBindingOptionToValue(options[opt], bindingContext, element, convertTextToNumber);break;}
                default:{}
            }
        }
        options[isBindingHandlerOptionsObject] = true;
        return options;
    }

    /**
     * Takes in a binding options string and returns a key/value pair dictionary for each binding handler declared.
     * @param bindingOptions - The binding options string.
     * @param bindingHandlersRepository - The binding handlers repository.
     * @param bindingContext - The binding context.
     * @param element - The binding element.
     */
    parseBindingOptions(bindingOptions: string, bindingHandlersRepository: ISBFBindingHandlersRepository, bindingContext: any, element: Element): ISBFDictionary<ISBFBindingHandlerOptions> {
        let result: ISBFDictionary<ISBFBindingHandlerOptions> = {};
        let splitBindingHandlers = bindingOptions.split(";");
        splitBindingHandlers.forEach((bindingHandler) => {
            let firstColon = bindingHandler.indexOf(":");
            let bindingHandlerName = bindingHandler.substring(0, firstColon);//.replace(/[{}]/g,"");
            let bindingHandlerValue = bindingHandler.substring(firstColon + 1);//.replace(/[{}]/g,"");
            if (bindingHandlersRepository[bindingHandlerName])
                result[bindingHandlerName] = this.bindingStringToBindingHandlerOptions(bindingHandlerValue, bindingContext, bindingHandlersRepository[bindingHandlerName], element);
        });
        return result;
    }
}