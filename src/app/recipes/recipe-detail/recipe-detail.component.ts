import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shoppinglist.actions';
import { AppState } from 'src/app/state/app.reducer';
import { map, switchMap } from 'rxjs';
import { DeleteRecipe } from '../store/recipes.actions';

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
    private route: ActivatedRoute,
    private store : Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id=>{
        this.id = id;
        return this.store.select("recipes");
      }),
      map(recipeState=>{
        return recipeState.recipes.find((recipe,index)=>{
          return index === this.id;
        })
      })
    ).subscribe(recipe=>{
      this.recipe = recipe
    })
  }

  addToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    // this.recipeService.deletRecipe(this.id);
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
