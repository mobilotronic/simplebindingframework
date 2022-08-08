[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFBindingHandlerRepositoryItem

# Interface: ISBFBindingHandlerRepositoryItem

Binding handler registration details

## Table of contents

### Properties

- [bindingHandler](ISBFBindingHandlerRepositoryItem.md#bindinghandler)
- [castOptionsAs](ISBFBindingHandlerRepositoryItem.md#castoptionsas)
- [formatBindingOptions](ISBFBindingHandlerRepositoryItem.md#formatbindingoptions)
- [validateBindingValue](ISBFBindingHandlerRepositoryItem.md#validatebindingvalue)

## Properties

### bindingHandler

• **bindingHandler**: `any`

The class of the binding handler.

___

### castOptionsAs

• `Optional` **castOptionsAs**: <T\>(`bindingOptions`: `object`) => `T`

#### Type declaration

▸ <`T`\>(`bindingOptions`): `T`

Casts the binding options to the given class

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindingOptions` | `object` |

##### Returns

`T`

___

### formatBindingOptions

• `Optional` **formatBindingOptions**: (`bindingOptions`: `string`) => `string`

#### Type declaration

▸ (`bindingOptions`): `string`

Helper method supporting shorthand format for the binding handler.

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindingOptions` | `string` |

##### Returns

`string`

___

### validateBindingValue

• `Optional` **validateBindingValue**: (`bindingValue`: `any`) => `boolean`

#### Type declaration

▸ (`bindingValue`): `boolean`

Validates binding value, when parsing the binding options.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bindingValue` | `any` | The binding value. |

##### Returns

`boolean`
