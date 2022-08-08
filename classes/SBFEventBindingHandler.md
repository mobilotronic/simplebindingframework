[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFEventBindingHandler

# Class: SBFEventBindingHandler

## Hierarchy

- [`SBFBaseBindingHandler`](SBFBaseBindingHandler.md)<[`ISBFEventHandlerOptions`](../interfaces/ISBFEventHandlerOptions.md)\>

  ↳ **`SBFEventBindingHandler`**

## Table of contents

### Constructors

- [constructor](SBFEventBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFEventBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFEventBindingHandler.md#dispose)
- [elementAs](SBFEventBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFEventBindingHandler**(`element`, `bindingOptions`, `localization?`)

Creates an event binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | [`ISBFEventHandlerOptions`](../interfaces/ISBFEventHandlerOptions.md) | The binding options. |
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

Called when the binding element is removed from the DOM. It removes all event listeners.

#### Returns

`void`

#### Overrides

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
