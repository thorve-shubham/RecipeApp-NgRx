import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/Ingredient.model";
import { ADD_INGREDIENT, ADD_INGREDIENTS, AddIngredient, AddIngredients, DELETE_INGREDIENT, INGREDIENT_START_EDIT, INGREDIENT_STOP_EDIT, IngredientStartEdit, ShoppingListAction, UPDATE_INGREDIENT, UpdateIngredient } from "./shoppinglist.actions";

export interface ShoppingListState {
    ingredients : Ingredient[];
    editedIngredient : Ingredient;
    editedIngredientIndex : number;
}

export interface ShoppingListAppState {
    shoppingList : ShoppingListState
}

const initialState : ShoppingListState = {
    ingredients: [
        new Ingredient("Chicken", 1),
        new Ingredient("Rice", 3)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state : ShoppingListState=initialState,action: ShoppingListAction) {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients : [...state.ingredients,(action as AddIngredient).payload]
            }
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : [ ...state.ingredients, ...(action as AddIngredients).payload]
            }
        case UPDATE_INGREDIENT:
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = <Ingredient>(action as UpdateIngredient).payload;
            return {
                ...state,
                ingredients : updatedIngredients,
                editedIngredient : null,
                editedIngredientIndex : -1
            }
        case DELETE_INGREDIENT:
            const updatedIngredients1 = [...state.ingredients];
            updatedIngredients1.splice(state.editedIngredientIndex,1);
            return {
                ...state,
                ingredients : updatedIngredients1,
                editedIngredient : null,
                editedIngredientIndex : -1
            }
        case INGREDIENT_START_EDIT:
            return {
                ...state,
                editedIngredient : state.ingredients[<number>(action as IngredientStartEdit).payload],
                editedIngredientIndex : <number>(action as IngredientStartEdit).payload
            }
        case INGREDIENT_STOP_EDIT:
            return {
                ...state,
                editedIngredient : null,
                editedIngredientIndex : -1
            }
        default : 
            console.log("in action",state);
            return state;
    }
}