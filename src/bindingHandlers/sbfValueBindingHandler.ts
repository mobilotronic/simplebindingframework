import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFLocalization, ISBFValueBindingHandlerOptions} from "../common/interfaces";
import {SBFCommon} from "../common/sbfCommon";

export class SBFValueBindingHandler extends SBFBaseBindingHandler<ISBFValueBindingHandlerOptions>{
    //#region private
    private static twoWayBindingElements = ["INPUT","TEXTAREA","SELECT"];
    // noinspection JSMethodCanBeStatic
    private strToBool(value:string):boolean{
        let result = value.toLowerCase() == "true" || value.toLowerCase() == "false";
        if(result)
            return value.toLowerCase() == "true";
        return null;
    }
    private notificationSubscription(value:string){
        console.debug(`Notification subscription fired from observable ${this.bindingOptions.observable.id}. New value is ${value}`);
        switch (this.element.tagName){
            case "INPUT":
            case "TEXTAREA":{
                (<HTMLInputElement>this.element).value = value;
                break;
            }
        }
    }
    //#endregion
    //#region protected
    protected initialize() {
        this.bindingOptions.observable.addNotificationSubscription(this.notificationSubscription.bind(this));
        if(this.bindingOptions.observable.value)
            this.elementAs<HTMLInputElement>().value = this.bindingOptions.observable.value;
        this.element.addEventListener("blur", () => {
            SBFCommon.log(`Changing observable ${this.bindingOptions.observable.id} value from blur event`);
            this.bindingOptions.observable.value = (<HTMLInputElement>this.element).value;
        });
        if(this.bindingOptions.keyboardTriggersChange) {
            let key = this.strToBool(<string>this.bindingOptions.keyboardTriggersChange) == true ? "Enter" : this.bindingOptions.keyboardTriggersChange;
            this.element.addEventListener("keydown", (event: KeyboardEvent) => {
                if (event.key == key) {
                    SBFCommon.log(`Changing observable ${this.bindingOptions.observable.id} value from keyboard event`);
                    this.bindingOptions.observable.value = (<HTMLInputElement>this.element).value;
                }
            });
        }
    }
    //#endregion
    //#region constructor
    /**
     * Creates a value binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFValueBindingHandlerOptions,localization?:ISBFLocalization) {
        if(SBFValueBindingHandler.twoWayBindingElements.indexOf(element.tagName) < 0){
            throw new Error(`Element of type ${element.tagName} is not supported, from the ValueBindingHandler`);
        }
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}