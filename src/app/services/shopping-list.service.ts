import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  // @Output() ingredientSChanged = new EventEmitter<Ingredient[]> ();
  // ingredientSChanged = new EventEmitter<Ingredient[]> ();
  ingredientSChanged = new Subject<Ingredient[]> ();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (this.findExistingIngredient(ingredient.name)) {
      const index = Number(this.findExistingIngredient(ingredient.name));
      this.ingredients[index].amount += ingredient.amount;
    }else {
      this.ingredients.push(ingredient);
      this.ingredientSChanged.next(this.ingredients.slice());
    }
  }

  findExistingIngredient( ingredientName: string): string {
    for ( const index in this.ingredients ) {
      if ( this.ingredients[index].name === ingredientName ) {
        return index;
      }
    }
    return null;
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients){
      // console.log(this.findExistingIngredient(ingredient.name))
      if (this.findExistingIngredient(ingredient.name)) {
        const index = Number(this.findExistingIngredient(ingredient.name));
        this.ingredients[index].amount += ingredient.amount;
      }else {
        this.ingredients.push(...ingredients);
      }
    }
    // this.ingredients.push(...ingredients);
    this.ingredientSChanged.next(this.ingredients.slice());
  }

  ObserveShoppingList() {
    return this.ingredients.slice();
  }

  updateIngredient(index: number , newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientSChanged.next(this.ingredients.slice());
  }

  deleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientSChanged.next(this.ingredients.slice());
  }

}
