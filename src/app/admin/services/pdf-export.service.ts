import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  private storageKey = 'pdfExportData'; // Unique key for storing data in localStorage

  private pdfExportData: any;

  setPdfExportData(data: any): void {
    this.pdfExportData = data;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getPdfExportData(): any {
    if (!this.pdfExportData) {
      // Try to retrieve data from localStorage
      const storedData = localStorage.getItem(this.storageKey);
      this.pdfExportData = storedData ? JSON.parse(storedData) : null;
    }
    return this.pdfExportData;
  }
}
