import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFLocalization, ISBFObservable, ISBFSelectHandlerOptions, ISBFVisibleHandlerOptions} from "../common/interfaces";
import {SBFManager} from "../common/sbfCommon";

export class SBFSelectBindingHandler extends SBFBaseBindingHandler<ISBFSelectHandlerOptions>{
    //#region private
    private static allowedElements = ["SELECT","DATALIST"];
    private get dataToRender(){ return SBFManager.isObservable(this.bindingOptions.data) ? this.bindingOptions.data.value : this.bindingOptions.data;}
    private onSelectionChange(event:Event){
        if((<HTMLSelectElement>this.element).selectedIndex >= 0) {
            let selectedItem = this.dataToRender[(<HTMLSelectElement>this.element).selectedIndex];
            if (this.bindingOptions.onSelectionChange) {
                this.bindingOptions.onSelectionChange(selectedItem,event);
            }
            if(this.bindingOptions.value){
                this.bindingOptions.value.value = selectedItem;
            }
        }
    }
    private renderData(data:Array<any>){
        SBFManager.cleanNode(this.element);
        if(this.bindingOptions.selectionLabel){
            let optionElement = document.createElement("option");
            optionElement.setAttribute("value",null);
            optionElement.textContent = this.localizeValue(this.bindingOptions.selectionLabel);
            this.element.appendChild(optionElement);
        }
        data.forEach((dataRow)=>{
            let optionElement = document.createElement("option");
            let optionValue = dataRow[this.bindingOptions.valueField] ? dataRow[this.bindingOptions.valueField] : dataRow;
            let optionText = dataRow[this.bindingOptions.displayField] ? dataRow[this.bindingOptions.displayField] : dataRow;
            optionElement.setAttribute("value",optionValue);
            optionElement.textContent = optionText;
            this.element.appendChild(optionElement);
        });
    }
    //#endregion

    //#region protected
    protected initialize(){
        this.element.addEventListener("change",this.onSelectionChange.bind(this));
        if(SBFManager.isObservable(this.bindingOptions.data)){
            this.bindingOptions.data.addNotificationSubscription((value)=>{
                this.renderData(value);
            });
        }
        if(SBFManager.isObservable(this.bindingOptions.value)){
            this.bindingOptions.value.addNotificationSubscription((value)=>{
                let dataToRender = Array.isArray(this.bindingOptions.data) ? this.bindingOptions.data : this.bindingOptions.data.value;
                (<HTMLSelectElement>this.element).selectedIndex = dataToRender.findIndex((dataRow,index)=>{
                    //if there is a value field defined, then use that to find the index of the selected value.
                    //if no valueField is defined, then assume that the value is the value valueField.
                    return this.bindingOptions.valueField ? dataRow[this.bindingOptions.valueField] == value[this.bindingOptions.valueField] : dataToRender[index] == value;
                });
            });
        }
        this.renderData(this.dataToRender);
    }
    //#endregion

    //#region constructor
    /**
     * Creates a Select binding handler.
     * @param element - The element to bind against. Must be a SELECT element.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFSelectHandlerOptions,localization?:ISBFLocalization) {
        if(SBFSelectBindingHandler.allowedElements.indexOf(element.tagName) < 0)
            throw new Error(`Element of type ${element.tagName} is not supported, from the SelectBindingHandler`);
        super(element,bindingOptions,localization);
        this.initialize();
    }
    //#endregion
}