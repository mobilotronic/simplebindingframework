import {ISBFBindingHandlerOptions, ISBFLocalization, ISBFObservable} from "../common/interfaces";
import {SBF_CURRENT_BINDING_CONTEXT, SBFReservedWordDictionary, SBFCommon} from "../common/sbfCommon";

export class SBFBaseBindingHandler<T>{
    //#region protected
    protected mutationObserver: MutationObserver;
    protected bindingContext:any;
    protected isElementDetached(element:Element):boolean{
        if(element.parentNode === document)
            return false;
        if(element.parentElement === null)
            return true;
        return this.isElementDetached(element.parentElement);
    }
    // noinspection JSUnusedLocalSymbols
    protected mutationCallback(mutations: MutationRecord[], observer: MutationObserver){
        //if element was removed, then dispose all subscriptions.
        if(this.isElementDetached(this.element))
           this.dispose();
    }
    protected element:Element;
    protected _bindingHandlerOptions:T;
    protected localization:ISBFLocalization;
    protected localizeValue(value:string):string{
        try {
            if (this.localization && value && typeof value == "string" && value.indexOf(SBFReservedWordDictionary.$localization) >= 0) {
                let splitValue = value.split("|");
                return this.localization.translate(splitValue[1]);
            } else
                return value;
        }
        catch (e){
            SBFCommon.throwError("error",e);
        }
    }
    /**
     * If the binding options have validation rules, ensure they are added to the observable.
     */
    protected processValidationRules(){
        if(this._bindingHandlerOptions['isBindingHandlerOptionsObject']){
            let castedOptions = <ISBFBindingHandlerOptions>this._bindingHandlerOptions;
            if(Array.isArray(castedOptions.validationRules) && (castedOptions.observable && castedOptions.observable.isObservable)){
                castedOptions.validationRules.forEach((r)=>{
                    castedOptions.observable.addValidationRule(r);
                });
            }
        }
    }
    //#endregion
    //#region constructor
    /**
     * Creates a binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFBindingHandlerOptions | ISBFObservable<T> | any,localization?:ISBFLocalization) {
        this.element = element;
        this.bindingContext = this.element[SBF_CURRENT_BINDING_CONTEXT];
        this._bindingHandlerOptions = bindingOptions;
        //if the element is part of a template, that is not yet rendered
        //there is no parentNode.
        if(this.element.parentNode) {
            this.mutationCallback = this.mutationCallback.bind(this);
            this.mutationObserver = new MutationObserver(this.mutationCallback);
            this.mutationObserver.observe(this.element.parentNode, {childList: true, subtree: true});
        }
        this.processValidationRules();
        this.localization = localization;
    }
    //#endregion
    //#region public
    /** The binding options. */
    get bindingOptions():T{ return this._bindingHandlerOptions;}
    /** Called when the binding element is removed from the DOM.*/
    dispose(){
        this._bindingHandlerOptions = null;
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
    }
    elementAs<T>():T{
        return <T><unknown>this.element;
    }
    //#endregion
}



