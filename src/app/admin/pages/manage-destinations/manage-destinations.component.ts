import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageDestinationService, Destination } from '../../service/manage-destination.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
})
export class ManageDestinationsComponent implements OnInit, AfterViewInit {
  destinations: Destination[] = [];
  searchControl = new FormControl('');
  filteredDestinations: MatTableDataSource<Destination> = new MatTableDataSource<Destination>(this.destinations);
  displayedColumns: string[] = [
    'maDiaDiem',
    'tenDiaDiem',
    'moTa',
    'kinhDo',
    'viDo',
    'hinhAnh',
    'diaChi',
    'ngayTao',
    'trangThaiDiaDiem',
    'danhMucDiaDiem',
    'thaoTac',
  ];

  // Thêm biến và mô hình cho việc thêm mới
  showAddFormFlag: boolean = false;
  newDestinationForm!: FormGroup;
  newDestination: Destination = {
    maDiaDiem: 0,
    tenDiaDiem: '',
    moTa: '',
    kinhDo: 0,
    viDo: 0,
    hinhAnh: '',
    diaChi: '',
    ngayTao: new Date(),
    trangThaiDiaDiem: true,
    danhMucDiaDiem: '',
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private manageDestinationService: ManageDestinationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.manageDestinationService.getDestinations().subscribe((data) => {
      this.destinations = data;

      // Cập nhật cột "Ngày Tạo" và "Trạng Thái Địa Điểm"
      this.destinations.forEach((destination) => {
        destination.ngayTao = new Date(); // Thay bằng ngày tạo thực tế
        destination.trangThaiDiaDiem = true; // Thay bằng trạng thái thực tế của địa điểm
      });

      this.filteredDestinations = new MatTableDataSource<Destination>(this.destinations);
      // Thiết lập sắp xếp cho bảng dữ liệu
      this.filteredDestinations.sort = this.sort;

      // Sắp xếp mặc định theo cột "Mã Địa Điểm" từ thấp đến cao
      this.sort.sort(<MatSortable>{
        id: 'maDiaDiem',
        start: 'asc', // Sắp xếp từ thấp đến cao
      });
    });

    this.filteredDestinations.filterPredicate = (data: Destination, filter: string) => {
      const searchTerms = filter.toLowerCase().split(' ');
      return searchTerms.every((term) => {
        return (
          data.maDiaDiem.toString().toLowerCase().includes(term) ||
          data.tenDiaDiem.toLowerCase().includes(term) ||
          data.moTa.toLowerCase().includes(term) ||
          data.kinhDo.toString().toLowerCase().includes(term) ||
          data.viDo.toString().toLowerCase().includes(term) ||
          data.diaChi.toLowerCase().includes(term) ||
          (data.trangThaiDiaDiem ? 'Hoạt động' : 'Ngừng hoạt động').toLowerCase().includes(term)
        );
      });
    };

    this.searchControl.valueChanges.subscribe((value: string | null) => {
      if (value !== null) {
        this.applyFilter(value);
      }
    });


    this.newDestinationForm = this.fb.group({
      maDiaDiem: ['', Validators.required],
      tenDiaDiem: ['', Validators.required],
      moTa: ['', Validators.required],
      kinhDo: ['', Validators.required],
      viDo: ['', Validators.required],
      hinhAnh: ['', Validators.required],
      diaChi: ['', Validators.required],
      ngayTao: ['', Validators.required],
      trangThaiDiaDiem: [true, Validators.required],
      danhMucDiaDiem: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    // Cấu hình paginator và sort sau khi view đã được khởi tạo
    this.filteredDestinations.paginator = this.paginator;
    this.filteredDestinations.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredDestinations.filter = filterValue;
  }

  editDestination(destination: Destination): void {
    // Xử lý khi người dùng chọn chỉnh sửa
  }

  deleteDestination(destination: Destination): void {
    // Xử lý khi người dùng chọn xóa
  }

  // Function to submit the form
  addDestination() {
    if (this.newDestinationForm.valid) {
      console.log('New destination:', this.newDestination);
      this.resetForm();
    }
  }

  // Function to cancel and hide the form
  cancelAddForm() {
    this.resetForm();
  }

  // Function to reset the form and hide it
  resetForm() {
    this.newDestinationForm.reset(this.newDestination);
    this.showAddFormFlag = false;
  }

  // Function to show the form
  showAddForm() {
    this.showAddFormFlag = true;
  }

  selectedFileName: string = 'Chưa chọn tệp';

  openFileInput() {
    this.fileInput.nativeElement.click();
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFileName = file.name;

      // Tạo một đường dẫn tạm thời cho tệp hình ảnh
      // Lưu ý rằng đây là một đường dẫn tạm thời và cần phải xử lý tệp sau khi tải lên máy chủ
      const temporaryImageUrl = URL.createObjectURL(file);

      // Lưu đường dẫn tạm thời vào newDestination.hinhAnh
      this.newDestination.hinhAnh = temporaryImageUrl;
    } else {
      this.selectedFileName = 'Chưa chọn tệp';
      this.newDestination.hinhAnh = ''; // Gán giá trị rỗng nếu không có tệp nào được chọn
    }
  }
}
