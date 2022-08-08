[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFSelectHandlerOptions

# Interface: ISBFSelectHandlerOptions

Select binding handler.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFSelectHandlerOptions`**

## Table of contents

### Properties

- [data](ISBFSelectHandlerOptions.md#data)
- [displayField](ISBFSelectHandlerOptions.md#displayfield)
- [isBindingHandlerOptionsObject](ISBFSelectHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFSelectHandlerOptions.md#observable)
- [onSelectionChange](ISBFSelectHandlerOptions.md#onselectionchange)
- [selectionLabel](ISBFSelectHandlerOptions.md#selectionlabel)
- [value](ISBFSelectHandlerOptions.md#value)
- [valueField](ISBFSelectHandlerOptions.md#valuefield)

## Properties

### data

• **data**: `any`[] \| [`ISBFObservable`](ISBFObservable.md)<`any`[]\>

The data to be rendered.

___

### displayField

• **displayField**: `string`

The field name that should be displayed.

___

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)

___

### observable

• `Optional` **observable**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

The bound observable or primitive value

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[observable](ISBFBindingHandlerOptions.md#observable)

___

### onSelectionChange

• `Optional` **onSelectionChange**: (`selectedElement`: `any`, `event`: `Event`) => `void`

#### Type declaration

▸ (`selectedElement`, `event`): `void`

Listener for selection changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `selectedElement` | `any` |
| `event` | `Event` |

##### Returns

`void`

___

### selectionLabel

• `Optional` **selectionLabel**: `string`

If defined an empty value option item will be created and it's text would be the optionLabel

___

### value

• `Optional` **value**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

Observable to be updated whenever the selection changes.

___

### valueField

• **valueField**: `string`

The field name that should the 'value' attribute be assigned.
