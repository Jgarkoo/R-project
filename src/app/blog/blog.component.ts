import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { Blog, categories } from '../model/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  id: string = '';
  blog: any = {};
  constructor(private route: ActivatedRoute, private service: BlogService) {
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }

  ngOnInit(): void {
  //   this.service.getSingleBlog(this.id).subscribe((res) =>{
  //     this.blog = res;
  //   },
  //   (error) =>{
  //     console.log(error);
      
  //   }
  // )
  this.service.getSingleBlog(this.id).subscribe({next: (res: Blog[]) =>{
    this.blog = res;
  },
  error: (error) =>{
    console.log(error);
  }
})
  }
}
