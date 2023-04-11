import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public id:number;
  public editMode:boolean = false;

  RecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

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
      let recipe = this.recipeService.getRecipeById(this.id)
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
      this.recipeService.updateRecipe(this.id,this.RecipeForm.value);
    else 
      this.recipeService.addRecipe(recipe);
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
