[Simple binding framework](../README.md) / [Exports](../modules.md) / SBFManager

# Class: SBFManager

## Table of contents

### Constructors

- [constructor](SBFManager.md#constructor)

### Methods

- [applyBindings](SBFManager.md#applybindings)
- [cleanNode](SBFManager.md#cleannode)
- [registerBindingHandler](SBFManager.md#registerbindinghandler)

## Constructors

### constructor

• **new SBFManager**()

## Methods

### applyBindings

▸ `Static` **applyBindings**(`rootElement`, `viewModel`, `localization?`, `attributeName?`): `void`

Iterates through the DOM, from the given element level, and applies SBF bindings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootElement` | `Element` | The rootElement for the SBF binding context. |
| `viewModel` | `any` | The binding context. |
| `localization?` | [`ISBFLocalization`](../interfaces/ISBFLocalization.md) | A localization engine. |
| `attributeName?` | `string` | The attribute where to look for binding options. Default is 'data-bind-sbf' |

#### Returns

`void`

___

### cleanNode

▸ `Static` **cleanNode**(`element`): `void`

Removes all child nodes for the given element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | The element to clean. |

#### Returns

`void`

___

### registerBindingHandler

▸ `Static` **registerBindingHandler**(`name`, `details`): `void`

Register a SBF binding handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the binding handler. |
| `details` | [`ISBFBindingHandlerRepositoryItem`](../interfaces/ISBFBindingHandlerRepositoryItem.md) | The binding handler registration details. |

#### Returns

`void`
