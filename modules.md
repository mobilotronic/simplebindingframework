[Simple binding framework](README.md) / Exports

# Simple binding framework

## Table of contents

### Classes

- [SBFAttributeBindingHandler](classes/SBFAttributeBindingHandler.md)
- [SBFBaseBindingHandler](classes/SBFBaseBindingHandler.md)
- [SBFClickBindingHandler](classes/SBFClickBindingHandler.md)
- [SBFComputedObservable](classes/SBFComputedObservable.md)
- [SBFCssBindingHandler](classes/SBFCssBindingHandler.md)
- [SBFEventBindingHandler](classes/SBFEventBindingHandler.md)
- [SBFForEachBindingHandler](classes/SBFForEachBindingHandler.md)
- [SBFManager](classes/SBFManager.md)
- [SBFObservable](classes/SBFObservable.md)
- [SBFSelectBindingHandler](classes/SBFSelectBindingHandler.md)
- [SBFTemplateBindingHandler](classes/SBFTemplateBindingHandler.md)
- [SBFTextBindingHandler](classes/SBFTextBindingHandler.md)
- [SBFValueBindingHandler](classes/SBFValueBindingHandler.md)
- [SBFVisibleBindingHandler](classes/SBFVisibleBindingHandler.md)

### Interfaces

- [ISBFAttributeHandlerOptions](interfaces/ISBFAttributeHandlerOptions.md)
- [ISBFBindingHandlerOptions](interfaces/ISBFBindingHandlerOptions.md)
- [ISBFBindingHandlerRepositoryItem](interfaces/ISBFBindingHandlerRepositoryItem.md)
- [ISBFBindingHandlersRepository](interfaces/ISBFBindingHandlersRepository.md)
- [ISBFClickHandlerOptions](interfaces/ISBFClickHandlerOptions.md)
- [ISBFComputedObservable](interfaces/ISBFComputedObservable.md)
- [ISBFCssBindingHandlerOptions](interfaces/ISBFCssBindingHandlerOptions.md)
- [ISBFDictionary](interfaces/ISBFDictionary.md)
- [ISBFEventHandlerOptions](interfaces/ISBFEventHandlerOptions.md)
- [ISBFForeachHandlerOptions](interfaces/ISBFForeachHandlerOptions.md)
- [ISBFGenericKeyValueHandlerOptions](interfaces/ISBFGenericKeyValueHandlerOptions.md)
- [ISBFLocalization](interfaces/ISBFLocalization.md)
- [ISBFObservable](interfaces/ISBFObservable.md)
- [ISBFObservableOptions](interfaces/ISBFObservableOptions.md)
- [ISBFSelectHandlerOptions](interfaces/ISBFSelectHandlerOptions.md)
- [ISBFTemplateHandlerOptions](interfaces/ISBFTemplateHandlerOptions.md)
- [ISBFTextHandlerOptions](interfaces/ISBFTextHandlerOptions.md)
- [ISBFValidationRule](interfaces/ISBFValidationRule.md)
- [ISBFValueBindingHandlerOptions](interfaces/ISBFValueBindingHandlerOptions.md)
- [ISBFVisibleHandlerOptions](interfaces/ISBFVisibleHandlerOptions.md)

### Type Aliases

- [NotificationSubscription](modules.md#notificationsubscription)
- [SBFLoglevel](modules.md#sbfloglevel)

### Variables

- [SBFBindingHandlersRepository](modules.md#sbfbindinghandlersrepository)

## Type Aliases

### NotificationSubscription

Ƭ **NotificationSubscription**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

___

### SBFLoglevel

Ƭ **SBFLoglevel**: ``"info"`` \| ``"error"`` \| ``"warning"`` \| ``"debug"``

## Variables

### SBFBindingHandlersRepository

• `Const` **SBFBindingHandlersRepository**: [`ISBFBindingHandlersRepository`](interfaces/ISBFBindingHandlersRepository.md)
