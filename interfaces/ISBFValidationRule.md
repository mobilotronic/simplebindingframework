[Simple binding framework](../README.md) / [Exports](../modules.md) / ISBFValidationRule

# Interface: ISBFValidationRule

A validation rule can be applicable to an observable.
Validation rules, help validate user input, before taking any action.

## Table of contents

### Properties

- [message](ISBFValidationRule.md#message)
- [name](ISBFValidationRule.md#name)
- [ruleComparisonValue](ISBFValidationRule.md#rulecomparisonvalue)
- [validate](ISBFValidationRule.md#validate)

## Properties

### message

• `Optional` **message**: `string` \| (`value`: `any`) => `string`

Message to show from consumer when invalid.

___

### name

• **name**: `string`

Rule name. If you use one of the default ones, you don't need to define a validate method,
unless you want to override the default behavior.

___

### ruleComparisonValue

• `Optional` **ruleComparisonValue**: `any`

Helper property to determine the validity of the observable.

___

### validate

• `Optional` **validate**: (`currentValue`: `any`, `ruleComparisonValue?`: `any`) => `boolean`

#### Type declaration

▸ (`currentValue`, `ruleComparisonValue?`): `boolean`

Returns true if the observable's value is valid.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentValue` | `any` | The observables current value. |
| `ruleComparisonValue?` | `any` | Helper value to determine the validity of the observable. |

##### Returns

`boolean`
