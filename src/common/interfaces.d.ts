export type NotificationSubscription<T> = (value :T) => void;

/**
 * Binding handler registration details
 */
export interface ISBFBindingHandlerRepositoryItem {
    /**
     * The class of the binding handler.
     */
    bindingHandler:any;
    /**
     * Validates binding value, when parsing the binding options.
     * @param bindingValue - The binding value.
     */
    validateBindingValue?:(bindingValue:ISBFObservable<any> | any)=>boolean;
    /**
     * Helper method supporting shorthand format for the binding handler.
     * @param bindingOptions
     */
    formatBindingOptions?:(bindingOptions:string)=>string;
}

/**
 * The binding handler repository.
 */
export interface ISBFBindingHandlersRepository {
    /**
     * Binding handler registration details.
     */
    [key:string]:ISBFBindingHandlerRepositoryItem;
}

/**
 * Generic dictionary description.
 */
export interface ISBFDictionary<V>{
    [key:string]:V;
}

/**
 * A validation rule can be applicable to an observable.
 * Validation rules, help validate user input, before taking any action.
 */
export interface ISBFValidationRule{
    /**
     * Rule name. If you use one of the default ones, you don't need to define a validate method,
     * unless you want to override the default behavior.
     */
    name:string | "email" | "min" | "max" | "minLength" | "maxLength" | "equal" | "notEqual" | "required";
    /**
     * Message to show from consumer when invalid.
     */
    message?:string | ((value:any) =>string);
    /**
     * Helper property to determine the validity of the observable.
     */
    ruleComparisonValue?:any;
    /**
     * Returns true if the observable's value is valid.
     * @param currentValue - The observables current value.
     * @param ruleComparisonValue - Helper value to determine the validity of the observable.
     */
    validate?:(currentValue:any,ruleComparisonValue?:any)=>boolean;
}

/**
 * The SBFObservable options.
 */
export interface ISBFObservableOptions<T>{
    /**
     * Optionally name the observable.
     */
    name?:string;
    /**
     * If true, it will always call all the registered notification subscriptions, even if there is no real value change.
     */
    notifyAlways?:boolean;
    /**
     * This method will be invoked, whenever the dependency observable(s) have a value change.
     * It is mandatory to return a value, to be the new observable's value.
     * @param dependencies
     */
    onComputeValue?:(dependencies:Array<ISBFObservable<any>>) => any;
    /**
     * Validation rules.
     */
    validationRules?:Array<ISBFValidationRule>;
}

/**
 * The SBFObservable.
 */
export interface ISBFObservable<T>{
    /**
     * The observable value.
     */
    value:T;
    /**
     * Adds a notification subscription. Consumers can use this to track value changes.
     * @param value
     */
    addNotificationSubscription:(value:NotificationSubscription<T>)=>void;
    /**
     * Unique identifier for this observable.
     */
    id:number;
    /**
     * Helper property to distinguish SBFObservable objects from others.
     * Surely other objects can implement the same property and make themselves appear as SBFObservables,
     * but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
     * but to provide an easy way to identify SBFObservable objects/classes.
     */
    isObservable:boolean;
    /**
     * Runs all the validation rules (if defined) and returns true or false.
     * If there are no validation rules, it returns true.
     */
    isValid():boolean;
    /**
     * Observable's options.
     */
    options:ISBFObservableOptions<T>;
    /**
     * Potentially displayable message to be used by consumers, when the observable is invalid.
     * Read-only, works only with validation rules.
     */
    errorWhenInvalid?:string;

    /**
     * Disposes all subscriptions.
     */
    dispose():void;

    /**
     * If set to false, suppresses notifications until restored. Default is true.
     */
    notificationsEnabled?:boolean;
}

/**
 * The SBF computed observable.
 * A computed observable is an observable, that has a calculated/computed value, based on other observables.
 */
