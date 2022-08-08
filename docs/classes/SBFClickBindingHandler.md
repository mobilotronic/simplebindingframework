[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFClickBindingHandler

# Class: SBFClickBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFClickHandlerOptions`](../interfaces/ISBFClickHandlerOptions.md)\>

  ↳ **`SBFClickBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFClickBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFClickBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFClickBindingHandler.md#dispose)
- [elementAs](SBFClickBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFClickBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a click binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFClickHandlerOptions`](../interfaces/ISBFClickHandlerOptions.md) | The binding options. |
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
