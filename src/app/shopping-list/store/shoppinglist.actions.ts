import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/Ingredient.model";

export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const INGREDIENT_START_EDIT = "INGREDIENT_START_EDIT";
export const INGREDIENT_STOP_EDIT = "INGREDIENT_STOP_EDIT";

export class IngredientStartEdit implements Action {
    readonly type: string = INGREDIENT_START_EDIT;
    constructor(public payload:number) {}
}

export class IngredientStopEdit implements Action {
    readonly type: string = INGREDIENT_STOP_EDIT;
}

export class AddIngredient implements Action {
    readonly type : string = ADD_INGREDIENT;
    constructor(public payload : Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload : Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload : Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
}

export type ShoppingListAction = AddIngredient | AddIngredients | DeleteIngredient | UpdateIngredient | IngredientStartEdit | IngredientStopEdit;