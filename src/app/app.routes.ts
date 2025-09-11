import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: "app", loadChildren: () => import("./home/home.routes")
} , {
  path: "**", redirectTo: "app"
}];
