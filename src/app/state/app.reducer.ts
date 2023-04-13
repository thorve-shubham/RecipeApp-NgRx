import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { ShoppingListState, shoppingListReducer } from "../shopping-list/store/shoppingList.recducer";

export interface AppState {
    shoppingList : ShoppingListState,
    auth: AuthState
}

export const appReducer : ActionReducerMap<AppState> = {
    shoppingList : shoppingListReducer,
    auth : authReducer
}