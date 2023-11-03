[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFBindingHandlerOptions

# Interface: ISBFBindingHandlerOptions

Base interface for all binding handler options.

## Hierarchy

- **`ISBFBindingHandlerOptions`**

  ↳ [`ISBFClickHandlerOptions`](ISBFClickHandlerOptions.md)

  ↳ [`ISBFForeachHandlerOptions`](ISBFForeachHandlerOptions.md)

  ↳ [`ISBFSelectHandlerOptions`](ISBFSelectHandlerOptions.md)

  ↳ [`ISBFTemplateHandlerOptions`](ISBFTemplateHandlerOptions.md)

  ↳ [`ISBFTextHandlerOptions`](ISBFTextHandlerOptions.md)

  ↳ [`ISBFValueBindingHandlerOptions`](ISBFValueBindingHandlerOptions.md)

  ↳ [`ISBFVisibleHandlerOptions`](ISBFVisibleHandlerOptions.md)

## Table of contents

### Properties

- [isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFBindingHandlerOptions.md#observable)
- [validationRules](ISBFBindingHandlerOptions.md#validationrules)

## Properties

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

___

### observable

• `Optional` **observable**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

The bound observable or primitive value.

___

### validationRules

• `Optional` **validationRules**: [`ISBFValidationRule`](ISBFValidationRule.md)[]

Validation rules.
