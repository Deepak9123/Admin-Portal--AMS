import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiEndPoint } from '../../../global/api-endpoint.config';
import { MatLibraryModule } from '../../../modules/mat-library.module';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  standalone: true,
  imports: [MatLibraryModule],
})
export class ProjectModalComponent {
  projectForm: FormGroup;
  accountList: any = [];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _commonServices: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectForm = this.fb.group({
      accountid: [data.accountname || '', Validators.required],
      projectname: [data.projectname || '', Validators.required],
      projectdescription: [data.projectdescription || '', Validators.required],
      created_by: [data.created_by || '', Validators.required],
      updated_by: [data.updated_by || '', Validators.required],
    });
  }

  async ngOnInit() {
    await this.getAccountList();
  }

  async getAccountList() {
    let res: any = await this._commonServices.getCall(
      apiEndPoint.getAccount + `?page=1&limit=1000`
    );
    if (res?.status == 200) {
      this.accountList = res.data;
    } else {
      this.accountList = [];
    }
  }

  // Close the modal
  onNoClick(): void {}

  async onSubmit() {
    if (this.projectForm.valid) {
      try {
        let res: any = await this._commonServices.postCall(
          apiEndPoint.createProject,
          this.projectForm.value
        );
        if (res.status === 201) {
          this.showSnackBar('Project created successfully!', 'success'); // Success message
        } else {
          this.showSnackBar(
            'Failed to create Project. Please try again.',
            'error'
          ); // Failure message
        }
      } catch (error) {
        this.showSnackBar('An error occurred. Please try again.', 'error'); // Error handling
      }
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  // Snackbar for showing feedback
  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, '', {
      duration: 3000, // Duration of the snackbar
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error', // Style based on success or error
    });
  }
}
