[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFClickHandlerOptions

# Interface: ISBFClickHandlerOptions

Click binding handler. Use this to bind a click event listener against an element.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFClickHandlerOptions`**

## Table of contents

### Properties

- [click](ISBFClickHandlerOptions.md#click)
- [isBindingHandlerOptionsObject](ISBFClickHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFClickHandlerOptions.md#observable)
- [validationRules](ISBFClickHandlerOptions.md#validationrules)

## Properties

### click

• **click**: (`viewModel?`: `any`, `event?`: `Event`) => `void`

#### Type declaration

▸ (`viewModel?`, `event?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `viewModel?` | `any` |
| `event?` | `Event` |

##### Returns

`void`

___

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)

___

### observable

• `Optional` **observable**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

The bound observable or primitive value.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[observable](ISBFBindingHandlerOptions.md#observable)

___

### validationRules

• `Optional` **validationRules**: [`ISBFValidationRule`](ISBFValidationRule.md)[]

Validation rules.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[validationRules](ISBFBindingHandlerOptions.md#validationrules)
