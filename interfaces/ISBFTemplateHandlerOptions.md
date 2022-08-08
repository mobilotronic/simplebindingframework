[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFTemplateHandlerOptions

# Interface: ISBFTemplateHandlerOptions

Template binding handler options.

## Hierarchy

- [`ISBFBindingHandlerOptions`](ISBFBindingHandlerOptions.md)

  ↳ **`ISBFTemplateHandlerOptions`**

## Table of contents

### Properties

- [afterRender](ISBFTemplateHandlerOptions.md#afterrender)
- [bindingViewModel](ISBFTemplateHandlerOptions.md#bindingviewmodel)
- [foreachData](ISBFTemplateHandlerOptions.md#foreachdata)
- [isBindingHandlerOptionsObject](ISBFTemplateHandlerOptions.md#isbindinghandleroptionsobject)
- [name](ISBFTemplateHandlerOptions.md#name)
- [observable](ISBFTemplateHandlerOptions.md#observable)

## Properties

### afterRender

• `Optional` **afterRender**: () => `void`

#### Type declaration

▸ (): `void`

Callback to be invoked, after the template is rendered.

##### Returns

`void`

___

### bindingViewModel

• `Optional` **bindingViewModel**: `any`

If not defined, it will fallback to the current binding view model.

___

### foreachData

• `Optional` **foreachData**: `any`[] \| [`ISBFObservable`](ISBFObservable.md)<`any`[]\>

If defined, it will render the template, iterating the data in the foreach property.

___

### isBindingHandlerOptionsObject

• `Optional` **isBindingHandlerOptionsObject**: `boolean`

Always returns true.

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[isBindingHandlerOptionsObject](ISBFBindingHandlerOptions.md#isbindinghandleroptionsobject)

___

### name

• **name**: `string`

Name of the template.

___

### observable

• `Optional` **observable**: [`ISBFObservable`](ISBFObservable.md)<`any`\>

The bound observable or primitive value

#### Inherited from

[ISBFBindingHandlerOptions](ISBFBindingHandlerOptions.md).[observable](ISBFBindingHandlerOptions.md#observable)
