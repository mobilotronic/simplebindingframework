[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFVisibleBindingHandler

# Class: SBFVisibleBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFVisibleHandlerOptions`](../interfaces/ISBFVisibleHandlerOptions.md)\>

  ↳ **`SBFVisibleBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFVisibleBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFVisibleBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFVisibleBindingHandler.md#dispose)
- [elementAs](SBFVisibleBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFVisibleBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a visible binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFVisibleHandlerOptions`](../interfaces/ISBFVisibleHandlerOptions.md) | The binding options. |
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
