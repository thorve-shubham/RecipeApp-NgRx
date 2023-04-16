import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { UpdateIngredient } from 'src/app/shopping-list/store/shoppinglist.actions';
import { AddRecipe, UpdateRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  public id:number;
  public editMode:boolean = false;
  storeSub : Subscription;

  RecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
    private router: Router) { }
  
  
  ngOnDestroy(): void {
    if(this.storeSub)
      this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
          this.id = Number.parseInt(params['id']);
          this.editMode = params['id'] != null;
          this.initForm();
      }
    )
  }

  initForm() {
    let recipeName = "";
    let recipeDescription = "";
    let recipeImagePath = "";
    let recipIngredients = new FormArray([]);
    
    if(this.editMode){
      // let recipe = this.recipeService.getRecipeById(this.id);
      this.storeSub = this.store.select("recipes").pipe(
        map(recipeState=>{
          return recipeState.recipes.find((recipe,index)=>{
            return index === this.id;
          })
        })
      ).subscribe(recipe=>{
        recipeName = recipe.name;
        recipeDescription = recipe.description;
        recipeImagePath = recipe.imagePath;
        if(recipe.ingredients) {
          for (let ingredient of recipe.ingredients){
            recipIngredients.push(
              new FormGroup({
                "name" : new FormControl(ingredient.name,Validators.required),
                "amount" : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      
        this.RecipeForm = new FormGroup({
          "name" : new FormControl(recipeName,Validators.required),
          "description" : new FormControl(recipeDescription, Validators.required),
          "imagePath" : new FormControl(recipeImagePath, Validators.required),
          "ingredients" : recipIngredients
        });
      });
    }
    this.RecipeForm = new FormGroup({
      "name" : new FormControl(recipeName,Validators.required),
      "description" : new FormControl(recipeDescription, Validators.required),
      "imagePath" : new FormControl(recipeImagePath, Validators.required),
      "ingredients" : recipIngredients
    });
  }

  onSubmit() {
    console.log(this.RecipeForm);
    let recipe = new Recipe(this.RecipeForm.value['name'],this.RecipeForm.value['description'], this.RecipeForm.value['imagePath'], this.RecipeForm.value['ingredients']);
    if(this.editMode)
      // this.recipeService.updateRecipe(this.id,this.RecipeForm.value);
      this.store.dispatch(new UpdateRecipe({index : this.id, newRecipe: this.RecipeForm.value}));
    else 
      // this.recipeService.addRecipe(recipe);
      this.store.dispatch(new AddRecipe(this.RecipeForm.value));
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  getIngrdientControls() {
    return (<FormArray>this.RecipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.RecipeForm.get('ingredients')).push(
      new FormGroup({
        "name" : new FormControl(null, Validators.required),
        "amount" : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.RecipeForm.get('ingredients')).removeAt(index);
  }
}
