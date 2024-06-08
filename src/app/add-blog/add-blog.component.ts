import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BlogService } from '../service/blog.service';
import { Blog, categories } from '../model/blog';

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
  potoIsUp: boolean = false;

  categoriesList: any[] = [];
  successMessage: boolean = false;

  constructor(private service: BlogService){}

  ngOnInit(): void {
    this.getCategory();
  }

  addBlog(){
    if(!this.addBlogForm.valid){
      return;
    }

    const request : any = this.addBlogForm.value;
    request.image = this.image || '';

    this.service.createNewBlog(request).subscribe({next: (res) =>{
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
    this.service.getCategories().subscribe({ next: (res: any) => {
        this.categoriesList = res.data;
        
      },
      error: (err) => {
        console.error( err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file.name;
      this.potoIsUp = true;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = btoa(reader.result as string);
      this.image = base64String;
    };
    reader.readAsArrayBuffer(file);
  }

  cancelFile() {
    this.image = null;
    this.potoIsUp = false;
    (document.getElementById('uploadBtn') as HTMLInputElement).value = '';
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
