[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFValueBindingHandler

# Class: SBFValueBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFValueBindingHandlerOptions`](../interfaces/ISBFValueBindingHandlerOptions.md)\>

  ↳ **`SBFValueBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFValueBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFValueBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFValueBindingHandler.md#dispose)
- [elementAs](SBFValueBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFValueBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a value binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFValueBindingHandlerOptions`](../interfaces/ISBFValueBindingHandlerOptions.md) | The binding options. |
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
