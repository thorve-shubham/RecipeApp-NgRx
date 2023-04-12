import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { Store } from '@ngrx/store';
import { IngredientStartEdit } from './store/shoppinglist.actions';
import { AppState } from '../state/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients : Ingredient[]}>;
  subscription: Subscription;

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    // this.shoppingListService.selectedingredient.next(index);
    this.store.dispatch(new IngredientStartEdit(index));
  }

}
