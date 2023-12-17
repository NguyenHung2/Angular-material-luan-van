// admin-home.component.ts

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { ScheduleService } from '../../services/schedule.service';
import { PostService } from '../../services/post.service';
import { ScheduleDestinationService } from '../../services/schedule-destination.service';
import { User, UserService } from '../../services/user.service';
import { Chart } from 'chart.js';

declare var CanvasJS: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  totalDestinations: number = 0;
  totalSchedules: number = 0;
  totalPosts: number = 0;
  totalScheduleDestinations: number = 0;

  @ViewChild('userRegistrationChart') userRegistrationChartRef!: ElementRef;

  constructor(
    private destinationService: DestinationService,
    private scheduleService: ScheduleService,
    private postService: PostService,
    private scheduleDestinationService: ScheduleDestinationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getTotalDestinations();
    this.getTotalSchedules();
    this.getTotalPosts();
    this.getTotalScheduleDestinations();
  }

  ngAfterViewInit(): void {
    this.drawUserRegistrationChart();
  }

  getTotalDestinations() {
    this.destinationService.getAllDestinations().subscribe(destinations => {
      this.totalDestinations = destinations.length;
    });
  }

  getTotalSchedules() {
    this.scheduleService.getSchedules().subscribe(schedules => {
      this.totalSchedules = schedules.length;
    });
  }

  getTotalPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.totalPosts = posts.length;
    });
  }

  getTotalScheduleDestinations() {
    this.scheduleDestinationService.getScheduleDestination().subscribe(scheduleDestinations => {
      this.totalScheduleDestinations = scheduleDestinations.length;
    });
  }

  drawUserRegistrationChart(): void {
    this.userService.getAllUsers().subscribe(users => {
      const userRegistrationData = this.prepareUserRegistrationData(users);

      const chart = new CanvasJS.Chart(this.userRegistrationChartRef.nativeElement, {
        animationEnabled: true,
        title: {
          text: 'Số lượng người dùng đã đăng ký',
          fontFamily: 'Arial',
          fontSize: 24,
          fontColor: 'black'
        },
        axisY: {
          title: 'Số lượng',
          includeZero: true,
          labelFontFamily: 'Arial',
          labelFontSize: 12,
          labelFontColor: 'black'
        },
        axisX: {
          title: 'Thời gian',
          labelFontFamily: 'Arial',
          labelFontSize: 12,
          labelFontColor: 'black',
          valueFormatString: 'MMM YYYY' // Format for displaying months and years
        },
        data: [{
          type: 'column',
          dataPoints: userRegistrationData.dataPoints
        }]
      });

      chart.render();
    });
  }

  prepareUserRegistrationData(users: User[]): { dataPoints: { x: Date, y: number }[] } {
    const userRegistrationData = {
      dataPoints: [] as { x: Date, y: number }[]
    };

    users.forEach(user => {
      const registrationDate: Date = new Date(user.ngayDangKy);
      const registrationYear: number = registrationDate.getFullYear();
      const registrationMonth: number = registrationDate.getMonth(); // Month is 0-based

      // Log the registration date for debugging
      console.log(`User ${user.maNguoiDung} registered on ${registrationDate.toISOString()}`);

      // Consider registrations from September 2023 onwards
      if (registrationYear > 2023 || (registrationYear === 2023 && registrationMonth >= 8)) {
        console.log(`Including user ${user.maNguoiDung} in the analysis.`);
        const registrationPeriod = new Date(registrationYear, registrationMonth);
        const index = userRegistrationData.dataPoints.findIndex(dp => dp.x.getTime() === registrationPeriod.getTime());
        if (index !== -1) {
          userRegistrationData.dataPoints[index].y++;
        } else {
          userRegistrationData.dataPoints.push({ x: registrationPeriod, y: 1 });
        }
      } else {
        console.log(`Skipping user ${user.maNguoiDung} registered before September 2023.`);
      }
    });

    console.log('Final userRegistrationData:', userRegistrationData);

    return userRegistrationData;
  }
}
