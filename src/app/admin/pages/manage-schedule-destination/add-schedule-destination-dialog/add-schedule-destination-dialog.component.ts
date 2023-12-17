import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule, ScheduleService } from 'src/app/admin/services/schedule.service';
import { ScheduleDestination } from 'src/app/admin/services/schedule-destination.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-schedule-destination-dialog',
  templateUrl: './add-schedule-destination-dialog.component.html',
  styleUrls: ['./add-schedule-destination-dialog.component.css']
})
export class AddScheduleDestinationDialogComponent implements OnInit {
  addDestinationForm: FormGroup;
  schedules: any[] = [];
  destinations: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddScheduleDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private destinationService: DestinationService,
    private snackBar: MatSnackBar
  ) {
    this.addDestinationForm = this.formBuilder.group({
      maLichTrinhDiemDen: 0,
      maLichTrinh: [0, Validators.required],
      maDiemDen: [0, Validators.required],
      thuTu: [0, Validators.required],
      hoatDong: ['', Validators.required],
    });
  }

  // Assuming this.data contains the existing values
  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
      this.schedules = data;

      // If this is an edit operation (existing data is provided)
      if (this.data) {
        this.addDestinationForm.patchValue({
          maLichTrinh: this.data.maLichTrinh,
          maDiemDen: this.data.maDiemDen,
          thuTu: this.data.thuTu,
          hoatDong: this.data.hoatDong,
        });
      }
    });

    this.destinationService.getAllDestinations().subscribe((data: Destination[]) => {
      this.destinations = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.addDestinationForm && this.addDestinationForm.valid) {
      const newDestination: ScheduleDestination = this.addDestinationForm.value;
      this.dialogRef.close(newDestination);
      console.log(newDestination);
      this.snackBar.open(
        'Người dùng đã được thêm thành công!',
        'Đóng',
        {
          duration: 3000,
          panelClass: 'success-snackbar',
        }
      );
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
