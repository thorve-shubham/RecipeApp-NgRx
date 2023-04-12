import { AuthState } from "../auth/store/auth.reducer";
import { ShoppingListState } from "../shopping-list/store/shoppingList.recducer";

export interface AppState {
    shoppingList : ShoppingListState,
    auth: AuthState
}