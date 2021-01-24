import {SBFBaseBindingHandler} from "./sbfBindingHandler";
import {ISBFEventHandlerOptions, ISBFLocalization} from "../common/interfaces";

interface ISBFEventListenerProxy{
    eventName:string;
    listener:EventListener;
}

// noinspection JSUnfilteredForInLoop
export class SBFEventBindingHandler extends SBFBaseBindingHandler<ISBFEventHandlerOptions>{
    //#region private
    private eventListenerProxies : Array<ISBFEventListenerProxy> = [];
    private proxyEvent(eventName:string,listener:EventListener){
        let newListener = (e:Event)=>{
            listener(e);
        };
        this.eventListenerProxies.push({eventName:eventName,listener:newListener});
        this.element.addEventListener(eventName,newListener);
    }
    private processAndApplyEvents(){
        for(let event in this.bindingOptions){
            if(event != "isBindingHandlerOptionsObject"){
                let eventListener = this.bindingOptions[event] ? this.bindingOptions[event]: event;
                if(typeof eventListener != "function") {
                    let errorMessage = "Event listener must be a method.";
                    throw new Error(errorMessage);
                }
                this.proxyEvent(event,eventListener);
            }
        }
    }
    //#endregion
    //#region protected
    protected initialize() {
        this.processAndApplyEvents();
    }
    //#end
    //#region constructor
    /**
     * Creates an event binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFEventHandlerOptions,localization?:ISBFLocalization) {
        super(element,bindingOptions,localization);
        this.initialize();
    }
    // #endregion
    //#region
    /** Called when the binding element is removed from the DOM. It removes all event listeners.*/
    dispose() {
        super.dispose();
        this.eventListenerProxies.forEach((e)=>{
            this.element.removeEventListener(e.eventName,e.listener);
        })
    }
    //#endregion
}