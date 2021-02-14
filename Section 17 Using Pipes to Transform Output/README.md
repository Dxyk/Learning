# Section 17 Using Pipes to Transform Output

## Pipes

### Lesson 240 - Introduction & Why Pipes are Useful

**Pipes** are a feature built into Angular2 that allows output transformation in the template. There are synchronous and asynchronous pipes that can handle different types of outputs.

For example,

In TS

```ts
userName = 'Name';
```

In HTML

```html
<p>{{ userName | uppercase }}</p>
```

This will render string `"NAME"`, while keeping the `userName` variable in TS unchanged.

### Lesson 241 - Using Pipes

Using pipes in HTML follows the format of `originalOutput | pipeMethod`.

For example, we want to transform some outputs at render time

In `app.component.html`

- Transform the `instanceType` to upper case using `uppercase`
- Transform the `started` date to readable date format using `date`
- Note that the `uppercase` and `date` pipes are built-in pipes in Angular

```html
{{ server.instanceType | uppercase }} | {{ server.started | date }}
```

### Lesson 242 - Parametrizing Pipes

**Parametrizing pipes** - Some pipes have options / parameters so users can configure them. These parameters determine how the pipes will function.

To parametrize a pipe, use the format of `originalOutput | pipeMethod: parameterInput1: parameterInput2`

In `app.component.html`

```html
{{ server.started | date: 'fullDate' }}
```

### Lesson 243 - Where to learn more about Pipes

Use [Angular.io's docs](https://angular.io/api?query=pipe) to search for available built-in Angular pipes

### Lesson 244 - Chaining Multiple Pipes

It is possible to chain multiple pipes. The format is similar to applying pipes: `originalOutput | pipeMethod1 | pipeMethod2`

Note the order of pipe chaining matters. Generally, the pipes are applied from left to right. I.e. In the above example, `pipeMethod1` will be applied to `originalOutput` first, and then that output is transformed by `pipeMethod2`

In `app.component.html`

- First format the date
- Then transform the formatted date to uppercase
- Note if the order is reversed, the uppercase pipe will throw an error because it will not know how to handle `Date` objects

```html
{{ server.started | date: 'fullDate' | uppercase }}
```