export interface ISBFComputedObservable<T> extends ISBFObservable<T>{
    /**
     * Adds an observable as a dependency. Whenever the dependency observable has a value change, the 'onComputeValue' method will be invoked.
     * If there are more than one dependencies, the method will be invoked for each value change of the dependency observable.
     * @param value
     */
    addDependency:(value:ISBFObservable<any>) => void;
}

/**
 * Register an ISBFLocalization object with SBFManager, to have localization support.
 * This will be used by certain binding handlers, like Text or Attribute.
 */
export interface ISBFLocalization{
    /**
     * Translates a localization resource.
     * @param key
     */
    translate(key:string):string;
}

/**
 * Base interface for all binding handler options.
 */
export interface ISBFBindingHandlerOptions{
    /**
     * The bound observable or primitive value
     */
    observable?:ISBFObservable<any>;
    /**
     * Always returns true.
     */
    isBindingHandlerOptionsObject:boolean;
}

/**
 * Generic key/value binding handler. Attribute for example.
 */
export interface ISBFGenericKeyValueHandlerOptions{
    [key:string]:any;
}

/**
 * Value binding handler options.
 */
export interface ISBFValueBindingHandlerOptions extends ISBFBindingHandlerOptions{
    /**
     * If set to true or to a key code, besides adding a blur event handler, it will add a
     * keydown event to monitor for changes. The default key code is 13 (the return key).
     */
    keyboardTriggersChange? : boolean | string;
}

/**
 * Template binding handler options.
 */
export interface ISBFTemplateHandlerOptions extends ISBFBindingHandlerOptions{
    /**
     * Name of the template.
     */
    name:string;
    /**
     * If not defined, it will fallback to the current binding view model.
     */
    bindingViewModel?:any;
    /**
     * Callback to be invoked, after the template is rendered.
     */
    afterRender?:()=>void;
    /**
     * If defined, it will render the template, iterating the data in the foreach property.
     */
    foreachData?: ISBFObservable<Array<any>> | Array<any>;
}

/**
 * Attribute binding handler. Use this to attribute(s) value(s) against an element.
 */
export interface ISBFAttributeHandlerOptions extends ISBFGenericKeyValueHandlerOptions{
}

/**
 * Click binding handler. Use this to bind a click event listener against an element.
 */
export interface ISBFClickHandlerOptions extends ISBFBindingHandlerOptions{
    click:(viewModel?:any,event?:Event)=>void;
}

/**
 * Event(s) binding handler. Use this to bind events against an element.
 */
export interface ISBFEventHandlerOptions extends ISBFGenericKeyValueHandlerOptions{

}

/**
 * Foreach binding handler. Use this to render an array of data using the 1st child of an element as the template.
 */
export interface ISBFForeachHandlerOptions extends ISBFBindingHandlerOptions{
    data:ISBFObservable<Array<any>> | Array<any>;
}

/**
 * Visible binding handler. Use this to bind an observable to control the visibility of an element.
 */
export interface ISBFVisibleHandlerOptions extends ISBFBindingHandlerOptions{
}

/**
 * Text binding handler. Use this to bind an observable to set the text content of an element.
 */
export interface ISBFTextHandlerOptions extends ISBFBindingHandlerOptions{
}

/**
 * Select binding handler.
 */
export interface ISBFSelectHandlerOptions extends ISBFBindingHandlerOptions{
    /** The data to be rendered.*/
    data:Array<any> | ISBFObservable<Array<any>>;
    /** The field name that should the 'value' attribute be assigned.*/
    valueField:string;
    /** The field name that should be displayed.*/
    displayField:string;
    /** Listener for selection changes.*/
    onSelectionChange?:(selectedElement:any,event:Event)=>void;
    /** Observable to be updated whenever the selection changes.*/
    value?:ISBFObservable<any>;
    /** If defined an empty value option item will be created and it's text would be the optionLabel*/
    selectionLabel?:string;
}

/**
 * Css binding handler options
 */
export interface ISBFCssBindingHandlerOptions extends ISBFGenericKeyValueHandlerOptions{

}