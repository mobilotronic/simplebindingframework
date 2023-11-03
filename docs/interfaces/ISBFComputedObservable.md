[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFComputedObservable

# Interface: ISBFComputedObservable<T\>

The SBF computed observable.
A computed observable is an observable, that has a calculated/computed value, based on other observables.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ISBFObservable`](ISBFObservable.md)<`T`\>

  ↳ **`ISBFComputedObservable`**

## Implemented by

- [`SBFComputedObservable`](../classes/SBFComputedObservable.md)

## Table of contents

### Properties

- [addDependency](ISBFComputedObservable.md#adddependency)
- [addNotificationSubscription](ISBFComputedObservable.md#addnotificationsubscription)
- [addValidationRule](ISBFComputedObservable.md#addvalidationrule)
- [errorWhenInvalid](ISBFComputedObservable.md#errorwheninvalid)
- [id](ISBFComputedObservable.md#id)
- [isObservable](ISBFComputedObservable.md#isobservable)
- [notificationsEnabled](ISBFComputedObservable.md#notificationsenabled)
- [options](ISBFComputedObservable.md#options)
- [value](ISBFComputedObservable.md#value)

### Methods

- [dispose](ISBFComputedObservable.md#dispose)
- [isValid](ISBFComputedObservable.md#isvalid)

## Properties

### addDependency

• **addDependency**: (`value`: [`ISBFObservable`](ISBFObservable.md)<`any`\>) => `void`

#### Type declaration

▸ (`value`): `void`

Adds an observable as a dependency. Whenever the dependency observable has a value change, the 'onComputeValue' method will be invoked.
If there are more than one dependencies, the method will be invoked for each value change of the dependency observable.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ISBFObservable`](ISBFObservable.md)<`any`\> |

##### Returns

`void`

___

### addNotificationSubscription

• **addNotificationSubscription**: (`value`: [`NotificationSubscription`](../modules.md#notificationsubscription)<`T`\>) => `void`

#### Type declaration

▸ (`value`): `void`

Adds a notification subscription. Consumers can use this to track value changes.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`NotificationSubscription`](../modules.md#notificationsubscription)<`T`\> | The notification subscription. |

##### Returns

`void`

#### Inherited from

[ISBFObservable](ISBFObservable.md).[addNotificationSubscription](ISBFObservable.md#addnotificationsubscription)

___

### addValidationRule

• **addValidationRule**: (`value`: [`ISBFValidationRule`](ISBFValidationRule.md)) => `void`

#### Type declaration

▸ (`value`): `void`

Adds a validation rule for the observable.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ISBFValidationRule`](ISBFValidationRule.md) | The validation rule. |

##### Returns

`void`

#### Inherited from

[ISBFObservable](ISBFObservable.md).[addValidationRule](ISBFObservable.md#addvalidationrule)

___

### errorWhenInvalid

• `Optional` **errorWhenInvalid**: `string`

Potentially displayable message to be used by consumers, when the observable is invalid.
Read-only, works only with validation rules.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[errorWhenInvalid](ISBFObservable.md#errorwheninvalid)

___

### id

• **id**: `number`

Unique identifier for this observable.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[id](ISBFObservable.md#id)

___

### isObservable

• **isObservable**: `boolean`

Helper property to distinguish SBFObservable objects from others.
Surely other objects can implement the same property and make themselves appear as SBFObservables,
but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
but to provide an easy way to identify SBFObservable objects/classes.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[isObservable](ISBFObservable.md#isobservable)

___

### notificationsEnabled

• `Optional` **notificationsEnabled**: `boolean`

If set to false, suppresses notifications until restored. Default is true.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[notificationsEnabled](ISBFObservable.md#notificationsenabled)

___

### options

• **options**: [`ISBFObservableOptions`](ISBFObservableOptions.md)<`T`\>

Observable's options.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[options](ISBFObservable.md#options)

___

### value

• **value**: `T`

The observable value.

#### Inherited from

[ISBFObservable](ISBFObservable.md).[value](ISBFObservable.md#value)

## Methods

### dispose

▸ **dispose**(): `void`

Disposes all subscriptions.

#### Returns

`void`

#### Inherited from

[ISBFObservable](ISBFObservable.md).[dispose](ISBFObservable.md#dispose)

___

### isValid

▸ **isValid**(): `boolean`

Runs all the validation rules (if defined) and returns true or false.
If there are no validation rules, it returns true.

#### Returns

`boolean`

#### Inherited from

[ISBFObservable](ISBFObservable.md).[isValid](ISBFObservable.md#isvalid)
