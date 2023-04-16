import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { ShoppingListState, shoppingListReducer } from "../shopping-list/store/shoppingList.recducer";
import { RecipeState, recipeReducer } from "../recipes/store/recipes.reducer";

export interface AppState {
    shoppingList : ShoppingListState,
    auth: AuthState,
    recipes : RecipeState
}

export const appReducer : ActionReducerMap<AppState> = {
    shoppingList : shoppingListReducer,
    auth : authReducer,
    recipes : recipeReducer
}