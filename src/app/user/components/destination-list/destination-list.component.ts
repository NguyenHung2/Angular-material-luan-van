import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  destinations: any[] = [
    {
      id: 1,
      name: "Phước Lâm Tự - Chùa Lầu",
      imageUrl: "assets/chua-lau-an-giang.jpg",
      description:
        "Chùa Lầu là một công trình tôn nghiêm và lịch lãm tại An Giang, Việt Nam. Với kiến trúc độc đáo và sự yên bình, đây là nơi lý tưởng để thư giãn và tham quan.",
      detailUrl: "#",
      rating: 5,
      reviews: 10,
      likes: 25,
    },
    {
      id: 2,
      name: "Cáp Treo Núi Sấm",
      imageUrl: "assets/cap-treo-nui-sam.png",
      description:
        "Cáp Treo Núi Sam - trải nghiệm tuyệt vời cho người thích khám phá và phiêu lưu, nằm trong một khu vực thiên đàng với cảnh quan tuyệt đẹp.",
      detailUrl: "#",
      rating: 5,
      reviews: 8,
      likes: 15,
    },
    {
      id: 3,
      name: "Chợ Nổi Long Xuyên",
      imageUrl: "assets/cho-noi-long-xuyen-an-giang.jpg",
      description:
        "Chợ Nổi Long Xuyên là một trong những điểm tham quan hấp dẫn tại An Giang. Bạn có thể mua sắm đặc sản và thưởc thức ẩm thực độc đáo tại đây.",
      detailUrl: "#",
      rating: 5,
      reviews: 12,
      likes: 20,
    },
    {
      id: 4,
      name: "Chùa Ông - Châu Đốc",
      imageUrl: "assets/chua-ong-chau-doc.jpg",
      description:
        "Chùa Ông là một công trình kiến trúc tôn nghiêm tại Châu Đốc, An Giang. Đây là điểm tham quan và tâm linh quan trọng của vùng.",
      detailUrl: "#",
      rating: 4.5,
      reviews: 7,
      likes: 18,
    },
    {
      id: 5,
      name: "Bảo tàng tỉnh An Giang",
      imageUrl: "assets/bao-tang-tinh-an-giang.jpg",
      description:
        "Bảo tàng tỉnh An Giang là nơi lưu trữ và trưng bày các hiện vật liên quan đến lịch sử và văn hóa của An Giang.",
      detailUrl: "#",
      rating: 4,
      reviews: 5,
      likes: 12,
    },
    {
      id: 6,
      name: "Dinh Sơn Trung",
      imageUrl: "assets/dinh-son-trung.jpg",
      description:
        "Dinh Sơn Trung là một ngôi đình tôn nghiêm tại An Giang, thường được người dân địa phương thờ cúng.",
      detailUrl: "#",
      rating: 4.2,
      reviews: 6,
      likes: 14,
    },
    {
      id: 7,
      name: "Chùa Huỳnh Đạo",
      imageUrl: "../../../assets/chua-huynh-dao.jpg",
      description:
        "Chợ Núi Sam là một trong những chợ nổi tiếng ở An Giang, nơi bạn có thể tham quan và mua sắm đặc sản.",
      detailUrl: "#",
      rating: 4.3,
      reviews: 8,
      likes: 10,
    },
    {
      id: 8,
      name: "Khu lưu niệm Chủ tịch Tôn Đức Thắng",
      imageUrl: "../../../assets/khu-luu-niem-chu-tich-ton-duc-thang.jpg",
      description:
        "Vườn Quốc Gia Tràm Chim là một khu vực bảo tồn thiên nhiên tại An Giang, rất phù hợp cho việc quan sát động vật hoang dã và thiên nhiên.",
      detailUrl: "#",
      rating: 4.8,
      reviews: 9,
      likes: 22,
    },
    {
      id: 9,
      name: "Hồ Latina",
      imageUrl: "assets/ho-latina.jpg",
      description:
        "Chợ Châu Đốc là một trong những chợ truyền thống tại An Giang, nơi bạn có thể trải nghiệm văn hóa mua sắm của người dân địa phương.",
      detailUrl: "#",
      rating: 4.1,
      reviews: 7,
      likes: 16,
    },
    {
      id: 10,
      name: "Núi Cô Tô",
      imageUrl: "assets/nui-co-to.jpg",
      description:
        "Biển Hòn Núi là một điểm đến biển nổi tiếng ở An Giang, với cát trắng và nước biển trong xanh.",
      detailUrl: "#",
      rating: 4.7,
      reviews: 10,
      likes: 30,
    },
    // Thêm các đối tượng đại diện cho các điểm đến khác ở An Giang ở đây
  ];

  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục trên mỗi trang
  pages: number[] = []; // Array to store page numbers


  constructor() { }

  ngOnInit(): void {
    this.calculatePages();
  }

  calculatePages() {
    const totalItems = this.destinations.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Function to change the current page
  changePage(page: number) {
    this.currentPage = page;
  }
}
