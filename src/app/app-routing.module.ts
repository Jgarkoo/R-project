import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { LogedinComponent } from './logedin/logedin.component';
import { ErrorComponent } from './error/error.component';
import { AddBlogComponent } from './add-blog/add-blog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    title: 'home page',
    component: HomeComponent,
  },
  {
    path: 'blog/:id',
    title: 'detail',
    component: BlogComponent
  },
  {
    path: 'loged-homepage',
    title: 'Home Page',
    component: LogedinComponent  
  },
  {
    path: 'addblog',
    title: 'adding Blog',
    component: AddBlogComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

