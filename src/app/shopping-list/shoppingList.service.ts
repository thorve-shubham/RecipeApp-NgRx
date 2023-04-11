import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Chicken",1),
        new Ingredient("Rice",3)
    ];

    updatedIngredients = new Subject<Ingredient[]>();
    selectedingredient = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();
    }
    
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updatedIngredients.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients = [...this.ingredients,...ingredients];
        this.updatedIngredients.next(this.ingredients.slice());
    }

    getIngredientById(index:number) {
        return this.ingredients[index];
    }

    updateIngredient(index:number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.updatedIngredients.next(this.ingredients.slice());
    }

    deleteIngrdient(index: number) {
        this.ingredients.splice(index,1);
        this.updatedIngredients.next(this.ingredients.slice());
    }

}