[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFForeachHandlerOptions

# Interface: ISBFForeachHandlerOptions

Foreach binding handler. Use this to render an array of data using the 1st child of an element as the template.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFForeachHandlerOptions`**

## Table of contents

### Properties

- [data](ISBFForeachHandlerOptions.md#data)
- [isBindingHandlerOptionsObject](ISBFForeachHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFForeachHandlerOptions.md#observable)
- [validationRules](ISBFForeachHandlerOptions.md#validationrules)

## Properties

### data

• **data**: `any`[] \| [`ISBFObservable`](ISBFObservable.md)<`any`[]\>

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
