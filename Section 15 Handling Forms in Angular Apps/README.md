# Section 15 Handling Forms in Angular Apps

## Forms Module

### Lesson 181 - Module Introduction

Angular helps submit forms in the HTML page. Since Angular apps are single-paged applications, in order to submit a form, we need to use Angular's HTTP Service. In addition to that, Angular also provides features such as pre-processing, checking and adding styling forms elements.

### Lesson 182 - Why do we Need Angular's Help

Angular's forms module can convert HTML form label and input to JS/TS objects. Through this, it allows additional features such as input validation.

### Lesson 183. Template-Driven (TD) vs Reactive Approach

Angular offers 2 approaches to handle forms

- Template Driven (TD)
  - Set up the form in HTML template
  - Angular infers the form structure
  - Less complex, but less control
- Reactive
  - Set up the form programmatically in TS and HTML code
  - Connect the TS and HTML code manually
  - More complex, but more control

## Template Driven (TD)

The app for the following section can be found in [section15-app-templateDriven](./section15-app-templateDriven).

### Lesson 184 - An Example Form

The form is defined in `app.component.html`. Note that in the `<form>` tag, there is no `action` or `method` attributes. The reason for this is that we don't want this form to be submitted to a server. Instead, Angular should handle this for us.

### Lesson 185 - TD: Creating the Form and Registering the Controls

To have Angular create a form object in a Template Driven approach

In `app.module.ts`, import `FormsModule`

```ts
import { ... } from '...';

@NgModule({
  ...,
  imports: [..., FormsModule],
})
export class AppModule {}
```

In the component's html template, Angular uses the `<form>` as a selector to construct the object representing the form. To register controls to elements (e.g. `<input>`) in the form, we need to

- Add Angular attribute `ngModel` to the tags. This tells Angular that the tag is a control of the form.
  - Recall that to use two-way-binding, we needed to add `[(ngModel)]`
  - In this case, to register the element as a control, the square brackets and parentheses are not needed
- Add HTML attribute `name` to the tag, so Angular knows the name of or reference to the control.

In `app.component.html`

```html
<form>
  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      class="form-control"
      ngModel
      name="username"
    />
  </div>
  <label for="secret">Secret Questions</label>
  <select id="secret" class="form-control" ngModel name="secret">
    <option value="pet">Your first Pet?</option>
    <option value="teacher">Your first teacher?</option>
  </select>
</form>
```