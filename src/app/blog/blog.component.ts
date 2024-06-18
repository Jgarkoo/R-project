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
  id: string = '';
  category: any[] = [];
  blog: any = {};
  source: string = '';
  
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
    },
    error: (error) =>{
      console.log(error);
    }
  })
}
  
goBack() {
  if (this.source === 'loged-homepage') {
    this.router.navigate(['/loged-homepage']);
  } else {
    this.router.navigate(['/home']);
  }
}
}
