# Section 16 Course Project - Forms

## Course Project

### Lesson 217 - Introduction

Goal: Use FormsModule to implement forms in

- ShoppingList - Template Driven Approach
- EditRecipes - Reactive Approach

## Template Driven

### Lesson 218 - TD: Adding the Shopping List Form

Goal: Use TD approach to update the form in the shopping list edit component

In `shopping-edit.component.html`

- Remove local references for inputs
- Add event binding `ngSubmit`
- Add local reference for form and assign it `ngForm`
- Add `name` for input fields
- Register input fields as control using `ngModel`

In `shopping-edit.component.ts`

- Update `onAddItem` to take in the `NgForm` object
- Update logic to get the values using `NgForm.value`

### Lesson 219 - Adding Validation to the Form

Goal: Add required validation to both fields, make sure the number field is a positive number, and disable the add button if the form is invalid

In `shopping-edit.component.html`

- Add `required` property to input fields
- Add `[pattern]="'^[1-9]+[0-9]*$'"`
  - `pattern` is a built-in validator that validates the field base on the regex value it is provided with
- Add `[disabled]="!formElement.valid"`

### Lesson 220 - Allowing the Selection of Items in the List

Goal: Select an item in the shopping list and be able to edit it.

In `shopping-list.service.ts`

- Add `startedEditing` subject to emit editing index on item being edited

In `shopping-edit.component.ts`

- Subscribe to `ShoppingListService.startedEditing` and update index and edit mode on event emitted
- Clean up subscription on destroy

In `shopping-list.component.html`

- Add click listener on list items and pass in the index

In `shopping-list.component.ts`

- Emit the `ShoppingListService.startedEditing` when a list item is clicked

### Lesson 221 - Loading the Shopping List Items into the Form

Goal: On selecting a list item, load it into the edit form

In `shopping-list.service.ts`

- Add a `getIngredient(index)` method to get the ingredient object base on the index

In `shopping-edit.component.ts`

- Set the `editedItem` ingredient on receiving the emitted event
- Use the form reference to set the value of the form base on the `editedItem` using `NgForm.setValue()`

### Lesson 222 - Updating existing Items

Goal: Make editing an item functional and make sure to edit instead of add a new item

In `shopping-edit.component.html`

- Use the `editMode` to generate the text on the button using string interpolation

In `shopping-list.service.ts`

- Add a `updateIngredient(index, newIngredient)` method to update the ingredient of index, and emit a `ingredientsChanged` event

In `shopping-edit.component.ts`

- Call `ShoppingListService.updateIngredient()` if the mode is in edit
- Call `ShoppingListService.addIngredient()` if the mode is not in edit

### Lesson 223 - Resetting the Form

Goal: Reset the form when the Add/Update button is clicked

In `shopping-edit.component.ts`

- Switch `editMode` off once the Add/Update button is clicked
- Add `NgForm.reset()`

### Lesson 224 - Allowing the the User to Clear (Cancel) the Form

Goal: Clear the form when the clear button is clicked

In `shopping-edit.component.html`

- Add a click listener on the clear button

In `shopping-edit.component.ts`

- In the `onClear` method, clear the form and reset the `editMode` when the button is clicked

### Lesson 225 - Allowing the Deletion of Shopping List Items

Goal: Delete items when the Delete button is clicked, and only make button visible if in edit mode

In `shopping-list.service.ts`

- Add a `deleteIngredient(index)` method that
  - Deletes an ingredient of `index`
  - Emits an `ingredientsChanged` event

In `shopping-edit.component.html`

- Add a click listener on the delete button
- Add `*ngIf` to the delete button to only show it in `editMode`

In `shopping-edit.component.ts`

- In the `onDelete` method
  - Delete the ingredient using `ShoppingListService.deleteIngredient(index)`
  - Clear the form

## Reactive Form

### Lesson 226 - Creating the Template for the (Reactive) Recipe Edit Form

Goal: Add the Reactive Form in the recipe-edit component

In `recipe-edit.component.html`

- Set up the form object

### Lesson 227 - Creating the Form For Editing Recipes

Goal: Initialize the form using the Reactive Approach

In `recipe-edit.component.ts`

- Add a `FormGroup` that represents the form
- Create a private `initForm()` method
  - Get the current recipe if the component is in edit mode
  - Initialize the `FormGroup` with the necessary fields with their default values
- Call `initForm` whenever the URL changes, so in the subscription callback

### Lesson 228 - Syncing HTML with the Form

Goal: Synchronize the `FormGroup` and the HTML code

In `app.module.ts`

- Import `ReactiveFormsModule` in `imports`

In `recipe-edit.component.html`

- In the `<form>` tag
  - Add `[formGroup]="recipeForm"` to point angular to the `FormGroup` object
  - Add `(ngSubmit)="onSubmit()"` to invoke the `onSubmit` method when we submit the form
