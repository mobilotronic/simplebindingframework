[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFCssBindingHandler

# Class: SBFCssBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFCssBindingHandlerOptions`](../interfaces/ISBFCssBindingHandlerOptions.md)\>

  ↳ **`SBFCssBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFCssBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFCssBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFCssBindingHandler.md#dispose)
- [elementAs](SBFCssBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFCssBindingHandler**(`element`, `bindingOptions`, `localization?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `bindingOptions` | [`ISBFCssBindingHandlerOptions`](../interfaces/ISBFCssBindingHandlerOptions.md) |
| `localization?` | [`ISBFLocalization`](../interfaces/ISBFLocalization.md) |

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
