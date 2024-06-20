import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Blog, categories } from '../model/blog';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-logedin',
  templateUrl: './logedin.component.html',
  styleUrls: ['./logedin.component.scss']
})
export class LogedinComponent implements OnInit{

  blogData: any[] = [];
  filteredBlogData: any[] = [];
  selectedCategories: Set<string> = new Set();

  constructor(private blogService: BlogService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBlog();
  }
  loadBlog(): void {
    this.blogService.getBlog().subscribe({ next: (res: any) => {
        this.blogData = res.data;
        this.filteredBlogData = res.data; 
      },
      error: (err) => {
        console.error(err);
      }
    });
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
}