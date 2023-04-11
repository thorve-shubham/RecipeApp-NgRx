import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: 'full' },
  { path : "recipes", loadChildren : ()=> import("./recipes/recipes.module").then(m=>m.RecipeModule)},
  { path : "auth", loadChildren : ()=> import("./auth/auth.module").then(m=>m.AuthModule)},
  { path : "shoppingList", loadChildren : ()=> import("./shopping-list/shoppingList.module").then(m=>m.ShoppinListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
