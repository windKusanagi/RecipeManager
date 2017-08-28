import { Recipe } from './../recipes/recipe.model';
import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipe: RecipeService, private auth: AuthService) { }

  storeRecipes() {
    const token = this.auth.getToken();
    return this.http.put('https://ng4-backend.firebaseio.com/recipes.json?auth=' + token , this.recipe.getRecipes());
  }

  getRecipes() {
    const token = this.auth.getToken();
    this.http.get('https://ng4-backend.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          // tslint:disable-next-line:prefer-const
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          console.log(recipes);
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          // const recipes: Recipe[] = response.json();
          this.recipe.setRecipes(recipes);
        }
      );
  }
}
