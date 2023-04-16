import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    constructor() {}
    selectedRecipe = new Subject<Recipe>();
}