import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: "app", loadChildren: () => import("./home/home.routes")
  } , {
    path: "**", redirectTo: "app"
  }
];
