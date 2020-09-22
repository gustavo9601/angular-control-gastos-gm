import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './components/category/category.component';
import {ResumeComponent} from './components/resume/resume.component';
import {GraphicsComponent} from './components/graphics/graphics.component';
import {LoginComponent} from './components/login/login.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'resume', component: ResumeComponent, canActivate: [AuthGuard]},
  {path: 'graphics', component: GraphicsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'resume'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
