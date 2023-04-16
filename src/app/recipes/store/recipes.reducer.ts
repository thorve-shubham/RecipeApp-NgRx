import { Recipe } from "../recipe.model";
import { ADD_RECIPE, AddRecipe, DELETE_RECIPE, DeleteRecipe, RecipeAction, SET_RECIPES, SetRecipes, UPDATE_RECIPE, UpdateRecipe } from "./recipes.actions";

export interface RecipeState {
    recipes : Recipe[]
}

const initialState : RecipeState = {
    recipes : []
}

export function recipeReducer(state : RecipeState =initialState, action : RecipeAction) {
    switch(action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes : [...(action as SetRecipes).payload]
            }
        case ADD_RECIPE:
            return {
                ...state,
                recipes : [...state.recipes, (action as AddRecipe).payload ]
            }
        case UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[(action as UpdateRecipe).payload.index],
                ...(action as UpdateRecipe).payload.newRecipe
            };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[(action as UpdateRecipe).payload.index] = updatedRecipe;
            return {
                ...state,
                recipes : updatedRecipes
            }
        case DELETE_RECIPE:
            return {
                ...state,
                recipes : state.recipes.filter((recipe,index)=>{
                    return index !== (action as DeleteRecipe).payload
                })
            }
        default:
            return state;
    }
}