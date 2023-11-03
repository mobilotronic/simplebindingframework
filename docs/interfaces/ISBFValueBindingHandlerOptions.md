[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFValueBindingHandlerOptions

# Interface: ISBFValueBindingHandlerOptions

Value binding handler options.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFValueBindingHandlerOptions`**

## Table of contents

### Properties

- [isBindingHandlerOptionsObject](ISBFValueBindingHandlerOptions.md#isbindinghandleroptionsobject)
- [keyboardTriggersChange](ISBFValueBindingHandlerOptions.md#keyboardtriggerschange)
- [observable](ISBFValueBindingHandlerOptions.md#observable)
- [validationRules](ISBFValueBindingHandlerOptions.md#validationrules)

## Properties

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)

___

### keyboardTriggersChange

• `Optional` **keyboardTriggersChange**: `string` \| `boolean`

If set to true or to a key code, besides adding a blur event handler, it will add a
keydown event to monitor for changes. The default key code is 13 (the return key).

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
