[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFComputedObservable

# Class: SBFComputedObservable<T\>

The SBF computed observable.
A computed observable is an observable, that has a calculated/computed value, based on other observables.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`SBFObservable`](SBFObservable.md)<`T`\>

  ↳ **`SBFComputedObservable`**

## Implements

- [`ISBFComputedObservable`](../interfaces/ISBFComputedObservable.md)<`T`\>

## Table of contents

### Constructors

- [constructor](SBFComputedObservable.md#constructor)

### Properties

- [notificationsEnabled](SBFComputedObservable.md#notificationsenabled)

### Accessors

- [errorWhenInvalid](SBFComputedObservable.md#errorwheninvalid)
- [id](SBFComputedObservable.md#id)
- [isObservable](SBFComputedObservable.md#isobservable)
- [options](SBFComputedObservable.md#options)
- [value](SBFComputedObservable.md#value)

### Methods

- [addDependency](SBFComputedObservable.md#adddependency)
- [addNotificationSubscription](SBFComputedObservable.md#addnotificationsubscription)
- [addValidationRule](SBFComputedObservable.md#addvalidationrule)
- [dispose](SBFComputedObservable.md#dispose)
- [isValid](SBFComputedObservable.md#isvalid)

## Constructors

### constructor

• **new SBFComputedObservable**<`T`\>(`value`, `options`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `options` | [`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\> |

#### Overrides

[SBFObservable](SBFObservable.md).[constructor](SBFObservable.md#constructor)

## Properties

### notificationsEnabled

• **notificationsEnabled**: `boolean` = `true`

If set to false, suppresses notifications until restored. Default is true.

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[notificationsEnabled](../interfaces/ISBFComputedObservable.md#notificationsenabled)

#### Inherited from

[SBFObservable](SBFObservable.md).[notificationsEnabled](SBFObservable.md#notificationsenabled)

## Accessors

### errorWhenInvalid

• `get` **errorWhenInvalid**(): `string`

Potentially displayable message to be used by consumers, when the observable is invalid.
Read-only, works only with validation rules.

#### Returns

`string`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[errorWhenInvalid](../interfaces/ISBFComputedObservable.md#errorwheninvalid)

#### Inherited from

SBFObservable.errorWhenInvalid

___

### id

• `get` **id**(): `number`

Unique identifier for this observable.

#### Returns

`number`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[id](../interfaces/ISBFComputedObservable.md#id)

#### Inherited from

SBFObservable.id

___

### isObservable

• `get` **isObservable**(): `boolean`

Helper property to distinguish SBFObservable objects from others.
Surely other objects can implement the same property and make themselves appear as SBFObservables,
but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
but to provide an easy way to identify SBFObservable objects/classes.

#### Returns

`boolean`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[isObservable](../interfaces/ISBFComputedObservable.md#isobservable)

#### Inherited from

SBFObservable.isObservable

___

### options

• `get` **options**(): [`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\>

Observable's options.

#### Returns

[`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\>

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[options](../interfaces/ISBFComputedObservable.md#options)

#### Inherited from

SBFObservable.options

___

### value

• `get` **value**(): `T`

The observable value.

#### Returns

`T`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[value](../interfaces/ISBFComputedObservable.md#value)

#### Inherited from

SBFObservable.value

• `set` **value**(`newValue`): `void`

The observable value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

#### Returns

`void`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[value](../interfaces/ISBFComputedObservable.md#value)

#### Inherited from

SBFObservable.value

## Methods

### addDependency

▸ **addDependency**(`value`): `void`

Adds an observable as a dependency. Whenever the dependency observable has a value change, the 'onComputeValue' method will be invoked.
If there are more than one dependencies, the method will be invoked for each value change of the dependency observable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ISBFObservable`](../interfaces/ISBFObservable.md)<`any`\> |

#### Returns

`void`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[addDependency](../interfaces/ISBFComputedObservable.md#adddependency)

___

### addNotificationSubscription

▸ **addNotificationSubscription**(`notificationSubscription`): `void`

Adds a notification subscription. Consumers can use this to track value changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `notificationSubscription` | [`NotificationSubscription`](../modules.md#notificationsubscription)<`T`\> | The notification subscription. |

#### Returns

`void`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[addNotificationSubscription](../interfaces/ISBFComputedObservable.md#addnotificationsubscription)

#### Inherited from

[SBFObservable](SBFObservable.md).[addNotificationSubscription](SBFObservable.md#addnotificationsubscription)

___

### addValidationRule

▸ **addValidationRule**(`value`): `void`

Adds a validation rule.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ISBFValidationRule`](../interfaces/ISBFValidationRule.md) | The validation rule. |

#### Returns

`void`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[addValidationRule](../interfaces/ISBFComputedObservable.md#addvalidationrule)

#### Inherited from

[SBFObservable](SBFObservable.md).[addValidationRule](SBFObservable.md#addvalidationrule)

___

### dispose

▸ **dispose**(): `void`

Disposes subscriptions

#### Returns

`void`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[dispose](../interfaces/ISBFComputedObservable.md#dispose)

#### Inherited from

[SBFObservable](SBFObservable.md).[dispose](SBFObservable.md#dispose)

___

### isValid

▸ **isValid**(): `boolean`

Runs all the validation rules (if defined) and returns true or false.
If there are no validation rules, it returns true.

#### Returns

`boolean`

#### Implementation of

[ISBFComputedObservable](../interfaces/ISBFComputedObservable.md).[isValid](../interfaces/ISBFComputedObservable.md#isvalid)

#### Inherited from

[SBFObservable](SBFObservable.md).[isValid](SBFObservable.md#isvalid)
