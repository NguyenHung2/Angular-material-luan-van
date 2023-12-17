import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  postId: number | null = null;
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    // Get the value of the 'maBaiViet' parameter from the route
    const maBaiVietParam = this.route.snapshot.paramMap.get('maBaiViet');

    // Convert the string parameter to a number
    if (maBaiVietParam) {
      this.postId = +maBaiVietParam;  // or parseInt(maBaiVietParam, 10);
      
      // Use the postId to fetch the post information from the service
      this.postService.getPostById(this.postId).subscribe(post => {
        this.post = post;
      });
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
