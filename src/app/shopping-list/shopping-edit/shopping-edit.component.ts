import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { Store } from '@ngrx/store';
import { AddIngredient, DeleteIngredient, IngredientStopEdit, UpdateIngredient } from '../store/shoppinglist.actions';
import { ShoppingListAppState } from '../store/shoppingList.recducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  subscription: Subscription;
  subscription1: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f')
  shoppingEditForm: NgForm;


  constructor(private shoppingListService: ShoppingListService, private store : Store<ShoppingListAppState>) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new IngredientStopEdit());
    console.log("unsubscribed");
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData=>{
        if(stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.editedItemIndex = stateData.editedIngredientIndex;
          this.editedItem = stateData.editedIngredient;
          this.shoppingEditForm.setValue({
            name : this.editedItem.name,
            amount : this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(!this.editMode)
      this.store.dispatch(new AddIngredient(newIngredient));
    else
      this.store.dispatch(new UpdateIngredient(newIngredient));
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onClear() {
    this.shoppingEditForm.reset();
    this.store.dispatch(new IngredientStopEdit());
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

}
