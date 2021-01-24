import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {SBF_CURRENT_BINDING_CONTEXT} from "../common/sbfCommon";
import {ISBFClickHandlerOptions, ISBFLocalization} from "../common/interfaces";

type ClickEventHandler = (viewModel?:any,event?:Event) => void;

export class SBFClickBindingHandler extends SBFBaseBindingHandler<ISBFClickHandlerOptions>{
    //#region private
    private readonly clickEventHandler: ClickEventHandler;
    //#endregion
    //#region protected
    protected initialize() {
        this.element.addEventListener("click",(event)=>{
            if(this.clickEventHandler){
                this.clickEventHandler.apply(this.element[SBF_CURRENT_BINDING_CONTEXT],[this.element[SBF_CURRENT_BINDING_CONTEXT],event]);
            }
        });
    }
    //#end
    //#region constructor
    /**
     * Creates a click binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFClickHandlerOptions,localization?:ISBFLocalization) {
        super(element,bindingOptions,localization);
        this.clickEventHandler = this.bindingOptions.click;
        this.initialize();
    }
    //#endregion
}