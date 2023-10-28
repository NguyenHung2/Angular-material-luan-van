import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Destination {
  maDiemDen: number;
  TenDiemDen: string;
  moTa: string;
  hinhAnh: string;
  diaChi: string;
  maDanhMuc: number; // Use category ID here
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private destinations: Destination[] = [
    {
      maDiemDen: 1,
      TenDiemDen: 'Núi Cấm',
      moTa: 'là một ngọn núi nổi tiếng với cảnh quan thiên nhiên đẹp và giá trị tâm linh. Núi này là một địa điểm quan trọng cho các hoạt động tôn nghiêm và tâm linh.',
      hinhAnh: 'assets/nui-cam.jpg',
      diaChi: 'Xã An Hảo, Huyện Tịnh Biên, Tỉnh An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },
    {
      maDiemDen: 2,
      TenDiemDen: 'Núi Ông Kết',
      moTa: 'nổi tiếng với cảnh quan đá thạch anh tự nhiên và hình thù độc đáo. Đây là một địa điểm quan trọng cho các hoạt động tâm linh và tôn nghiêm trong khu vực.',
      hinhAnh: 'assets/nui-ket-an-giang.jpg',
      diaChi: 'Thị trấn Nhà Bàng, huyện Tịnh Biên, An Giang',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },    
    {
      maDiemDen: 3,
      TenDiemDen: 'Núi Cô Tô',
      moTa: 'Là một điểm tâm linh và tham quan nổi tiếng với cảnh quan đẹp và giá trị tâm linh. Đây là nơi mà người dân và du khách đến để tham quan, tìm kiếm bình yên và kết nối với tâm linh.',
      hinhAnh: 'assets/nui-co-to.jpg',
      diaChi: 'Xã Cô Tô, huyện Tri Tôn, An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },  
    {
      maDiemDen: 4,
      TenDiemDen: 'Núi Tượng',
      moTa: 'là một ngọn núi nổi tiếng với cảnh quan thiên nhiên tươi đẹp và giá trị tâm linh. Đỉnh cao nhất của núi, Đỉnh Tượng, thường là nơi diễn ra các hoạt động tâm linh và tôn nghiêm.',
      hinhAnh: 'assets/nui-tuong.jpg',
      diaChi: 'Thị trấn Ba Chúc, huyện Tri Tôn, An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },  
    {
      maDiemDen: 5,
      TenDiemDen: 'Núi Dài',
      moTa: ' là một cảnh quan tuyệt đẹp hấp dẫn sự kỳ vĩ của thiên nhiên và tâm linh huyền bí, tạo nên một trải nghiệm độc đáo cho du khách.',
      hinhAnh: 'assets/nui-dai.jpg',
      diaChi: 'Xã Châu Lăng, huyện Tri Tôn, An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },  
    {
      maDiemDen: 6,
      TenDiemDen: 'Núi Dài 5 Giếng',
      moTa: 'Núi Ông Kết - Thiên Nhiên Hùng Vĩ ẩn chứa bí ẩn ở vùng quê An Giang. Đây là một ngọn núi kỳ vĩ với đỉnh cao tận mây, tạo ra một khung cảnh thơ mộng và đẹp đến ngạc nhiên. Hãy sẵn sàng khám phá đường leo núi thách thức và tận hưởng cảnh quan đỉnh núi tuyệt đẹp của Núi Ông Kết.',
      hinhAnh: 'assets/nui-dai-5-gieng.jpg',
      diaChi: 'Xã Thới Sơn, huyện Tịnh Biên, An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },  
    {
      maDiemDen: 7,
      TenDiemDen: 'Núi Nước',
      moTa: 'Núi Ông Kết - Thiên Nhiên Hùng Vĩ ẩn chứa bí ẩn ở vùng quê An Giang. Đây là một ngọn núi kỳ vĩ với đỉnh cao tận mây, tạo ra một khung cảnh thơ mộng và đẹp đến ngạc nhiên. Hãy sẵn sàng khám phá đường leo núi thách thức và tận hưởng cảnh quan đỉnh núi tuyệt đẹp của Núi Ông Kết.',
      hinhAnh: 'assets/nui-nuoc.jpg',
      diaChi: 'Thị trấn Ba Chúc, huyện Tri Tôn, An Giang, Việt Nam',
      maDanhMuc: 1, // Danh mục "Cảnh quan thiên nhiên"
    },  
  ];

  getDestinations(): Observable<Destination[]> {
    return of(this.destinations);
  }
}
