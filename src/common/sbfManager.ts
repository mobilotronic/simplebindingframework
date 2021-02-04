import {
    ISBFBindingHandlerOptions,
    ISBFBindingHandlerRepositoryItem,
    ISBFLocalization
} from "./interfaces";
import {SBFBaseBindingHandler} from "../bindingHandlers/sbfBindingHandler";
import {SBFBindingsParser} from "./sbfBindingsParser";
import {
    SBF_CURRENT_BINDING_CONTEXT,
    SBF_SKIP_CONTEXT_BINDING,
    SBFBindingHandlersRepository
} from "./sbfCommon";

const createdBindingHandlers :Array<SBFBaseBindingHandler<any>> = [];

const instantiateBindingHandler = (handler:string,element:Element,bindingOptions:ISBFBindingHandlerOptions,viewModel:any,localization?:ISBFLocalization)=>{
    let bndRepositoryItem = <ISBFBindingHandlerRepositoryItem>SBFBindingHandlersRepository[handler];
    if(bndRepositoryItem){
        if(bndRepositoryItem.validateBindingValue(bindingOptions)){
            createdBindingHandlers.push(new bndRepositoryItem.bindingHandler(element,bindingOptions,localization));
        }else {
            let error = `Invalid value for ${handler} in view model ${JSON.stringify(viewModel)}`;
            console.debug(error);
            throw new Error(error);
        }
    }
};

// noinspection JSUnfilteredForInLoop
export class SBFManager{
    private static attributeName = "data-bind-sbf";
    /**
     * The bindings parser.
     */
    private static bindingsParser : SBFBindingsParser;
    //#region private
    private static applyElementBindings(element:Element,viewModel:any,localization?:ISBFLocalization){
        let bindingOptions = element.getAttribute(SBFManager.attributeName);
        element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
        if(bindingOptions){
            let bindingHandlers = SBFManager.bindingsParser.parseBindingOptions(bindingOptions,SBFBindingHandlersRepository,viewModel,element);
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
        if(!SBFManager.bindingsParser)
            SBFManager.bindingsParser = new SBFBindingsParser();
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
    //#endregion
}
