import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipeResolver.service";
import { RecipesComponent } from "./recipes.component";

const routes : Routes = [
    { path: "", component: RecipesComponent, canActivate : [AuthGuardService], children : [
        { path: "new", component: RecipeEditComponent },
        { path: ":id", component: RecipeDetailComponent, resolve : [RecipeResolverService]},
        { path: "", component: RecipeStartComponent, pathMatch: "full", resolve : [RecipeResolverService] },
        { path: ":id/edit", component: RecipeEditComponent, resolve : [RecipeResolverService]}
    ] }
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class RecipeRoutingModule {

}