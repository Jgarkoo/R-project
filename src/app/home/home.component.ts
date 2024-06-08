import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { Blog, categories } from '../model/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  showLogIn: boolean = false;
  successMessage: boolean = false;
  isLoggedIn: boolean = false;
  blogData: Blog[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  
  constructor(private service: BlogService, private router: Router) {} 

  ngOnInit(): void {
    
  }

  get email(){
    return this.loginForm.controls['email']
  } 

  showButton() {
    this.showLogIn = !this.showLogIn;
  }

  logIn() {
    if(!this.loginForm.valid){
      return;
    }

    this.service.logInBlog(this.loginForm.value).subscribe({next: (res) =>{
      if (this.loginForm.value.email === 'gigagiorgadze@redberry.ge' || 'elene.metreveli@redberry.ge' || 'tamogagniashvili@redberry.ge'){ 
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.isLoggedIn = true; 
        }, 120);
      } else {
        console.log("Invalid email");
      }
    }})
   
  }

  navigateToLghmpg() {
    this.router.navigate(['/loged-homepage']);
  }

  fetchBlog(){
    this.service.getBlog().subscribe({next: (res) =>{
      this.blogData = res;
    },
    error: (err) =>{
      console.error('Error fetching blogs:', err);
    }
  })
  }
}
