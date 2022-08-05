import {
    ISBFAttributeHandlerOptions, ISBFBindingHandlerOptions, ISBFBindingHandlerRepositoryItem,
    ISBFClickHandlerOptions, ISBFComputedObservable,
    ISBFCssBindingHandlerOptions,
    ISBFEventHandlerOptions,
    ISBFForeachHandlerOptions,
    ISBFLocalization, ISBFObservable, ISBFObservableOptions, ISBFSelectHandlerOptions, ISBFTemplateHandlerOptions,
    ISBFTextHandlerOptions,
    ISBFValueBindingHandlerOptions,
    ISBFVisibleHandlerOptions, NotificationSubscription
} from "./common/interfaces";


export * from "./common/interfaces";

export type SBFLoglevel = "info" | "error" | "warning" | "debug";

export type SBFErrorType = "error" | "evalError" | "rangeError" | "referenceError" | "syntaxError" | "typeError" | "uriError";

export declare class SBFObservable<T> implements ISBFObservable<T>{
    //#region constructor
    /**
     * Creates an observable.
     * @param value - The observable's initial value.
     * @param options - The observable's options.
     */
    constructor(value:T,options?:ISBFObservableOptions<T>);
    //#endregion

    //#region public
    /**
     * Unique identifier for this observable.
     */
    get id():number;
    /**
     * The observable value.
     */
    get value();
    /**
     * The observable value.
     */
    set value(newValue:T);
    /**
     * Adds a notification subscription. Consumers can use this to track value changes.
     * @param notificationSubscription - The notification subscription.
     */
    addNotificationSubscription(notificationSubscription:NotificationSubscription<T>);
    /**
     * Observable's options.
     */
    get options():ISBFObservableOptions<T>;
    /**
     * Helper property to distinguish SBFObservable objects from others.
     * Surely other objects can implement the same property and make themselves appear as SBFObservables,
     * but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
     * but to provide an easy way to identify SBFObservable objects/classes.
     */
    get isObservable():boolean;
    /**
     * Potentially displayable message to be used by consumers, when the observable is invalid.
     * Read-only, works only with validation rules.
     */
    get errorWhenInvalid():string;
    notificationsEnabled:boolean;
    /**
     * Runs all the validation rules (if defined) and returns true or false.
     * If there are no validation rules, it returns true.
     */
    isValid(): boolean;
    /** Disposes subscriptions*/
    dispose();
    //#endregion
}

export declare class SBFComputedObservable<T> extends SBFObservable<T> implements ISBFComputedObservable<T>{
    //#region constructor
    /**
     * Creates a computed observable.
     * @param value
     * @param options
     */
    constructor(value:T,options:ISBFObservableOptions<T>);
    //#endregion

    //#region public
    /**
     * Adds an observable as a dependency.
     * @param value
     */
    addDependency(value:ISBFObservable<T| any>);
    //#endregion
}

export declare class SBFManager{


    //#region public
    /**
     * Iterates through the DOM, from the given element level, and applies SBF bindings.
     * @param rootElement - The rootElement for the SBF binding context.
     * @param viewModel - The binding context.
     * @param localization - A localization engine.
     * @param attributeName - The attribute where to look for binding options. Default is 'data-bind-sbf'
     */
    public static applyBindings(rootElement:Element | HTMLElement | null,viewModel:any,localization?:ISBFLocalization,attributeName?:string);

    /**
     * Register a SBF binding handler.
     * @param name - The name of the binding handler.
     * @param details - The binding handler registration details.
     */
    public static registerBindingHandler(name:string,details:ISBFBindingHandlerRepositoryItem);
    /**
     * Removes all child nodes for the given element.
     * @param element - The element to clean.
     */
    public static cleanNode(element:Element);

    /**
     * Returns true if the passed parameter is an SBFObservable
     * @param value
     */
    public static isObservable(value:any):value is ISBFObservable<any>;

    /**
     * Logs a message into the console.
     * @param message - The message to log.
     * @param logType - The log type.
     */
    public static log(message:string, logType?:SBFLoglevel);

    /**
     * Set this to true, to enable SBF debug/log messages.
     */
    public static debug:boolean;
    //#endregion
}
export declare class SBFBaseBindingHandler<T>{
    //#region constructor
    /**
     * Creates a binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFBindingHandlerOptions | ISBFObservable<T> | any,localization?:ISBFLocalization);
    //#endregion
    //#region public
    /** The binding options. */
    get bindingOptions():T;
    /** Called when the binding element is removed from the DOM.*/
    dispose();
    //#endregion
}
export declare class SBFAttributeBindingHandler extends SBFBaseBindingHandler<ISBFAttributeHandlerOptions>{
    //#region constructor
    /**
     * Creates an attribute binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFAttributeHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFClickBindingHandler extends SBFBaseBindingHandler<ISBFClickHandlerOptions>{
    //#region constructor
    /**
     * Creates a click binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFClickHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFCssBindingHandler extends SBFBaseBindingHandler<ISBFCssBindingHandlerOptions>{
    //#region constructor
    /**
     * Creates a CSS binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFCssBindingHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFEventBindingHandler extends SBFBaseBindingHandler<ISBFEventHandlerOptions>{
    //#region constructor
    /**
     * Creates an event binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFEventHandlerOptions,localization?:ISBFLocalization);
    // #endregion
    //#region
    /** Called when the binding element is removed from the DOM. It removes all event listeners.*/
    dispose();
    //#endregion
}
export declare class SBFForEachBindingHandler extends SBFBaseBindingHandler<ISBFForeachHandlerOptions>{
    //#region constructor
    /**
     * Creates a foreach binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFForeachHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFSelectBindingHandler extends SBFBaseBindingHandler<ISBFSelectHandlerOptions>{
    //#region constructor
    /**
     * Creates a Select binding handler.
     * @param element - The element to bind against. Must be a SELECT element.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFSelectHandlerOptions,localization?:ISBFLocalization)
    //#endregion
}
export declare class SBFTemplateBindingHandler extends SBFBaseBindingHandler<ISBFTemplateHandlerOptions>{
    //#region constructor
    /**
     * Creates a template binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFTemplateHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFTextBindingHandler extends SBFBaseBindingHandler<ISBFTextHandlerOptions>{
    //#region constructor
    /**
     * Creates a text binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFTextHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFValueBindingHandler extends SBFBaseBindingHandler<ISBFValueBindingHandlerOptions>{
    //#region constructor
    /**
     * Creates a value binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFValueBindingHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}
export declare class SBFVisibleBindingHandler extends SBFBaseBindingHandler<ISBFVisibleHandlerOptions>{
    //#region constructor
    /**
     * Creates a visible binding handler.
     * @param element - The element to bind against.
     * @param bindingOptions - The binding options.
     * @param localization - The localization object in order to localize any string, that needs localization.
     */
    constructor(element:Element,bindingOptions:ISBFVisibleHandlerOptions,localization?:ISBFLocalization);
    //#endregion
}