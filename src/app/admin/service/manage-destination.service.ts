import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Destination {
  maDiaDiem: number;
  tenDiaDiem: string;
  moTa: string;
  kinhDo: number;
  viDo: number;
  hinhAnh: string;
  diaChi: string;
  ngayTao: Date;
  trangThaiDiaDiem: boolean; 
  danhMucDiaDiem: string;
}

@Injectable({
  providedIn: 'root',
})
export class ManageDestinationService {
  private destinations: Destination[] = [
    {
      maDiaDiem: 1,
      tenDiaDiem: 'Chợ Nổi Long Xuyên',
      moTa: 'Chợ nổi Long Xuyên nằm tại huyện Long Xuyên, An Giang. Đây là một trong những chợ nổi nổi tiếng và quy mô lớn ở vùng ĐBSCL.',
      kinhDo: 105.4222,
      viDo: 10.3855,
      hinhAnh: 'cho-noi-long-xuyen.jpg',
      diaChi: 'Xã Mỹ Khánh, huyện Long Xuyên, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Mua sắm và ẩm thực',
    },
    {
      maDiaDiem: 2,
      tenDiaDiem: 'Núi Sam',
      moTa: 'Núi Sam nằm tại huyện Châu Đốc, An Giang. Đây là một trong những điểm du lịch nổi tiếng của An Giang với cảnh quan thiên nhiên hùng vĩ và nhiều ngôi chùa linh thiêng.',
      kinhDo: 105.1579,
      viDo: 10.7397,
      hinhAnh: 'nui-sam.jpg',
      diaChi: 'Xã Núi Sam, huyện Châu Đốc, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Cảnh quan thiên nhiên',
    },
    {
      maDiaDiem: 3,
      tenDiaDiem: 'Chùa Long Sơn Núi Sam',
      moTa: 'Chùa Long Sơn Núi Sam nằm tại huyện Châu Đốc, tỉnh An Giang. Đây là một ngôi chùa linh thiêng và là nơi tôn vinh thần linh, với kiến trúc độc đáo và vị trí đẹp.',
      kinhDo: 104.9961,
      viDo: 10.7333,
      hinhAnh: 'chua-long-son-nui-sam.jpg',
      diaChi: 'Xã Núi Sam, huyện Châu Đốc, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 4,
      tenDiaDiem: 'Chùa Huỳnh Đạo',
      moTa: 'Chùa Huỳnh Đạo nằm tại huyện Châu Đốc, tỉnh An Giang. Đây là một ngôi chùa linh thiêng với kiến trúc độc đáo và là nơi tôn vinh thần linh.',
      kinhDo: 105.1019,
      viDo: 10.6145,
      hinhAnh: 'chua-huynh-dao.jpg',
      diaChi: 'Xã Tây Yên Tử, huyện Châu Đốc, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 5,
      tenDiaDiem: 'Chùa Vạn Linh Núi Cấm',
      moTa: 'Chùa Vạn Linh Núi Cấm nằm tại huyện Tịnh Biên, tỉnh An Giang. Đây là một ngôi chùa cổ kính và linh thiêng, có kiến trúc độc đáo và mang nét văn hóa truyền thống của vùng ĐBSCL.',
      kinhDo: 105.0651,
      viDo: 10.1962,
      hinhAnh: 'chua-van-linh-nui-cam.jpg',
      diaChi: 'Xã Núi Cấm, huyện Tịnh Biên, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 6,
      tenDiaDiem: 'Chùa Koh Kas',
      moTa: 'Chùa Koh Kas nằm tại huyện Phú Tân, tỉnh An Giang. Đây là một ngôi chùa linh thiêng và là nơi tôn vinh thần linh, với kiến trúc độc đáo và vị trí đẹp.',
      kinhDo: 105.3575,
      viDo: 10.5989,
      hinhAnh: 'chua-koh-kas.jpg',
      diaChi: 'Xã Tân Hòa, huyện Phú Tân, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 7,
      tenDiaDiem: 'Rừng Tràm Trà Sư',
      moTa: 'Rừng Tràm Trà Sư nằm ở huyện Tịnh Biên, tỉnh An Giang. Đây là một trong những khu rừng tràm thiên nhiên quý hiếm, với đa dạng sinh học và cảnh quan thiên nhiên độc đáo.',
      kinhDo: 105.0912,
      viDo: 10.2414,
      hinhAnh: 'rung-tram-tra-su.jpg',
      diaChi: 'Xã Trà Sư, huyện Tịnh Biên, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Cảnh quan thiên nhiên',
    },
    {
      maDiaDiem: 8,
      tenDiaDiem: 'Thốt Nốt Trái Tim',
      moTa: 'Thốt Nốt Trái Tim là một điểm du lịch nằm tại thành phố Cần Thơ. Đây là một bức tranh lớn được tạo ra từ cây lúa và thảo mộc, tượng trưng cho tình yêu và trái tim của người dân miền Tây.',
      kinhDo: 105.7067,
      viDo: 10.1052,
      hinhAnh: 'thot-not-trai-tim.jpg',
      diaChi: 'Phường Thốt Nốt, quận Thốt Nốt, thành phố Cần Thơ',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 9,
      tenDiaDiem: 'Hồ & Chùa Tà Pạ',
      moTa: 'Hồ & Chùa Tà Pạ nằm tại huyện Tri Tôn, tỉnh An Giang. Đây là một khu du lịch thú vị với hồ nước và ngôi chùa cổ kính, mang đậm nét văn hóa truyền thống.',
      kinhDo: 104.9936,
      viDo: 10.2711,
      hinhAnh: 'ho-chua-ta-pa.jpg',
      diaChi: 'Xã Tà Pạ, huyện Tri Tôn, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
    {
      maDiaDiem: 10,
      tenDiaDiem: 'Hồ Soài So',
      moTa: 'Hồ Soài So nằm ở huyện Tịnh Biên, tỉnh An Giang. Đây là một hồ nước tạo thành từ hoạt động đào mỏ và trở thành một địa điểm thú vị để thư giãn và câu cá.',
      kinhDo: 105.1698,
      viDo: 10.2447,
      hinhAnh: 'ho-soai-so.jpg',
      diaChi: 'Xã Vĩnh Gia, huyện Tịnh Biên, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Hoạt động ngoại trời và thể thao',
    },
    {
      maDiaDiem: 11,
      tenDiaDiem: 'Hồ Ô Thum',
      moTa: 'Hồ Ô Thum nằm ở huyện Tịnh Biên, tỉnh An Giang. Đây là một hồ nước xanh mát được bao quanh bởi cánh đồng lúa và là nơi thích hợp cho các hoạt động ngoại trời.',
      kinhDo: 105.2063,
      viDo: 10.4046,
      hinhAnh: 'ho-o-thum.jpg',
      diaChi: 'Xã Vĩnh Phước, huyện Tịnh Biên, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Hoạt động ngoại trời và thể thao',
    },
    {
      maDiaDiem: 12,
      tenDiaDiem: 'Hồ Latina',
      moTa: 'Hồ Latina nằm ở huyện Tri Tôn, tỉnh An Giang. Đây là một hồ nước xanh mát, tạo điểm nhấn cho cảnh quan thiên nhiên và là nơi lý tưởng để thư giãn.',
      kinhDo: 105.0039,
      viDo: 10.2172,
      hinhAnh: 'ho-latina.jpg',
      diaChi: 'Xã Lạc Quới, huyện Tri Tôn, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Cảnh quan thiên nhiên',
    },
    {
      maDiaDiem: 13,
      tenDiaDiem: 'Miếu Bà Chúa Xứ Núi Sam',
      moTa: 'Miếu Bà Chúa Xứ nằm ở huyện Châu Đốc, tỉnh An Giang. Đây là một ngôi miếu linh thiêng và là nơi tôn vinh thần linh Bà Chúa Xứ, được người dân địa phương sùng bái.',
      kinhDo: 105.1019,
      viDo: 10.6847,
      hinhAnh: 'mieu-ba-chua-xu.jpg',
      diaChi: 'Xã Vĩnh Tế, huyện Châu Đốc, tỉnh An Giang',
      ngayTao: new Date(),
      trangThaiDiaDiem: true,
      danhMucDiaDiem: 'Di tích lịch sử và văn hóa',
    },
  ];        

  getDestinations(): Observable<Destination[]> {
    return of(this.destinations);
  }

  // Thêm phương thức để thêm mới điểm đến
  addDestination(destination: Destination): void {
    // Thêm logic để thêm mới điểm đến vào danh sách destinations
    // Ví dụ:
    this.destinations.push(destination);
  }
}
