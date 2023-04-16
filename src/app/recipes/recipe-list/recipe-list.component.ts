import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/state/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: Recipe[];

  subscription: Subscription;

  constructor(private store: Store<AppState>) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select("recipes").pipe(
      map(recipeState => recipeState.recipes)).subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes;
      }
    )
  }

}
