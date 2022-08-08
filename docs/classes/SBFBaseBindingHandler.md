[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFBaseBindingHandler

# Class: SBFBaseBindingHandler<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`SBFBaseBindingHandler`**

  ↳ [`SBFAttributeBindingHandler`](SBFAttributeBindingHandler.md)

  ↳ [`SBFClickBindingHandler`](SBFClickBindingHandler.md)

  ↳ [`SBFCssBindingHandler`](SBFCssBindingHandler.md)

  ↳ [`SBFEventBindingHandler`](SBFEventBindingHandler.md)

  ↳ [`SBFForEachBindingHandler`](SBFForEachBindingHandler.md)

  ↳ [`SBFSelectBindingHandler`](SBFSelectBindingHandler.md)

  ↳ [`SBFTemplateBindingHandler`](SBFTemplateBindingHandler.md)

  ↳ [`SBFTextBindingHandler`](SBFTextBindingHandler.md)

  ↳ [`SBFValueBindingHandler`](SBFValueBindingHandler.md)

  ↳ [`SBFVisibleBindingHandler`](SBFVisibleBindingHandler.md)

## Table of contents

### Constructors

- [constructor](SBFBaseBindingHandler.md#constructor)

### Accessors

- [bindingOptions](SBFBaseBindingHandler.md#bindingoptions)

### Methods

- [dispose](SBFBaseBindingHandler.md#dispose)
- [elementAs](SBFBaseBindingHandler.md#elementas)

## Constructors

### constructor

• **new SBFBaseBindingHandler**<`T`\>(`element`, `bindingOptions`, `localization?`)

Creates a binding handler.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to bind against. |
| `bindingOptions` | `any` | The binding options. |
| `localization?` | [`ISBFLocalization`](../interfaces/ISBFLocalization.md) | The localization object in order to localize any string, that needs localization. |

## Accessors

### bindingOptions

• `get` **bindingOptions**(): `T`

The binding options.

#### Returns

`T`

## Methods

### dispose

▸ **dispose**(): `void`

Called when the binding element is removed from the DOM.

#### Returns

`void`

___

### elementAs

▸ **elementAs**<`T`\>(): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`
