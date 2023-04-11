import { CommonModule, FormStyle } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { appDropdownDirective } from "./dropDown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations : [
        PlaceHolderDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        appDropdownDirective
    ],
    imports : [CommonModule,FormsModule],
    exports : [
        PlaceHolderDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        appDropdownDirective,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule {

}