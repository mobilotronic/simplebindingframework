import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {
    ISBFLocalization,
    ISBFTemplateHandlerOptions
} from "../common/interfaces";
import {
    SBF_CURRENT_BINDING_CONTEXT,
    SBF_PARENT_BINDING_CONTEXT,
    SBF_SKIP_CONTEXT_BINDING,
    SBFManager
} from "../common/sbfCommon";

export class SBFTemplateBindingHandler extends SBFBaseBindingHandler<ISBFTemplateHandlerOptions>{
    //#region private
    private templateElement:HTMLTemplateElement;
    private populateHTML(data:Array<any>){
        data.forEach((v)=>{
            let newNode = <Element>this.templateElement.content.firstElementChild.cloneNode(true);
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
        this.templateElement = <HTMLTemplateElement>document.getElementById(this.bindingOptions.name);
        if(!this.templateElement)
            throw new Error(`Template element with name ${this.bindingOptions.name} not found.`);
        if(this.bindingOptions.foreachData){
            let dataToRender = Array.isArray(this.bindingOptions.foreachData) ? this.bindingOptions.foreachData : this.bindingOptions.foreachData.value;
            this.populateHTML(dataToRender);
        }
        else{
            let newNode = <Element>this.templateElement.content.firstElementChild.cloneNode(true);
            newNode[SBF_CURRENT_BINDING_CONTEXT] = this.element[SBF_CURRENT_BINDING_CONTEXT];
            newNode[SBF_PARENT_BINDING_CONTEXT] = this.element[SBF_CURRENT_BINDING_CONTEXT];
            newNode[SBF_SKIP_CONTEXT_BINDING] = true;
            SBFManager.applyBindings(newNode,newNode[SBF_PARENT_BINDING_CONTEXT]);
            this.element.appendChild(newNode);
        }
        if(this.bindingOptions.foreachData && !Array.isArray(this.bindingOptions.foreachData)){
            this.bindingOptions.foreachData.addNotificationSubscription((value)=>{
                SBFManager.cleanNode(this.element);
                this.populateHTML(value);
            });
        }
    }

    //#endregion
    //#region constructor
    /**
     * Creates a template binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFTemplateHandlerOptions,localization?:ISBFLocalization) {
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}