[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFObservable

# Interface: ISBFObservable<T\>

The SBFObservable.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`ISBFObservable`**

  ↳ [`ISBFComputedObservable`](ISBFComputedObservable.md)

## Implemented by

- [`SBFObservable`](../classes/SBFObservable.md)

## Table of contents

### Properties

- [addNotificationSubscription](ISBFObservable.md#addnotificationsubscription)
- [errorWhenInvalid](ISBFObservable.md#errorwheninvalid)
- [id](ISBFObservable.md#id)
- [isObservable](ISBFObservable.md#isobservable)
- [notificationsEnabled](ISBFObservable.md#notificationsenabled)
- [options](ISBFObservable.md#options)
- [value](ISBFObservable.md#value)

### Methods

- [dispose](ISBFObservable.md#dispose)
- [isValid](ISBFObservable.md#isvalid)

## Properties

### addNotificationSubscription

• **addNotificationSubscription**: (`value`: [`NotificationSubscription`](../modules.md#notificationsubscription)<`T`\>) => `void`

#### Type declaration

▸ (`value`): `void`

Adds a notification subscription. Consumers can use this to track value changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NotificationSubscription`](../modules.md#notificationsubscription)<`T`\> |

##### Returns

`void`

___

### errorWhenInvalid

• `Optional` **errorWhenInvalid**: `string`

Potentially displayable message to be used by consumers, when the observable is invalid.
Read-only, works only with validation rules.

___

### id

• **id**: `number`

Unique identifier for this observable.

___

### isObservable

• **isObservable**: `boolean`

Helper property to distinguish SBFObservable objects from others.
Surely other objects can implement the same property and make themselves appear as SBFObservables,
but the purpose of this property is not to securely test if an object is indeed an SBFObservable,
but to provide an easy way to identify SBFObservable objects/classes.

___

### notificationsEnabled

• `Optional` **notificationsEnabled**: `boolean`

If set to false, suppresses notifications until restored. Default is true.

___

### options

• **options**: [`ISBFObservableOptions`](ISBFObservableOptions.md)<`T`\>

Observable's options.

___

### value

• **value**: `T`

The observable value.

## Methods

### dispose

▸ **dispose**(): `void`

Disposes all subscriptions.

#### Returns

`void`

___

### isValid

▸ **isValid**(): `boolean`

Runs all the validation rules (if defined) and returns true or false.
If there are no validation rules, it returns true.

#### Returns

`boolean`
