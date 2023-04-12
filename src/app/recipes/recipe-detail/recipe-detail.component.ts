import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shoppinglist.actions';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  public recipe:Recipe;
  public id:number;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store : Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = Number.parseInt(params.id);
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  addToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
