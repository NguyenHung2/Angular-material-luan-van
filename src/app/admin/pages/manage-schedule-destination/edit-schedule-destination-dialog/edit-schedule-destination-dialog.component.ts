import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule, ScheduleService } from 'src/app/admin/services/schedule.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service'; // Import the Destination service
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-schedule-destination-dialog',
  templateUrl: './edit-schedule-destination-dialog.component.html',
  styleUrls: ['./edit-schedule-destination-dialog.component.css']
})
export class EditScheduleDestinationDialogComponent implements OnInit {
  editDestinationForm: FormGroup;
  schedules: Schedule[] = [];
  destinations: Destination[] = []; 

  constructor(
    public dialogRef: MatDialogRef<EditScheduleDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private destinationService: DestinationService,
    private snackBar: MatSnackBar 
  ) {
    this.editDestinationForm = this.formBuilder.group({
      maLichTrinhDiemDen: data.scheduleDestination.maLichTrinhDiemDen,
      maLichTrinh: [data.scheduleDestination.lichTrinh.maLichTrinh, Validators.required],
      maDiemDen: [data.scheduleDestination.diemDen.maDiemDen, Validators.required],
      thuTu: [data.scheduleDestination.thuTu.toString(), Validators.required],
      hoatDong: [data.scheduleDestination.hoatDong.toString(), Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch schedules from ScheduleService
    this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
      this.schedules = data;
    });

    // Fetch destinations from DestinationService
    this.destinationService.getAllDestinations().subscribe((data: Destination[]) => {
      this.destinations = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.snackBar.open(
      'Người dùng đã được cập nhật thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  onSaveClick(): void {
    if (this.editDestinationForm && this.editDestinationForm.valid) {
      const updatedDestination: any = this.editDestinationForm.value;
      this.dialogRef.close(updatedDestination);
      console.log('updatedDestination: ', updatedDestination);
    }
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}