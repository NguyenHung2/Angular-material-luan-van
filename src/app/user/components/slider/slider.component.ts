import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  images = [
    {
      src: 'assets/Khu-du-lich-Nui-Cam.jpg',
      alt: 'Núi Cấm',
      title: 'Núi Cấm',
      description: 'Núi Cấm là một địa danh nổi tiếng ở tỉnh An Giang, Việt Nam. Với độ cao hơn 700m so với mực nước biển, từ đỉnh núi, bạn có thể ngắm nhìn toàn cảnh vùng đất xanh rừng trải dài và sông nước mênh mông dưới chân núi.',
    },
    {
      src: 'assets/cap-treo-nui-sam.png',
      alt: 'Cáp treo Núi Sam',
      title: 'Cáp treo Núi Sam',
      description: 'Cáp treo Núi Sam mang bạn lên đỉnh núi Sam để thưởng ngoạn khung cảnh đẹp của vùng đất miền Tây Nam Bộ. Đây cũng là nơi có chùa Bà Chúa Xứ nổi tiếng và là điểm đến hấp dẫn cho du khách tham quan và tìm hiểu văn hóa địa phương.',
    },
    {
      src: 'assets/mieu-ba-chua-xu-nui-sam.jpg',
      alt: 'Miếu Bà Chúa Xứ Núi Sam',
      title: 'Miếu Bà Chúa Xứ Núi Sam',
      description: 'Miếu Bà Chúa Xứ Núi Sam là một trong những điểm tâm linh quan trọng ở miền Tây Nam Bộ. Ngôi miếu được xây dựng để thờ nguyên thủy thần linh, là nơi tín đồ tôn thờ và cầu nguyện cho sự bình an, may mắn.',
    },
    {
      src: 'assets/rung-tram-tra-su.jpg',
      alt: 'Rừng tràm Trà Sư',
      title: 'Rừng tràm Trà Sư',
      description: 'Rừng tràm Trà Sư nằm ở huyện Tịnh Biên, tỉnh An Giang, là một di sản thiên nhiên quốc gia. Với hệ sinh thái đa dạng, đặc biệt là các loài chim, Rừng tràm Trà Sư là điểm đến lý tưởng cho những ai yêu thiên nhiên và muốn khám phá vẻ đẹp hoang sơ.',
    },
    {
      src: 'assets/cho-noi-long-xuyen-an-giang.jpg',
      alt: 'Chợ nổi Long Xuyên',
      title: 'Chợ nổi Long Xuyên',
      description: 'Chợ nổi Long Xuyên là một trong những điểm du lịch nổi tiếng ở An Giang. Với hệ thống ghe, thuyền, gỗ tre độc đáo, chợ nổi này tạo nên một không gian thương mại sôi động, đa dạng về hàng hóa và là nơi tập trung của nền văn hóa dân gian miền Tây Nam Bộ.',
    }
  ];

  activeDot: number = 0;
  listPosition: number = 0;

  get dots(): number[] {
    return Array.from({ length: this.images.length }, (_, index) => index);
  }

  ngOnInit() {
    this.startSlideShow();
  }

  nextSlide() {
    this.activeDot = (this.activeDot + 1) % this.images.length;
    this.listPosition = -this.activeDot * 1300; // Adjust based on image width
  }

  prevSlide() {
    this.activeDot = this.activeDot - 1 < 0 ? this.images.length - 1 : this.activeDot - 1;
    this.listPosition = -this.activeDot * 1300; // Adjust based on image width
  }

  goToSlide(index: number) {
    this.activeDot = index;
    this.listPosition = -index * 1300; // Adjust based on image width
  }

  startSlideShow() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }
}
