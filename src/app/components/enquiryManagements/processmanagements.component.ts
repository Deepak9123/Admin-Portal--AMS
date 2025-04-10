import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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
    public dialog: MatDialog
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
  pageSize = 10;
  pageIndex = 1;
  totalRecords = 0;
  pageSizeOptions = [5, 10, 20];
  selectAll = false;

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
}
