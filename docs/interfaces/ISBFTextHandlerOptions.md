[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFTextHandlerOptions

# Interface: ISBFTextHandlerOptions

Text binding handler. Use this to bind an observable to set the text content of an element.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFTextHandlerOptions`**

## Table of contents

### Properties

- [isBindingHandlerOptionsObject](ISBFTextHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFTextHandlerOptions.md#observable)
- [treatNumericStringsAsNumbers](ISBFTextHandlerOptions.md#treatnumericstringsasnumbers)
- [validationRules](ISBFTextHandlerOptions.md#validationrules)

## Properties

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

### treatNumericStringsAsNumbers

• `Optional` **treatNumericStringsAsNumbers**: `boolean`

If set to true, it will convert strings that contain only digits into numbers

___

### validationRules

• `Optional` **validationRules**: [`ISBFValidationRule`](ISBFValidationRule.md)[]

Validation rules.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[validationRules](ISBFBindingHandlerOptions.md#validationrules)
