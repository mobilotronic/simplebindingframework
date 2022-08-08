[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFBindingHandlerOptions

# Interface: ISBFBindingHandlerOptions

Base interface for all binding handler options.

## Hierarchy

- **`ISBFBindingHandlerOptions`**

  ↳ [`ISBFValueBindingHandlerOptions`](ISBFValueBindingHandlerOptions.md)

  ↳ [`ISBFTemplateHandlerOptions`](ISBFTemplateHandlerOptions.md)

  ↳ [`ISBFClickHandlerOptions`](ISBFClickHandlerOptions.md)

  ↳ [`ISBFForeachHandlerOptions`](ISBFForeachHandlerOptions.md)

  ↳ [`ISBFVisibleHandlerOptions`](ISBFVisibleHandlerOptions.md)

  ↳ [`ISBFTextHandlerOptions`](ISBFTextHandlerOptions.md)

  ↳ [`ISBFSelectHandlerOptions`](ISBFSelectHandlerOptions.md)

## Table of contents

### Properties

- [isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)
- [observable](ISBFBindingHandlerOptions.md#observable)

## Properties

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

___

### observable

• `Optional` **observable**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

The bound observable or primitive value
