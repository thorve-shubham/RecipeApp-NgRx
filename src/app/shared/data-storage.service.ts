import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient,
    private recipeService : RecipeService,
    private authService : AuthService) { }

  saveRecipes() {
    this.http.put("https://ng-basic-backend-default-rtdb.firebaseio.com/recipes.json",
    this.recipeService.getRecipes()).subscribe(
      (data)=>{
        console.log(data);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>("https://ng-basic-backend-default-rtdb.firebaseio.com/recipes.json")
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients : recipe.ingredients ? recipe.ingredients : []
        }
      })
    }),
    tap(recipes=>{
      this.recipeService.setRecipes(recipes);
    }));
  }
}
