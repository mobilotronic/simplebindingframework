import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFForeachHandlerOptions, ISBFLocalization} from "../common/interfaces";
import {SBFObservable} from "../common/sbfObservable";
import {SBF_CURRENT_BINDING_CONTEXT, SBF_PARENT_BINDING_CONTEXT, SBF_SKIP_CONTEXT_BINDING, SBFManager} from "../common/sbfCommon";

export class SBFForEachBindingHandler extends SBFBaseBindingHandler<ISBFForeachHandlerOptions>{
    //#region private
    private nodeTemplate : Element;
    private populateHTML(data:Array<any>){
        data.forEach((v)=>{
            let newNode = <Element>this.nodeTemplate.cloneNode(true);
            newNode[SBF_CURRENT_BINDING_CONTEXT] = v;
            newNode[SBF_PARENT_BINDING_CONTEXT] = this.element[SBF_CURRENT_BINDING_CONTEXT];
            newNode[SBF_SKIP_CONTEXT_BINDING] = true;
            SBFManager.applyBindings(newNode,v,this.localization);
            this.element.appendChild(newNode);
        });
    }
    //#endregion
    //#region protected
    protected initialize() {
        this.nodeTemplate = <Element>this.element.children[0].cloneNode(true);
        //cleaning up the element content
        while(this.element.firstChild) this.element.removeChild(this.element.firstChild);
        let dataToRender = Array.isArray(this.bindingOptions.data) ? this.bindingOptions.data : this.bindingOptions.data.value;
        this.populateHTML(dataToRender);
        if(this.bindingOptions.data instanceof SBFObservable) {
            this.bindingOptions.data.addNotificationSubscription((v) => {
                this.populateHTML(v);
            });
        }
    }

    //#endregion
    //#region constructor
    /**
     * Creates a foreach binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFForeachHandlerOptions,localization?:ISBFLocalization) {
        super(element, bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}