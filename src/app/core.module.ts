import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthinterceptorService } from "./auth/auth.interceptor";
import { RecipeService } from "./recipes/recipe.service";

@NgModule({
    providers: [ RecipeService, {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthinterceptorService,
        multi : true
    }]
})
export class CoreModule {}