- Register controls in the form using `[formControlName]="'name'"`

In `recipe-edit.component.html`

- Add a `onSubmit()` method that for now, just log the form object

### Lesson 229 - Fixing a Bug

### Lesson 230 - Adding Ingredient Controls to a Form Array

Goal: Add the ingredient list as a `FormArray`

In `recipe-edit.component.ts`

- Add a `FormArray` of recipe ingredients, which will be initialized as empty
- If the current recipe contains ingredients, loop through them and push the `FormGroup` of `name` and `amount` to the `FormArray`
- Register the `FormArray` to the `FormGroup` object representing the form
- Add a getter `controls` to get the controls registered in the `ingredients` `FormArray`

In `recipe-edit.component.html`

- Add `[formArrayName]="'ingredients'"` to the div containing the whole recipes `FormArray`
- Add `*ngFor` to loop through the ingredient controls
- Add `[formGroupName]="i` to assign the `FormGroup`s to the corresponding index in the `*ngFor`
- Add `[formControlName]="'name'"` to register the controls in the `FormGroup`s

### Lesson 231 - Adding new Ingredient Controls

Goal: Add a button to allow adding new ingredient to the `FormArray`

In `recipe-edit.component.html`

- Add a add button at the end of the array area
  - Bind `onAddIngredient()` method to click event

In `recipe-edit.component.ts`

- Create `onAddIngredient()` method that creates an empty `FormGroup` and pushes it to the `FormArray`

### Lesson 232 - Validating User Input

Goal: Add validation to input fields

In `recipe-edit.component.html`

- Disable the Save button if the form is invalid

In `recipe-edit.component.ts`

- Add necessary validators such as `Validators.required` and `Validators.pattern()`

### Lesson 233 - Submitting the Recipe Edit Form

Goal: Be able to update or save the recipe using the Save button

In `recipe.service.ts`

- Add a `recipesChanged` `Subject` that emits the recipes list when the list is updated
- Add a `addRecipe(recipe)` method that adds a recipe to the recipes list
  - Emit the `recipesChanged` event on method execution
- Add a `updateRecipe(index, recipe)` method that updates a recipe given the index
  - Emit the `recipesChanged` event on method execution

In `recipe-list.component.ts`

- Subscribe to the `recipesChanged` event in ngOnInit and update the display list when the recipes list is updated

In `recipe-edit.component.ts`

- Update the `OnSubmit()` method
  - Create the `Recipe` object base on the form values
  - Call corresponding `RecipeService` methods to update the list base on the mode

### Lesson 234. Adding a Delete and Clear (Cancel) Functionality

Goal: Enable Delete Recipe and Cancel Recipe Edit button, and on save recipe, navigate away.

In `recipe.service.ts`

- Add `deleteRecipe(index)` method that deletes a recipe of index from the recipes list

In `recipe-detail.component.html`

- Add a click listener that calls `onDelete()` to the Delete anchor

In `recipe-detail.component.ts`

- Add a `onDelete()` method that calls `RecipeService.deleteRecipe()`

In `recipe-edit.component.html`

- Add a click listener that calls `onCancel()` to the Cancel button

In `recipe-edit.component.ts`

- Add a `onCancel()` method that navigates to the parent level when the user clicks the Cancel button
- Call the `onCancel()` method in `onSubmit()` after submitting the form to navigate away

### Lesson 235 - Redirecting the User (after Deleting a Recipe)

Goal: Navigate to the parent level after deleting a recipe

In `recipe-detail.component.ts`

- In the `onDelete()` method, navigate to the `/recipes` page after the recipe is deleted

### Lesson 236. Adding an Image Preview

Goal: Add a image preview in the recipe edit component

In `recipe-edit.component.html`

- Add a local reference to the imagePath input
- Use the local reference to get the `src` for the image preview section

### Lesson 237. Providing the Recipe Service Correctly

Goal: Fix the bug where adding a recipe does not correctly show up in the shopping list component.

The issue here is that the `RecipeService` is provided in the `RecipesComponent`, so all the components under `RecipesComponent` share the same instance of `RecipeService`. By navigating away from the `RecipesComponent`, the `RecipesService` instance is destroyed. To fix this, add `RecipeService` as one of the providers in `AppModule`.

### Lesson 238 - Deleting Ingredients and Some Finishing Touches

Goal: Enable the delete ingredient button

In `recipe-edit.component.html`

- Add a click listener that invokes `onDeleteIngredient(i)` when the delete ingredient button is clicked

In `recipe-edit.component.ts`

- Add `onDeleteIngredient(index)` method that deletes the `FormGroup` in the `FormArray` base on the index

### Lesson 239 - Deleting all Items in a FormArray

To delete all items in a `FormArray`

```ts
(<FormArray>this.recipeForm.get('ingredients')).clear();
```
