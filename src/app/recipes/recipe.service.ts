import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    constructor() {}

    selectedRecipe = new Subject<Recipe>();
    updatedRecipes = new Subject<Recipe[]>();

    private recipes : Recipe[] = [];

    setRecipes(recipes) {
        this.recipes = recipes;
        this.updatedRecipes.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.updatedRecipes.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe) {
        this.recipes[index] = recipe;
        this.updatedRecipes.next(this.recipes.slice());
    }

    deletRecipe(index:number) {
        this.recipes.splice(index,1);
        this.updatedRecipes.next(this.recipes.slice());
    }

}