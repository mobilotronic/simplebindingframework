import {
    ISBFBindingHandlerRepositoryItem,
    ISBFBindingHandlersRepository,
    ISBFObservable,
    ISBFTextHandlerOptions
} from "./interfaces";
import {SBFTextBindingHandler} from "../bindingHandlers/sbfTextBindingHandler";
import {SBFClickBindingHandler} from "../bindingHandlers/sbfClickBindingHandler";
import {SBFValueBindingHandler} from "../bindingHandlers/sbfValueBindingHandler";
import {SBFVisibleBindingHandler} from "../bindingHandlers/sbfVisibleBindingHandler";
import {SBFAttributeBindingHandler} from "../bindingHandlers/sbfAttributeBindingHandler";
import {SBFForEachBindingHandler} from "../bindingHandlers/sbfForEachBindingHandler";
import {SBFTemplateBindingHandler} from "../bindingHandlers/sbfTemplateBindingHandler";
import {SBFEventBindingHandler} from "../bindingHandlers/sbfEventBindingHandler";
import {SBFSelectBindingHandler} from "../bindingHandlers/sbfSelectBindingHandler";
import {SBFCssBindingHandler} from "../bindingHandlers/sbfCssBindingHandler";
import {SBFObservable} from "./sbfObservable";

export type SBFLoglevel = "info" | "error" | "warning" | "debug";
export type SBFErrorType = "error" | "evalError" | "rangeError" | "referenceError" | "syntaxError" | "typeError" | "uriError";

export const SBF_CURRENT_BINDING_CONTEXT = "_SBF_CURRENT_BINDING_CONTEXT";
export const SBF_PARENT_BINDING_CONTEXT = "_SBF_PARENT_BINDING_CONTEXT";
export const SBF_SKIP_CONTEXT_BINDING ="_SBF_SKIP_CONTEXT_BINDING";
export const SBFReservedWordDictionary = {
    /**
     * Parent binding context.
     */
    $parent:"$parent",
    /**
     * Localization object.
     */
    $localization:"$localization",
    /**
     * Window object.
     */
    $window:"$window"
};


// noinspection JSUnusedLocalSymbols
export const SBFBindingHandlersRepository = <ISBFBindingHandlersRepository>{
    "text":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFTextBindingHandler,
        validateBindingValue:(bindingValue:ISBFTextHandlerOptions | any)=>{
            return typeof bindingValue  == "string" ||
                typeof bindingValue == "number" ||
                (bindingValue.isObservable) ||
                (bindingValue instanceof Date) ||
                bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ return `{observable:${options}`;}
    },
    "click":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFClickBindingHandler,
        validateBindingValue:(bindingValue:ISBFObservable<any> | any) => {
            return typeof bindingValue == "function" || typeof bindingValue == "string" || bindingValue.isBindingHandlerOptionsObject == true;
        },formatBindingOptions:(options:string)=>{return `{click:${options}}`;}},
    "value":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFValueBindingHandler,
        validateBindingValue:(bindingValue:ISBFObservable<any> | any)=>{
            return (typeof bindingValue  == "string" || typeof bindingValue  =="number") || (bindingValue.isObservable || bindingValue.isBindingHandlerOptionsObject == true);
        },
        formatBindingOptions:(options:string)=>{ return `{observable:${options},keyboardTriggersChange:true}`;}
    },
    "visible":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFVisibleBindingHandler,
        validateBindingValue:(bindingValue:ISBFObservable<any> | any)=>{
            return typeof bindingValue  == "string" || (bindingValue.isObservable) || bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ return `{observable:${options}}`;}
    },
    "attr":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFAttributeBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return typeof bindingValue  == "string" || (bindingValue.isObservable) || bindingValue.isBindingHandlerOptionsObject == true;
        }
    },
    "foreach":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFForEachBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return typeof bindingValue  == "string" || Array.isArray(bindingValue) || (bindingValue.isObservable) || bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{return `{data:${options}}`;}
    },
    "template":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFTemplateBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return typeof bindingValue  == "string" || (bindingValue.isObservable) || bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ return `{name:${options}}`;}
    },
    "events":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFEventBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return typeof bindingValue  == "string" || (bindingValue.isObservable) || bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ throw new Error("The events binding handler, doesn't support a shorthand format");}
    },
    "select":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler:SBFSelectBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ throw new Error("The select binding handler, doesn't support a shorthand format");}
    },
    "css":<ISBFBindingHandlerRepositoryItem>{
        bindingHandler: SBFCssBindingHandler,
        validateBindingValue:(bindingValue)=>{
            return bindingValue.isBindingHandlerOptionsObject == true;
        },
        formatBindingOptions:(options:string)=>{ throw new Error("The css binding handler, doesn't support a shorthand format.")}
    }
}


export class SBFCommon{
    /**
     * Returns true if the passed parameter is an SBFObservable
     * @param value
     */
    public static isObservable(value:any):value is ISBFObservable<any>{
        return value && value instanceof SBFObservable;
    }
    /**
     * Logs a message into the console.
     * @param message - The message to log.
     * @param logType - The log type.
     */
    public static log(message:string, logType:SBFLoglevel = "info"){
        if(SBFCommon.debug) {
            switch (logType) {
                case "debug": {
                    console.debug(message);
                    break;
                }
                case "info": {
                    console.info(message);
                    break;
                }
                case "warning": {
                    console.warn(message);
                    break;
                }
                case "error": {
                    console.error(message);
                    break;
                }
            }
        }
    }

    /**
     * Throws an error.
     * @param errorType - The error type.
     * @param message - The error message.
     */
    static throwError(errorType:SBFErrorType,message:string){
        switch (errorType){
            case "error":{throw new Error(message);}
            case "evalError": {throw new EvalError(message);}
            case "rangeError":{throw new RangeError(message);}
            case "referenceError":{throw new ReferenceError(message);}
            case "syntaxError": {throw new SyntaxError(message);}
            case "typeError":{throw new TypeError(message);}
            case "uriError":{throw new URIError(message);}
            default:{throw new Error(message);}
        }
    }

    /**
     * Set this to true, to enable SBF debug/log messages.
     */
    static debug:boolean = false;
}