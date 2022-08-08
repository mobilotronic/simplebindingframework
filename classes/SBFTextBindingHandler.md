[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFTextBindingHandler

# Class: SBFTextBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFTextHandlerOptions`](../interfaces/ISBFTextHandlerOptions.md)\>

  ↳ **`SBFTextBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFTextBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFTextBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFTextBindingHandler.md#dispose)
- [elementAs](SBFTextBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFTextBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a text binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFTextHandlerOptions`](../interfaces/ISBFTextHandlerOptions.md) | The binding options. |
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
