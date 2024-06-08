import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { LogedinComponent } from './logedin/logedin.component';
import { ErrorComponent } from './error/error.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ConvertImgPipe } from './convert-img.pipe';

@NgModule({
  declarations: [AppComponent, HomeComponent, BlogComponent, LogedinComponent, ErrorComponent, AddBlogComponent, ConvertImgPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterLink
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
