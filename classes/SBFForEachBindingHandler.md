[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFForEachBindingHandler

# Class: SBFForEachBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFForeachHandlerOptions`](../interfaces/ISBFForeachHandlerOptions.md)\>

  ↳ **`SBFForEachBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFForEachBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFForEachBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFForEachBindingHandler.md#dispose)
- [elementAs](SBFForEachBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFForEachBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a foreach binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFForeachHandlerOptions`](../interfaces/ISBFForeachHandlerOptions.md) | The binding options. |
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
