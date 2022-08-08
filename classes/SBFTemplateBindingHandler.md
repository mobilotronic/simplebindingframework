[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFTemplateBindingHandler

# Class: SBFTemplateBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFTemplateHandlerOptions`](../interfaces/ISBFTemplateHandlerOptions.md)\>

  ↳ **`SBFTemplateBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFTemplateBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFTemplateBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFTemplateBindingHandler.md#dispose)
- [elementAs](SBFTemplateBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFTemplateBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates a template binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFTemplateHandlerOptions`](../interfaces/ISBFTemplateHandlerOptions.md) | The binding options. |
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
