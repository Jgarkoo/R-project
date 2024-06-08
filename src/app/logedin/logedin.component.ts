import { Component, OnInit } from '@angular/core';
import { Blog, categories } from '../model/blog';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-logedin',
  templateUrl: './logedin.component.html',
  styleUrls: ['./logedin.component.scss']
})
export class LogedinComponent implements OnInit{
  
  blogData: any[] = [];
  constructor(private service: BlogService){}

  ngOnInit(): void {
    this.service.getBlog().subscribe((data) =>{
      this.blogData = data;
    })
  }

}
