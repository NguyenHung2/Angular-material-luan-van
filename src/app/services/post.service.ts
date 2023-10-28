import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Post {
  maBaiViet: number;
  tieuDe: string;
  loaiBaiViet: string;
  tomTat: string;
  noiDung: string;
  hinhAnh: string;
  ngayDang: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [
    {
      maBaiViet: 1,
      tieuDe: 'Núi Cấm - Hành trình đến đỉnh cao tại Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Cấm là một trong những ngọn núi đáng chinh phục nhất tại Thất Sơn, An Giang, với vẻ đẹp hoang sơ và thử thách đầy hấp dẫn.',
      noiDung: 'Núi Cấm là một trong những ngọn núi đáng chinh phục tại Thất Sơn, tỉnh An Giang, với đỉnh cao và khung cảnh hoang sơ đầy ấn tượng. Điều hấp dẫn ở Núi Cấm không chỉ nằm ở vẻ đẹp tự nhiên mà còn ở trải nghiệm thách thức cho những người yêu thích leo núi và du lịch mạo hiểm. Hành trình đến đỉnh Núi Cấm không chỉ đưa bạn đến gần thiên nhiên mà còn đến những thử thách đầy phấn khích. Hãy chuẩn bị cho một cuộc phiêu lưu đáng nhớ tại Núi Cấm!',
      hinhAnh: 'assets/nui-cam.jpg',
      ngayDang: new Date('2023-10-20')

    },
    {
      maBaiViet: 2,
      tieuDe: 'Núi Ông Két - Hành trình đến ngọn núi huyền bí của Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Ông Két là một trong bảy ngọn núi tại Thất Sơn, An Giang, với những câu chuyện huyền bí và quan điểm độc đáo từ đỉnh núi.',
      noiDung: 'Núi Ông Két là một trong bảy ngọn núi tại Thất Sơn, tỉnh An Giang, và nó nổi tiếng với những câu chuyện huyền bí và quan điểm độc đáo từ đỉnh núi. Đây là một địa điểm thu hút nhiều hành khách và du khách đến tham quan để khám phá các câu chuyện về núi này. Không chỉ có câu chuyện, bạn còn có cơ hội tận hưởng cảnh quan thiên nhiên độc đáo và quan điểm tuyệt đẹp từ đỉnh Núi Ông Két. Hãy lên đường và tìm hiểu thêm về vùng đất huyền bí này.',
      hinhAnh: 'assets/nui-ket-an-giang.jpg',
      ngayDang: new Date('2023-10-20')

    },
    {
      maBaiViet: 3,
      tieuDe: 'Núi Cô Tô - Bí ẩn của Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Cô Tô là một trong bảy ngọn núi tại Thất Sơn, An Giang, với những câu chuyện bí ẩn và quan điểm độc đáo từ đỉnh núi.',
      noiDung: 'Núi Cô Tô là một trong bảy ngọn núi tại Thất Sơn, tỉnh An Giang, và nó nổi tiếng với những câu chuyện bí ẩn và quan điểm độc đáo từ đỉnh núi. Đây là một địa điểm thu hút nhiều hành khách và du khách đến tham quan để khám phá các câu chuyện về núi này. Không chỉ có câu chuyện, bạn còn có cơ hội tận hưởng cảnh quan thiên nhiên độc đáo và quan điểm tuyệt đẹp từ đỉnh Núi Cô Tô. Hãy lên đường và tìm hiểu thêm về vùng đất bí ẩn này.',
      hinhAnh: 'assets/nui-co-to.jpg',
      ngayDang: new Date('2023-10-20')
    },
    {
      maBaiViet: 4,
      tieuDe: 'Núi Tượng - Lễ hội và cảnh quan tại Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Tượng nổi tiếng với lễ hội và vẻ đẹp tự nhiên độc đáo, tạo nên một điểm đến thú vị tại Thất Sơn, An Giang.',
      noiDung: 'Núi Tượng là một trong bảy ngọn núi tại Thất Sơn, tỉnh An Giang, và nó nổi tiếng với lễ hội và vẻ đẹp tự nhiên độc đáo. Đây là một điểm đến thú vị tại Thất Sơn, thu hút nhiều du khách đến tham quan. Lễ hội tại Núi Tượng là một cơ hội để trải nghiệm văn hóa và truyền thống độc đáo của vùng này. Bên cạnh đó, bạn còn có cơ hội chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp và tham gia vào các hoạt động giải trí tại đây. Hãy khám phá Núi Tượng và cảm nhận sự độc đáo của nơi này.',
      hinhAnh: 'assets/nui-tuong.jpg',
      ngayDang: new Date('2023-10-20')
    },
    {
      maBaiViet: 5,
      tieuDe: 'Núi Dài - Khám phá vẻ đẹp tự nhiên và lịch sử tại Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Dài là một trong những ngọn núi đáng khám phá nhất tại Thất Sơn, tỉnh An Giang, với vẻ đẹp tự nhiên và di sản lịch sử độc đáo.',
      noiDung: 'Núi Dài nằm ở khu vực Thất Sơn, tỉnh An Giang, và nó là một trong những ngọn núi đáng khám phá nhất trong bảy ngọn núi của Thất Sơn. Núi Dài không chỉ nổi tiếng với vẻ đẹp tự nhiên độc đáo mà còn với di sản lịch sử quan trọng. Bạn có cơ hội tham quan và tìm hiểu thêm về lịch sử và văn hóa của địa điểm này, cùng với việc chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp từ đỉnh núi. Hãy sẵn sàng khám phá Núi Dài và khám phá sự đa dạng của vùng đất này.',
      hinhAnh: 'assets/nui-dai.jpg',
      ngayDang: new Date('2023-10-20')
    },
    {
      maBaiViet: 6,
      tieuDe: 'Núi Dài 5 Giếng - Khám phá vùng đất huyền bí tại Thất Sơn, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Dài 5 Giếng là một điểm đến huyền bí tại Thất Sơn, tỉnh An Giang, với câu chuyện đầy thú vị và vẻ đẹp thiên nhiên độc đáo.',
      noiDung: 'Núi Dài 5 Giếng là một điểm đến huyền bí tại Thất Sơn, tỉnh An Giang, và nó nổi tiếng với câu chuyện đầy thú vị và vẻ đẹp thiên nhiên độc đáo. Đây là một địa điểm thu hút nhiều du khách đến tham quan để khám phá những câu chuyện huyền bí và tận hưởng cảnh quan thiên nhiên tuyệt đẹp từ đỉnh núi. Núi Dài 5 Giếng là một điểm đến độc đáo đối với những người yêu thích phiêu lưu và khám phá. Hãy sẵn sàng trải nghiệm những điều thú vị tại nơi này.',
      hinhAnh: 'assets/nui-dai-5-gieng.jpg',
      ngayDang: new Date('2023-10-20')
    },
    {
      maBaiViet: 7,
      tieuDe: 'Núi Nước - Kỳ quan thiên nhiên vùng Đất Mũi, An Giang',
      loaiBaiViet: 'Giới thiệu',
      tomTat: 'Núi Nước là một trong những kỳ quan thiên nhiên độc đáo tại vùng Đất Mũi, tỉnh An Giang, với cảnh quan thiên nhiên và động thực vật đa dạng.',
      noiDung: 'Núi Nước nằm ở vùng Đất Mũi, tỉnh An Giang, và nó là một trong những kỳ quan thiên nhiên độc đáo tại địa phương này. Núi Nước nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp và sự đa dạng về động thực vật. Đây là một điểm đến thu hút nhiều du khách đến tham quan và tận hưởng vẻ đẹp tự nhiên của vùng Đất Mũi. Hãy dành thời gian để khám phá Núi Nước và chiêm ngưỡng những kỳ quan thiên nhiên độc đáo tại đây.',
      hinhAnh: 'assets/nui-nuoc.jpg',
      ngayDang: new Date('2023-10-20')
    },
  ];

  get(): Observable<Post[]> {
    return of(this.posts);
  }
  // private apiUrl = 'http://localhost:8080/api/posts'; 

  // constructor(private http: HttpClient) {}

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.apiUrl);
  // }

  // addPost(post: Post): Observable<Post> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   return this.http.post<Post>(this.apiUrl, post, httpOptions);
  // }

  // updatePost(post: Post): Observable<Post> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   return this.http.put<Post>(`${this.apiUrl}/${post.maBaiViet}`, post, httpOptions);
  // }

  // deletePost(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
