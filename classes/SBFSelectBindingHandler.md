[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFSelectBindingHandler

# Class: SBFSelectBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFSelectHandlerOptions`](../interfaces/ISBFSelectHandlerOptions.md)\>

  ↳ **`SBFSelectBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFSelectBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFSelectBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFSelectBindingHandler.md#dispose)
- [elementAs](SBFSelectBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFSelectBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a Select binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. Must be a SELECT element. |
| `bindingOptions` | [`ISBFSelectHandlerOptions`](../interfaces/ISBFSelectHandlerOptions.md) | The binding options. |
| `localization?` | [`ISBFLocalization`](../interfaces/ISBFLocalization.md) | The localization object in order to localize any string, that needs localization. |

#### Overrides

[SBFBaseBindingHandler](SBFBaseBindingHandler.md).[constructor](SBFBaseBindingHandler.md#constructor)

## Accessors

### bindingOptions

• `get` **bindingOptions**(): `T`

The binding options.

#### Returns

`T`

#### Inherited from

SBFBaseBindingHandler.bindingOptions

## Methods

### dispose

▸ **dispose**(): `void`

Called when the binding element is removed from the DOM.

#### Returns

`void`

#### Inherited from

[SBFBaseBindingHandler](SBFBaseBindingHandler.md).[dispose](SBFBaseBindingHandler.md#dispose)

___

### elementAs

▸ **elementAs**<`T`\>(): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`

#### Inherited from

[SBFBaseBindingHandler](SBFBaseBindingHandler.md).[elementAs](SBFBaseBindingHandler.md#elementas)
