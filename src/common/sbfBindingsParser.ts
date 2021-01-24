import {
    ISBFBindingHandlerOptions,
    ISBFBindingHandlerRepositoryItem,
    ISBFBindingHandlersRepository,
    ISBFDictionary
} from "./interfaces";

// noinspection JSUnfilteredForInLoop
export class SBFBindingsParser{
    private isBindingStringBindingOptionsObject(bindingString):boolean{
        return typeof bindingString == "string" && bindingString[0] == "{" && bindingString[bindingString.length-1] == "}";
    }
    private bindingStringToObject(bindingString):any{
        let result  = {};
        bindingString = bindingString.replace(/[{}]/g,"");
        let splitProperties = bindingString.split(",");
        splitProperties.forEach((p)=>{
            let prop = p.split(":");
            result[prop[0]] = prop[1];
        });
        return result;
    }
    /**
     * Takes a binding handler's options string and returns a binding options object for the binding handler to use.
     * @param bindingHandlerOptions - The specific binding handler's options string.
     * @param bindingContext - The current binding context of the binding handler, to bind options against.
     * @param bindingHandler - The binding handler to create options for.
     */
    private bindingStringToBindingHandlerOptions<BindingOptions>(bindingHandlerOptions:string,bindingContext:any,bindingHandler:ISBFBindingHandlerRepositoryItem):BindingOptions{
        //if the binding string is in object/verbose format, meaning within curly braces, then
        //make it an object and use it.
        //if not format it first before using it.
        let options = this.isBindingStringBindingOptionsObject(bindingHandlerOptions) ? this.bindingStringToObject(bindingHandlerOptions) : this.bindingStringToObject(bindingHandler.formatBindingOptions(bindingHandlerOptions));
        for(let opt in options){
            options[opt] = bindingContext[options[opt]] ? bindingContext[options[opt]] : options[opt];
        }
        options["isBindingHandlerOptionsObject"] = true;
        return options;
    }

    /**
     * Takes in a binding options string and returns a key/value pair dictionary for each binding handler declared.
     * @param bindingOptions - The binding options string.
     * @param bindingHandlersRepository - The binding handlers repository.
     * @param bindingContext - The binding context.
     */
    parseBindingOptions(bindingOptions:string,bindingHandlersRepository:ISBFBindingHandlersRepository,bindingContext:any):ISBFDictionary<ISBFBindingHandlerOptions>{
        let result : ISBFDictionary<ISBFBindingHandlerOptions> = {};
        let splitBindingHandlers = bindingOptions.split(";");
        splitBindingHandlers.forEach((bindingHandler)=>{
            let firstColon = bindingHandler.indexOf(":");
            let bindingHandlerName = bindingHandler.substr(0,firstColon);//.replace(/[{}]/g,"");
            let bindingHandlerValue = bindingHandler.substr(firstColon+1);//.replace(/[{}]/g,"");
            if(bindingHandlersRepository[bindingHandlerName])
                result[bindingHandlerName] = this.bindingStringToBindingHandlerOptions(bindingHandlerValue,bindingContext,bindingHandlersRepository[bindingHandlerName]);
        });
        return result;
    }
}