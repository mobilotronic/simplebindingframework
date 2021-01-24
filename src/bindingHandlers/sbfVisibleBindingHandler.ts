import {ISBFLocalization, ISBFVisibleHandlerOptions} from "../common/interfaces";
import {SBFBaseBindingHandler} from "./sbfBindingHandler";

export class SBFVisibleBindingHandler extends SBFBaseBindingHandler<ISBFVisibleHandlerOptions>{
    //#region private
    private setVisible(value:boolean){
        (<HTMLElement>this.element).style.display =  !value ?  "none" : null;
    }
    private notificationSubscription(value:boolean){
        this.setVisible(value);
    }
    //#endregion
    //#region protected
    protected initialize() {
        this.bindingOptions.observable.addNotificationSubscription(this.notificationSubscription.bind(this));
        this.setVisible(this.bindingOptions.observable.value);
    }
    //#endregion
    //#region constructor
    /**
     * Creates a visible binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFVisibleHandlerOptions,localization?:ISBFLocalization)  {
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}