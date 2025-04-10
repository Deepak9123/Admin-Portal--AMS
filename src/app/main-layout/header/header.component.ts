import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatLibraryModule } from '../../modules/mat-library.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatLibraryModule],
})
export class HeaderComponent {
  loggedInUser: any;
  userDetails: any = {};
  userUnitCode: any = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.loggedInUser = localStorage.getItem('LoggedInUser');
    //   const data:any = localStorage.getItem('ResultSet1');
    //   this.userUnitCode = JSON.parse(data);
    // }
    // if (localStorage.getItem('userDetails')) {
    // const userData: any = localStorage.getItem('userDeatils');
    // this.userDetails = JSON.parse(userData);
    // console.log('userDetails',this.userDetails);
    // }
  }

  logOutUser() {
    this.dialog.closeAll();
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
