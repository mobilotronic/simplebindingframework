[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFAttributeBindingHandler

# Class: SBFAttributeBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFAttributeHandlerOptions`](../interfaces/ISBFAttributeHandlerOptions.md)\>

  ↳ **`SBFAttributeBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFAttributeBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFAttributeBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFAttributeBindingHandler.md#dispose)
- [elementAs](SBFAttributeBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFAttributeBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates an attribute binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFAttributeHandlerOptions`](../interfaces/ISBFAttributeHandlerOptions.md) | The binding options. |
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
