import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: Recipe[];

  subscription: Subscription;

  constructor(private recipeService : RecipeService) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.updatedRecipes.subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

}
