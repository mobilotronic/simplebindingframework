# Simple binding framework (SBF)
Simple binding framework is a small JavaScript library that helps you build data-driven web applications.

Using observables and two-way binding it can auto-magically update the UI, without the need of writing explicit code for updating the DOM.

It has build in support for validation and localization, which makes it easy to validate and localize parts of your application.

## Features
* Declarative binding
* Two-way binding
* Default binding handlers
* Built-in validation
* Localization support

### Declarative binding
Using declarative binding, you can have multiple bindings against an element.

For example a binding declaration like the following

```html
<input data-bind-sbf="value:{observable:SearchValue,keyboardTriggersChange:true};
attr:{placeholder:Type Search,title:TitleAttribute};
events:{keydown:inputSearchKeyDown}"/>
```
will:
* Bind the `SearchValue` observable, of the current binding context, against the input element's value property.
* Add a placeholder attribute `Type Search` as value
* Bind the `TitleAttribute` observable,of the current binding context, against the `title` attribute.
* Will add a `keydown` event and bind it to the `inputSearchKeyDown` method of the current binding context.


### Two-way binding
Two-way binding simply means that an SBF observable can be updated both programmatically and UI driven changes.

### Default binding handlers
There is a number of default binding handlers, that would most likely be enough for an average application.

#### Attribute binding handler
Add/removes attributes to an element. If the given values are SBF observables, it will update attribute values automatically.

`data-bind-sbf="attr:{placeholder:SearchPlaceHolder}"`

If the attribute bound value is `null`, the attribute will be removed.

#### Click binding handler
As the name implies, this is really a convenience to add a `click` listener to an element.
`data-bind-sbf="click:Search`

Same can be achieved using the events binding handler.

#### Css binding handler
Use this to dynamically add/remove css classes to an element.

`data-bind-sbf="css:{input-invalid:IsInputSearchInvalid}"`

The bound SBF observable must be of type `boolean`. It will add a class if the bound observable value is `true` and remove it if it's `false`

In the example above, the class `input-invalid` will be added to the element if the `IsInputSearchInvalid` is true.

#### Event binding handler
A binding handler for adding event listeners to an element.

`data-bind-sbf="events:{keydown:inputSearchKeyDown}"`

#### ForEach binding handler
`ForEach` binding is a quite powerful binding handler, as it can render dynamically DOM elements, driven by an array of arbitrary objects.

The `foreach` binding is taking the 1st child element of the element that is bound to and uses that as template, to render the associated data.

Nested `foreach` declarations are supported.

Quick example, using a pug template.

```
table
    thead
        tr
            th(data-bind-sbf="text:Shop")
    tbody(data-bind-sbf="foreach:shops")
        tr
            td(data-bind-sbf="text:shopName")
            td
                table
                    thead
                        tr
                            th(data-bind-sbf="text:Price")
                            th(data-bind-sbf="text:Date")
                    tbody(data-bind-sbf="foreach:details")
                        tr
                            td(data-bind-sbf="text:price")
                            td(data-bind-sbf="text:date")
```
In the example above the `foreach` is bound against the `tbody` element.
The handler takes as input a table named `shops`.

The `tbody` 1st child element is a `tr` and that will be used as the template.

It will iterate through all data in the `shops` table and render a `tr` for each shop.

If there are any nested `foreach` declarations the same flow/logic will be applied.

#### Select binding handler
A binding handler specifically for `select` elements.

`data-bind-sbf="select:{data:ResultPages,value:CurrentPage}"`

#### Template binding handler
Another powerful binding handler, as it can render dynamically DOM elements driven by an array of arbitrary objects.

`data-bind-sbf="template:{name:searchResultsTemplate,foreachData:SearchResults}"`

In the example above, the handler will look for an `HTMLTemplateElement` with an id of `searchResultsTemplate` and render  its contents

#### Text binding handler
A binding handler that sets the value of the `textContent` of the bound element.

`data-bind-sbf="text:About"`

#### Value binding handler
A binding handler specifically for `input` or `textarea` elements.

`data-bind-sbf="value:{observable:SearchValue,keyboardTriggersChange:true}"`

#### Visible binding handler
A binding handler to control the visibility of an element.

`data-bind-sbf="visible:CanShowElement"`
