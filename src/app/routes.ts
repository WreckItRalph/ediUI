
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ValidatorComponent } from './validator/validator.component';
export const routes: Routes= [
    { path:'', pathMatch:'full', redirectTo:'home'},
    { path:"home", component:MainComponent},
    { path:'validator', component:ValidatorComponent}
];

