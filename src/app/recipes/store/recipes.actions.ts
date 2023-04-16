import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "SET_RECIPES";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const SAVE_RECIPES = "SAVE_RECIPES";


export class SetRecipes implements Action {
    readonly type: string = SET_RECIPES;
    constructor(public payload : Recipe[]) {}
}

export class FetchRecipes implements Action {
    readonly type :string =FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type: string = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action  {
    readonly type : string = UPDATE_RECIPE;
    constructor(public payload : {index : number, newRecipe : Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type : string = DELETE_RECIPE;
    constructor(public payload : number) {}
}

export class SaveRecipes implements Action {
    readonly type: string = SAVE_RECIPES;
}

export type RecipeAction = SetRecipes | FetchRecipes;