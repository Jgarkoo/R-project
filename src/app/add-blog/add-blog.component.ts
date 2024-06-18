import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BlogService } from '../service/blog.service';
import { Blog, categories } from '../model/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  addBlogForm = new FormGroup ({
    author: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern(/^[ა-ჰ]+ [ა-ჰ]+$/)]),
    title: new FormControl('',[Validators.required, Validators.minLength(2)]),
    description: new FormControl('',[Validators.required, Validators.minLength(2)]),
    categories: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/)]),
    publish_date: new FormControl('',[Validators.required])  
  })

  image:string | null = null;
  imgName: string | null = null;
  potoIsUp: boolean = false;
  file: any

  categoriesList: any[] = [];
  successMessage: boolean = false;

  constructor(private blogService: BlogService, private router: Router){}

  ngOnInit(): void {
    this.getCategory();
  }

  addBlog(){
    if(!this.addBlogForm.valid){
      return;
    }
    
    const fd = new FormData();
    fd.append('author', `${this.addBlogForm.get('author')!.value}`)
    fd.append('title', `${this.addBlogForm.get('title')!.value}`)
    fd.append('description', `${this.addBlogForm.get('description')!.value}`)
    fd.append('categories', JSON.stringify(this.addBlogForm.get('categories')!.value))
    fd.append('publish_date', `${this.addBlogForm.get('publish_date')!.value}`)
    fd.append('email',`${this.addBlogForm.get('email')!.value}`)

    if (this.file) {
      fd.append('image', this.file);
      console.log(this.file);
    }

    this.blogService.createNewBlog(fd).subscribe({next: (res) =>{
      this.addBlogForm.reset();
      this.image = null;
      this.successMessage = true;
      setTimeout(() =>{
        this.successMessage = false;
      }, 3000);
    },
    error: (err) =>{
      console.log(err);
      
    }
  })
  }

  getCategory() {
    this.blogService.getCategories().subscribe({ next: (res: any) => {
        this.categoriesList = res.data;
        
      },
      error: (err) => {
        console.error( err);
      }
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.imgName = this.file.name;
      this.potoIsUp = true;
    }
    const reader = new FileReader();
    reader.onload = (res) => {
      if(res.target){
        this.image = res.target.result as string;
      }
      
    };
    reader.readAsArrayBuffer(this.file);
  }

  cancelFile() {
    this.image = null;
    this.potoIsUp = false;
    (document.getElementById('uploadBtn') as HTMLInputElement).value = '';
  }

  hideButton() {
    this.successMessage = !this.successMessage;
  }

  navigateToLghmpg() {
    this.router.navigate(['/loged-homepage']);
  }

  get author(){
    return this.addBlogForm.controls['author']
  } 

  get title(){
    return this.addBlogForm.controls['title']
  } 

  get desc(){
    return this.addBlogForm.controls['description']
  } 

  get date(){
    return this.addBlogForm.controls['publish_date']
  }

  get email(){
    return this.addBlogForm.controls['email']
  } 
  
} 
