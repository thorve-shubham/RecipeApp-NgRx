import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FETCH_RECIPES, SAVE_RECIPES, SetRecipes } from "./recipes.actions";
import { map, switchMap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { AppState } from "src/app/state/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipesEffect {
    constructor(private actions$ : Actions,private http: HttpClient, private store : Store<AppState>) {}

    fetchRecipes$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(FETCH_RECIPES),
            switchMap(()=>{
                return this.http.get<Recipe[]>("https://ng-basic-backend-default-rtdb.firebaseio.com/recipes.json")
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            map(recipes=>{
                return new SetRecipes(recipes);
            })
        );
    });

    saveRecipes$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(SAVE_RECIPES),
            withLatestFrom(this.store.select("recipes")),
            switchMap(([actionData,recipeState])=>{
                return this.http.put("https://ng-basic-backend-default-rtdb.firebaseio.com/recipes.json", recipeState.recipes)
            })
        );
    },
    {dispatch : false})
}