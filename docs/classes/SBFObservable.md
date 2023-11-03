[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFObservable

# Class: SBFObservable<T\>

The SBFObservable.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`SBFObservable`**

  ↳ [`SBFComputedObservable`](SBFComputedObservable.md)

## Implements

- [`ISBFObservable`](../interfaces/ISBFObservable.md)<`T`\>

## Table of contents

### Constructors

- [constructor](SBFObservable.md#constructor)

### Properties

- [notificationsEnabled](SBFObservable.md#notificationsenabled)

### Accessors

- [errorWhenInvalid](SBFObservable.md#errorwheninvalid)
- [id](SBFObservable.md#id)
- [isObservable](SBFObservable.md#isobservable)
- [options](SBFObservable.md#options)
- [value](SBFObservable.md#value)

### Methods

- [addNotificationSubscription](SBFObservable.md#addnotificationsubscription)
- [addValidationRule](SBFObservable.md#addvalidationrule)
- [dispose](SBFObservable.md#dispose)
- [isValid](SBFObservable.md#isvalid)

## Constructors

### constructor

• **new SBFObservable**<`T`\>(`value`, `options?`)

Creates an observable.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The observable's initial value. |
| `options?` | [`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\> | The observable's options. |

## Properties

### notificationsEnabled

• **notificationsEnabled**: `boolean` = `true`

If set to false, suppresses notifications until restored. Default is true.

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[notificationsEnabled](../interfaces/ISBFObservable.md#notificationsenabled)

## Accessors

### errorWhenInvalid

• `get` **errorWhenInvalid**(): `string`

Potentially displayable message to be used by consumers, when the observable is invalid.
Read-only, works only with validation rules.

#### Returns

`string`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[errorWhenInvalid](../interfaces/ISBFObservable.md#errorwheninvalid)

___

### id

• `get` **id**(): `number`

Unique identifier for this observable.

#### Returns

`number`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[id](../interfaces/ISBFObservable.md#id)

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

[ISBFObservable](../interfaces/ISBFObservable.md).[isObservable](../interfaces/ISBFObservable.md#isobservable)

___

### options

• `get` **options**(): [`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\>

Observable's options.

#### Returns

[`ISBFObservableOptions`](../interfaces/ISBFObservableOptions.md)<`T`\>

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[options](../interfaces/ISBFObservable.md#options)

___

### value

• `get` **value**(): `T`

The observable value.

#### Returns

`T`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[value](../interfaces/ISBFObservable.md#value)

• `set` **value**(`newValue`): `void`

The observable value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

#### Returns

`void`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[value](../interfaces/ISBFObservable.md#value)

## Methods

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

[ISBFObservable](../interfaces/ISBFObservable.md).[addNotificationSubscription](../interfaces/ISBFObservable.md#addnotificationsubscription)

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

[ISBFObservable](../interfaces/ISBFObservable.md).[addValidationRule](../interfaces/ISBFObservable.md#addvalidationrule)

___

### dispose

▸ **dispose**(): `void`

Disposes subscriptions

#### Returns

`void`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[dispose](../interfaces/ISBFObservable.md#dispose)

___

### isValid

▸ **isValid**(): `boolean`

Runs all the validation rules (if defined) and returns true or false.
If there are no validation rules, it returns true.

#### Returns

`boolean`

#### Implementation of

[ISBFObservable](../interfaces/ISBFObservable.md).[isValid](../interfaces/ISBFObservable.md#isvalid)
