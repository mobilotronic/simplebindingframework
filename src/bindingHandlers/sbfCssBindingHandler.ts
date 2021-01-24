import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFCssBindingHandlerOptions, ISBFLocalization} from "../common/interfaces";
import {SBFObservable} from "../common/sbfObservable";

export class SBFCssBindingHandler extends SBFBaseBindingHandler<ISBFCssBindingHandlerOptions>{
    //#region private
    private processAndApplyClasses(){
        for(let cssClass in this.bindingOptions){
            let cssValue = this.bindingOptions[cssClass];
            //if the css value is just a string then go ahead and add it.
            if(typeof cssValue == "string")
                this.element.classList.add(cssValue);
            if(cssValue instanceof SBFObservable){
                //if the observable is valid then add the class to the element.
                if(cssValue.value == true)
                    this.element.classList.add(cssClass);
                //add then a subscription so we monitor
                cssValue.addNotificationSubscription(()=>{
                    //if the attributes value is true, then the class is added
                    //if not it is removed.
                    if(cssValue.value == true)
                        this.element.classList.add(cssClass);
                    else
                        this.element.classList.remove(cssClass);
                });
            }
        }
    }
    //#endregion

    //#region protected
    protected initialize(){
        this.processAndApplyClasses();
    }
    //#endregion
    //#region constructor
    constructor(element:Element,bindingOptions:ISBFCssBindingHandlerOptions,localization?:ISBFLocalization) {
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion

}