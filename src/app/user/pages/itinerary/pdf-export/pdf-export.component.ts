import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PdfExportService } from 'src/app/admin/services/pdf-export.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-export',
  templateUrl: './pdf-export.component.html',
  styleUrls: ['./pdf-export.component.css']
})
export class PdfExportComponent implements OnInit {
  pdfExportData: any;

  @ViewChild('pdfContainer', { static: false }) pdfContainer!: ElementRef;

  constructor(
    private pdfExportService: PdfExportService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.pdfExportData = this.pdfExportService.getPdfExportData();

    if (!this.pdfExportData) {
      console.error('No data found for PDF export.');
    } else {
      console.log('PDF Export Data:', this.pdfExportData);
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  exportToPDF(): void {
    const content = this.pdfContainer.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
      pdf.save('exported-document.pdf');
    });
  }
}
