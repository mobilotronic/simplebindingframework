import {SBFClickBindingHandler} from "../bindingHandlers/sbfClickBindingHandler";
import {SBFTextBindingHandler} from "../bindingHandlers/sbfTextBindingHandler";
import {SBFValueBindingHandler} from "../bindingHandlers/sbfValueBindingHandler";
import {SBFVisibleBindingHandler} from "../bindingHandlers/sbfVisibleBindingHandler";
import {
    ISBFBindingHandlerOptions,
    ISBFBindingHandlerRepositoryItem,
    ISBFBindingHandlersRepository,
    ISBFLocalization,
    ISBFObservable, ISBFTextHandlerOptions
} from "./interfaces";
import {SBFAttributeBindingHandler} from "../bindingHandlers/sbfAttributeBindingHandler";
import {SBFForEachBindingHandler} from "../bindingHandlers/sbfForEachBindingHandler";
import {SBFTemplateBindingHandler} from "../bindingHandlers/sbfTemplateBindingHandler";
import {SBFEventBindingHandler} from "../bindingHandlers/sbfEventBindingHandler";
import {SBFBaseBindingHandler} from "../bindingHandlers/sbfBindingHandler";
import {SBFBindingsParser} from "./sbfBindingsParser";
import {SBFSelectBindingHandler} from "../bindingHandlers/sbfSelectBindingHandler";
import {SBFObservable} from "./sbfObservable";
import {SBFCssBindingHandler} from "../bindingHandlers/sbfCssBindingHandler";

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
        formatBindingOptions:(options:string)=>{ return `{observable:${options}`;}
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
        formatBindingOptions:(options:string)=>{ return `{name:${options}`;}
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

const bindingHandlers :Array<SBFBaseBindingHandler<any>> = [];

const instantiateBindingHandler = (handler:string,element:Element,bindingOptions:ISBFBindingHandlerOptions,viewModel:any,localization?:ISBFLocalization)=>{
    let bndRepositoryItem = <ISBFBindingHandlerRepositoryItem>SBFBindingHandlersRepository[handler];
    if(bndRepositoryItem){
        if(bndRepositoryItem.validateBindingValue(bindingOptions)){
            bindingHandlers.push(new bndRepositoryItem.bindingHandler(element,bindingOptions,localization));
        }else {
            let error = `Invalid value for ${handler} in view model ${JSON.stringify(viewModel)}`;
            console.debug(error);
            throw new Error(error);
        }
    }
};

export type SBFLoglevel = "info" | "error" | "warning" | "debug";

// noinspection JSUnfilteredForInLoop
export class SBFManager{
    private static attributeName = "data-bind-sbf";
    /**
     * The bindings parser.
     */
    private static bindingsParser : SBFBindingsParser = new SBFBindingsParser();
    //#region private
    private static applyElementBindings(element:Element,viewModel:any,localization?:ISBFLocalization){
        let bindingOptions = element.getAttribute(SBFManager.attributeName);
        element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
        if(bindingOptions){
            let bindingHandlers = SBFManager.bindingsParser.parseBindingOptions(bindingOptions,SBFBindingHandlersRepository,viewModel);
            for(let handler in bindingHandlers){
                instantiateBindingHandler(handler,element,bindingHandlers[handler],viewModel,localization);
            }
        }
    }
    private  static traverseDom(startingElement:Element,viewModel:any,localization?:ISBFLocalization){
        for(let i=0;i<=startingElement.children.length-1;i++){
            let currentElement = startingElement.children[i];
            SBFManager.applyElementBindings(currentElement,viewModel,localization);
            if(currentElement.children.length > 0 && currentElement[SBF_SKIP_CONTEXT_BINDING] == undefined)
                SBFManager.traverseDom(currentElement,viewModel,localization);
        }
    }
    //#endregion

    //#region public
    /**
     * Iterates through the DOM, from the given element level, and applies SBF bindings.
     * @param rootElement - The rootElement for the SBF binding context.
     * @param viewModel - The binding context.
     * @param localization - A localization engine.
     * @param attributeName - The attribute where to look for binding options. Default is 'data-bind-sbf'
     */
    public static applyBindings(rootElement:Element,viewModel:any,localization?:ISBFLocalization,attributeName?:string){
        if(localization && typeof localization.translate != "function"){
            throw new Error("Invalid localization object. Property 'translate' is not a function.");
        }
        if(attributeName)
            SBFManager.attributeName = attributeName;
        SBFManager.applyElementBindings(rootElement,viewModel,localization);
        SBFManager.traverseDom(rootElement,viewModel,localization);
    }

    /**
     * Register a SBF binding handler.
     * @param name - The name of the binding handler.
     * @param details - The binding handler registration details.
     */
    public static registerBindingHandler(name:string,details:ISBFBindingHandlerRepositoryItem){
        if(!SBFBindingHandlersRepository[name]){
            SBFBindingHandlersRepository[name] = details;
        }
    }
    /**
     * Removes all child nodes for the given element.
     * @param element - The element to clean.
     */
    public static cleanNode(element:Element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

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
        if(SBFManager.debug) {
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
     * Set this to true, to enable SBF debug/log messages.
     */
    public static debug:boolean = false;
    //#endregion
}
