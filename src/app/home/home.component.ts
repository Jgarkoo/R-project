import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

  blogData: any[] = [];
  filteredBlogData: any[] = [];
  selectedCategories: Set<string> = new Set();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  
  constructor(private blogService: BlogService, private router: Router, private cdr: ChangeDetectorRef) {} 

  ngOnInit(): void {
    this.fetchBlog();
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

    this.blogService.logInBlog(this.loginForm.value).subscribe({next: (res) =>{
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

  filterBlogs(): void {
    if (this.selectedCategories.size > 0) {
      this.filteredBlogData = this.blogData.filter(blog =>
        Array.from(this.selectedCategories).every(category =>
          blog.categories.some((cat: any) => cat.title === category)
        )
      );
    } else {
      this.filteredBlogData = this.blogData;
    }
    this.cdr.detectChanges();
  }

  filterByCategory(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.filterBlogs();
  }

  navigateToLghmpg() {
    this.router.navigate(['/loged-homepage']);
  }

  fetchBlog(){
    this.blogService.getBlog().subscribe({next: (res: any) =>{
      this.blogData = res.data;
      this.filteredBlogData = res.data; 
      this.filterBlogs();
    },
    error: (err) =>{
      console.error(err);
    }
  })
  }
}
