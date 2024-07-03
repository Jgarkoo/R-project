import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { Blog, categories } from '../model/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  id: any 
  blogs: any[] = [];
  blog: any = {};
  source: string = '';
  relatedBlogs: any[] = [];
  
  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService) {
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }

  ngOnInit(): void {
    this.catchSingleBlog();
    this.source = this.route.snapshot.queryParamMap.get('source') || 'home';
  }

  catchSingleBlog(){
    this.blogService.getSingleBlog(this.id).subscribe({next: (res: any) =>{
      this.blog = res;
      this.catchSameBlog();
    },
    error: (error) =>{
      console.log(error);
    }
  })
}

  catchSameBlog(){
    this.blogService.getBlog().subscribe({next: (res: any) =>{
      this.blogs = res.data;
      this.filterRelatedBlog();
    },
    error: (err) =>{
      console.log(err);
    
    }
  })
}

  filterRelatedBlog(){
    const categoryIds = this.blog.categories.map((category: any) => category.id);
    this.relatedBlogs = this.blogs.filter((blog: any) => {
      return blog.categories.some((category: any) => categoryIds.includes(category.id));
    });
}

  goBack() {
    if (this.source === 'loged-homepage') {
      this.router.navigate(['/loged-homepage']);
    } else {
      this.router.navigate(['/home']);
    } 
  }
}
