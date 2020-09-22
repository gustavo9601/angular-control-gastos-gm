import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './components/category/category.component';
import {ResumeComponent} from './componentes/resume/resume.component';
import {GraphicsComponent} from './componentes/graphics/graphics.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'graphics', component: GraphicsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'resume'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
