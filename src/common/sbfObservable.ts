import {
    ISBFComputedObservable,
    ISBFObservable,
    ISBFObservableOptions,
    ISBFValidationRule,
    NotificationSubscription
} from "./interfaces";

//import {nanoid} from "nanoid";
import {SBFCommon} from "./sbfCommon";


// noinspection RegExpRedundantEscape
const emailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
// noinspection JSUnusedLocalSymbols
export const defaultRuleRepository={
    "email":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{return emailRegEx.test(currentValue);}},
    "min":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{
            if(typeof currentValue == "number" && typeof ruleComparisonValue == "number")
                return currentValue < ruleComparisonValue;
            return false;
        }},
    "max":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{
            if(typeof currentValue == "number" && typeof ruleComparisonValue == "number")
                return currentValue > ruleComparisonValue;
            return false;
        }},
    "minlength":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{
            if(typeof currentValue == "string" && typeof ruleComparisonValue == "number")
                return currentValue.length >= ruleComparisonValue;
            return false;
        }},
    "maxlength":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{
            if(typeof currentValue == "string" && typeof ruleComparisonValue == "number")
                return currentValue.length <= ruleComparisonValue;
            return false;
        }},
    "equal":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{return currentValue === ruleComparisonValue;}},
    "notequal":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{return currentValue !== ruleComparisonValue;}},
    "required":<ISBFValidationRule>{validate:(currentValue,ruleComparisonValue)=>{return currentValue != null;}}
}

export class SBFObservable<T> implements ISBFObservable<T>{
 //#region private
    private static _idIndex = 0;
    private _value:T;
    private subscriptions:Array<NotificationSubscription<T>> = [];
    private readonly _options : ISBFObservableOptions<T>;
    private readonly _id:number;
    private _errorWhenInvalid:string;
    private shouldNotifySubscribers(oldValue:T,newValue:T):boolean{
        if(this.notificationsEnabled){
            if(this.options.notifyAlways)
                return true;
            else{
                if(Array.isArray(oldValue) && Array.isArray(newValue)){
                    //if the lengths are different then something has changed.
                    if (oldValue.length != newValue.length)
                        return true;
                    //if the lengths are the same, then we do a shallow check
                    //for all the array items.
                    //NOTE: This will not work for nested arrays.
                    let i = oldValue.length;
                    while (i--)
                        if(oldValue[i] !== newValue[i])
                            return true;
                }
                else{
                    return oldValue !== newValue;
                }
            }
        }
        else return false;
    }
 //#endregion

 //#region protected
    protected notifySubscribers(){
        SBFCommon.log(`Notifying subscribers for ${this.id}.`);
        this.subscriptions.forEach((s)=>{
            s(this.value);
        });
    }
 //#endregion

 //#region constructor
    /**
     * Creates an observable.
     * @param value - The observable's initial value.
     * @param options - The observable's options.
     */
    constructor(value:T,options?:ISBFObservableOptions<T>) {
        this._value = value;
        this._options = options ? options : {notifyAlways:false};
        this._id = SBFObservable._idIndex++;
        if(this._options.validationRules){
            //if there are defined rules, iterate through them.
            this._options.validationRules.forEach((r)=>{
                if(r.name){
                    let defaultRule = defaultRuleRepository[r.name.toLowerCase()];
                    //if a rule matches one of the default ones, set the validate method,
                    //only if not already set.
                    if(defaultRule && !r.validate)
                        r.validate = defaultRule.validate;
                }
            });
        }
    }
 //#endregion

 //#region public
    /**
     * Unique identifier for this observable.
     */
    get id():number{return this._id;}
    /**
     * The observable value.
     */
    get value(){return this._value;}
    /**
     * The observable value.
     */
    set value(newValue:T){
        let notifySubscribers = this.shouldNotifySubscribers(this._value,newValue);
        SBFCommon.log(`Value update for observable ${this.options.name ? this.options.name : this.id}.`);
        this._value = newValue;
        if(notifySubscribers) {
            SBFCommon.log(`Value change for observable ${this.options.name ? this.options.name : this.id}. New value is ${newValue}`);
            this.notifySubscribers();
        }
        else
            SBFCommon.log(`No value change for ${this.options.name ? this.options.name : this.id}. Not notifying subscribers`);
    }
    /**
     * Adds a notification subscription. Consumers can use this to track value changes.
     * @param notificationSubscription - The notification subscription.
     */
    addNotificationSubscription(notificationSubscription:NotificationSubscription<T>){
        if(notificationSubscription)
            this.subscriptions.push(notificationSubscription);
    }
    /**
     * Adds a validation rule.
     * @param value - The validation rule.
     */
    addValidationRule(value: ISBFValidationRule){
        if(value){
            if(!this.options.validationRules)
                this.options.validationRules = [];
            this.options.validationRules.push(value);
        }
    }
    /**
     * Observable's options.
     */
    get options():ISBFObservableOptions<T> { return this._options;}
    /**
     * Helper property to distinguish SBFObservable objects from others.
     * Surely other objects can implement the same property and make themselves appear as SBFObservables,
     * but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
     * but to provide an easy way to identify SBFObservable objects/classes.
     */
    get isObservable():boolean{return true;}
    /**
     * Potentially displayable message to be used by consumers, when the observable is invalid.
     * Read-only, works only with validation rules.
     */
    get errorWhenInvalid():string{
        return this._errorWhenInvalid;
    }
    notificationsEnabled:boolean = true;
    /**
     * Runs all the validation rules (if defined) and returns true or false.
     * If there are no validation rules, it returns true.
     */
    isValid(): boolean {
        this._errorWhenInvalid = undefined;
        if(!this.options.validationRules)
            return true;
        else{
            let result = true;
            for(let i=0;i<=this.options.validationRules.length-1;i++){
                let validationRule = this.options.validationRules[i];
                result = result && validationRule.validate(this.value,validationRule.ruleComparisonValue);
                if(!result) {
                    this._errorWhenInvalid = typeof validationRule.message == "function" ? validationRule.message(this.value) : validationRule.message;
                    break;
                }
            }
            return result;
        }
    }
    /** Disposes subscriptions*/
    dispose() {
        this.subscriptions = [];
    }
    //#endregion
}

export class SBFComputedObservable<T> extends SBFObservable<T> implements ISBFComputedObservable<T>{
    //#region private
    private observableDependencies:Array<ISBFObservable<T>> = [];
    //private compute : (dependencies: Array<ISBFObservable<any>>) => T;
    //#endregion

    //#region constructor
    constructor(value:T,options:ISBFObservableOptions<T>) {
        super(value,options);
        // if(this.options.onComputeValue)
        //     this.compute = this.options.onComputeValue;
    }
    //#endregion

    //#region public
    addDependency(value:ISBFObservable<T| any>){
        //we want to avoid having multiple notification subscriptions for the same observable.
        let existingIndex = this.observableDependencies.findIndex((o)=>{return o.id == value.id});
        if(existingIndex < 0) {
            this.observableDependencies.push(value);
            value.addNotificationSubscription(()=>{
                if(this.options.onComputeValue)
                    this.value = this.options.onComputeValue(this.observableDependencies);
            });
            if(this.options.onComputeValue)
                this.value = this.options.onComputeValue(this.observableDependencies);
        }
    }
    //#endregion
}