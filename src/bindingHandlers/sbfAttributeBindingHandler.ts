import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {
    ISBFAttributeHandlerOptions,
    ISBFLocalization
} from "../common/interfaces";
import {SBFObservable} from "../common/sbfObservable";


// noinspection JSUnfilteredForInLoop
export class SBFAttributeBindingHandler extends SBFBaseBindingHandler<ISBFAttributeHandlerOptions>{
    //#region private
    private processAndApplyAttributes(){
        for(let attribute in this.bindingOptions){
            let attrValue = this.bindingOptions[attribute] ? this.bindingOptions[attribute]: attribute;
            if(attrValue instanceof SBFObservable){
                attrValue.addNotificationSubscription((value)=>{
                    if(value == null)
                        this.element.setAttribute(attribute,this.localizeValue(attrValue));
                    else
                        this.element.removeAttribute(attribute);
                });
                this.element.setAttribute(attribute,attrValue.value);
            }else{
                if(this.bindingOptions[attribute] == null || this.bindingOptions[attribute] == undefined)
                    this.element.removeAttribute(attribute)
                else
                    this.element.setAttribute(attribute,this.localizeValue(attrValue));
            }
        }
    }
    //#endregion
    //#region protected
    protected initialize() {
        this.processAndApplyAttributes();
    }
    //#end
    //#region constructor
    /**
     * Creates an attribute binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFAttributeHandlerOptions,localization?:ISBFLocalization) {
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}