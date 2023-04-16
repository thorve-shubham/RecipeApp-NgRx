import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of, switchMap, take } from "rxjs";
import { Recipe } from "./recipe.model";
import { AppState } from "../state/app.reducer";
import { Store } from "@ngrx/store";
import { FetchRecipes, SET_RECIPES } from "./store/recipes.actions";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({
    providedIn : 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private actions$: Actions,
        private store : Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        console.log("in resolveer");
        return this.store.select("recipes").pipe(
            map(recipeState=>{
                return recipeState.recipes;
            }),
            switchMap(recipes=>{
                if(recipes.length == 0){
                    this.store.dispatch(new FetchRecipes());
                    return this.actions$.pipe(ofType(SET_RECIPES),take(1));
                } else {
                    return of(recipes);
                }
            })
        );
    }
    
}