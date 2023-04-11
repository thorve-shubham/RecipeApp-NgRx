import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard";
import { ShoppingListComponent } from "./shopping-list.component";

const routes : Routes = [
  { path: "", component: ShoppingListComponent , canActivate: [AuthGuardService]},
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class ShoppingListRoutingModule {}