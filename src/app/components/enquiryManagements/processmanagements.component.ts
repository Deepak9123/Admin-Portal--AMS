import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatLibraryModule } from '../../modules/mat-library.module';

@Component({
  selector: 'app-processmanagements',
  standalone: true,
  imports: [MatLibraryModule, CommonModule, FormsModule],
  templateUrl: './processmanagements.component.html',
  styleUrl: './processmanagements.component.scss',
})
export class ProcessmanagementsComponent {
  panelOpenState = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.searchEnquiries();
  }
  async handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    await this.searchEnquiries();
  }

  filter = {
    enquiryFormId: '',
    studentName: '',
    adharCardNo: '',
  };

  enquiryList: any[] = [];
  selectedColumns = [];
  pageSize = 10;
  pageIndex = 1;
  totalRecords = 0;
  pageSizeOptions = [5, 10, 20];
  selectAll = false;
  editableFields = [
    'studentName',
    'adharCardNo',
    'std',
    'dob',
    'email',
    'fatherName',
    'fatherAdharCardNo',
    'fatherMobileNo',
    'fatherEmail',
    'motherName',
    'motherAdharCardNo',
    'motherMobileNo',
    'motherEmail',
    'placeOfBirth',
    'city',
    'district',
    'state',
    'pincode',
    'religion',
    'motherTongue',
  ];

  originalDataMap: { [enquiryFormId: string]: any } = {};

  enableEdit(enquiry: any) {
    enquiry.editing = true;
    this.originalDataMap[enquiry.enquiryFormId] = JSON.parse(
      JSON.stringify(enquiry)
    ); // Deep copy
  }

  cancelEdit(enquiry: any) {
    const original = this.originalDataMap[enquiry.enquiryFormId];
    if (original) {
      Object.assign(enquiry, original); // Restore fields
      enquiry.editing = false;
      delete this.originalDataMap[enquiry.enquiryFormId];
    }
  }
  async saveEdit(enquiry: any) {
    // Disable editing mode
    enquiry.editing = false;

    // Prepare the updated enquiry data
    const updatedEnquiry = { ...enquiry };

    // Call the update API directly in the component
    await this.http
      .put<any>(
        'http://localhost:6600/AMS/enquiry/v1/updateEnquiryForm',
        updatedEnquiry
      )
      .subscribe(
        (response: any) => {
          // If the update was successful
          if (response.status === 200 && response.success) {
            console.log('Enquiry updated successfully:', response.data);
            // Optionally show a success message
            this.showScuess('Enquiry updated successfully!');
          } else {
            // If there was an error in the update
            console.error('Error updating enquiry:', response.message);
            this.showError('Failed to update enquiry!');
          }
        },
        (error) => {
          // Handle any error from the API call
          console.error('Error while updating enquiry:', error);
          this.showError('An error occurred. Please try again later.');
        }
      );
  }

  async searchEnquiries() {
    const params = {
      enquiryFormId: this.filter.enquiryFormId,
      studentName: this.filter.studentName,
      adharCardNo: this.filter.adharCardNo,
      page: this.pageIndex,
      limit: this.pageSize,
    };

    await this.http
      .get<any>('http://localhost:6600/AMS/enquiry/v1/enquiry/list', { params })
      .subscribe((res) => {
        if (res.status === 200) {
          this.enquiryList = res.data.map((e: any) => ({
            ...e,
            selected: false,
          }));
          this.totalRecords = res.pagination.total;
        }
      });
  }

  clearSearch() {
    this.filter = { enquiryFormId: '', studentName: '', adharCardNo: '' };
    this.searchEnquiries();
  }

  toggleAllSelection() {
    this.enquiryList.forEach((enquiry) => (enquiry.selected = this.selectAll));
  }

  showError(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, 'Close', config);
  }
  showScuess(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, 'Close', config);
  }
  exportData() {
    console.log(this.selectAll);
    console.log(this.enquiryList);

    return;

    let params = {
      enquiryFormId: this.filter.enquiryFormId,
      studentName: this.filter.studentName,
      adharCardNo: this.filter.adharCardNo,
      page: this.pageIndex,
      limit: 50000,
    };

    // Call the API with filters applied
    this.exportDataWithFilters(params);
  }

  // API call to get filtered data and export it
  exportDataWithFilters(params: any) {
    this.http
      .get<any>('http://localhost:6600/AMS/enquiry/v1/enquiry/list', { params })
      .subscribe(
        (res) => {
          if (res.status === 200) {
            // Export the data (you could call your Excel generation method here)
            this.generateExcel(res.data);
          } else {
            console.error('Export failed:', res.message);
          }
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }

  // Function to generate the Excel file
  generateExcel(data: any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiry Data');
    XLSX.writeFile(wb, 'Enquiry_Export' + '_' + Date.now() + '.xlsx');
  }
}
