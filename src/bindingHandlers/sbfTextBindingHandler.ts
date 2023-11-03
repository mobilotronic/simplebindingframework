import {ISBFLocalization, ISBFTextHandlerOptions} from "../common/interfaces";
import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {SBFObservable} from "../common/sbfObservable";

export class SBFTextBindingHandler extends SBFBaseBindingHandler<ISBFTextHandlerOptions>{
    //#region private
    private notificationSubscription(value:string){
        this.element.textContent = this.localizeValue(value);
    }
    //#endregion
    //#region protected
    protected initialize() {
        if(this.bindingOptions.observable.isObservable)
            this.bindingOptions.observable.addNotificationSubscription(this.notificationSubscription.bind(this));
    }
    //#endregion
    //#region constructor
    /**
     * Creates a text binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFTextHandlerOptions,localization?:ISBFLocalization) {
        if(!bindingOptions.observable.isObservable){
            bindingOptions.observable = new SBFObservable(bindingOptions.observable);
        }
        super(element,bindingOptions,localization);
        this.element.textContent = this.localizeValue(this.bindingOptions.observable.value);
        this.initialize();
    }
    //#endregion
}