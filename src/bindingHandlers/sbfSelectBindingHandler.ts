import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFLocalization,ISBFSelectHandlerOptions} from "../common/interfaces";
import {SBFManager} from "../common/sbfManager";
import {SBFCommon} from "../common/sbfCommon";

export class SBFSelectBindingHandler extends SBFBaseBindingHandler<ISBFSelectHandlerOptions>{
    //#region private
    private static allowedElements = ["SELECT","DATALIST"];
    private get dataToRender(){ return SBFCommon.isObservable(this.bindingOptions.data) ? this.bindingOptions.data.value : this.bindingOptions.data;}
    /**
     * Overriding the default behavior as the select binding should add rules to the value observable.
     * If the binding options have validation rules, ensure they are added to the observable.
     */    
    protected processValidationRules(){
        if(this.bindingOptions.isBindingHandlerOptionsObject){
            if(Array.isArray(this.bindingOptions.validationRules) && (this.bindingOptions.value && this.bindingOptions.value.isObservable)){
                this.bindingOptions.validationRules.forEach((r)=>{
                    this.bindingOptions.value.addValidationRule(r);
                });
            }
        }
    }    
    private onSelectionChange(event:Event){
        let selectedIndex = (<HTMLSelectElement>this.element).selectedIndex;
        if(selectedIndex >= 0) {
            //if there is a selection label, we need to adjust the index by subtracting one
            //so the index would match the actual data in the data array.
            //the selectionLabel value(if it exists) is always rendered at index zero
            if(this.bindingOptions.selectionLabel) selectedIndex--;
            let newValue =  selectedIndex < 0 ? null : this.dataToRender[selectedIndex];

            if (this.bindingOptions.onSelectionChange) {
                this.bindingOptions.onSelectionChange(newValue,event);
            }
            if(this.bindingOptions.value){
                this.bindingOptions.value.value = newValue;
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
        if(SBFCommon.isObservable(this.bindingOptions.data)){
            this.bindingOptions.data.addNotificationSubscription((value)=>{
                this.renderData(value);
            });
        }
        if(SBFCommon.isObservable(this.bindingOptions.value)){
            this.bindingOptions.value.addNotificationSubscription((value)=>{
                let dataToRender = Array.isArray(this.bindingOptions.data) ? this.bindingOptions.data : this.bindingOptions.data.value;
                if(value){
                     let itemIndex = dataToRender.findIndex((dataRow,index)=>{
                        //if there is a value field defined, then use that to find the index of the selected value.
                        //if no valueField is defined, then assume that the value is the value valueField.
                        return this.bindingOptions.valueField ? dataRow[this.bindingOptions.valueField] == value[this.bindingOptions.valueField] : dataToRender[index] == value;
                    });
                    //if there is a selection label, we need to adjust the index by subtracting one
                    //so the index would match the actual data in the data array.
                    //the selectionLabel value(if it exists) is always rendered at index zero                    
                    if(this.bindingOptions.selectionLabel) itemIndex++;
                    (<HTMLSelectElement>this.element).selectedIndex = itemIndex;
                }else { (<HTMLSelectElement>this.element).selectedIndex = 0; }
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