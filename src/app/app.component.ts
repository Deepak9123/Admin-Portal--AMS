import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { MatLibraryModule } from '../app/modules/mat-library.module';
import { CommonService } from '../app/services/common.service';
import { HeaderComponent } from './main-layout/header/header.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatLibraryModule,
    HeaderComponent,
    SidebarComponent,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHead: boolean = false;
  showSidebar: boolean = false;
  private subscription: Subscription | undefined;
  eventData: any;
  isShrink: boolean = false;
  private devtoolsOpen = false;
  private readonly threshold = 160;
  loaderConfig: NgxUiLoaderConfig = {
    fgsType: 'ball-spin-clockwise', // Type of foreground spinner
    fgsColor: '#FF0000', // Red spinner color
    fgsSize: 100, // Size of the spinner
    overlayColor: 'rgba(255, 255, 255, 0.8)', // Optional: Background overlay color
    pbColor: '#FF0000', // Optional: Red progress bar
    hasProgressBar: false, // Disable progress bar
  };

  // @HostListener('document:contextmenu', ['$event'])
  // onRightClick(event: MouseEvent): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // @HostListener('document:keydown', ['$event'])
  // onKeydown(event: KeyboardEvent): void {
  //   if (event.key === 'F12' ||
  //       (event.ctrlKey && event.shiftKey && event.key === 'I') ||
  //       (event.ctrlKey && event.key === 'U') ||
  //       (event.ctrlKey && event.shiftKey && event.key === 'C')) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.detectDevTools();
  }

  private detectDevTools(): void {
    if (
      window.innerWidth - document.documentElement.clientWidth >
        this.threshold ||
      window.innerHeight - document.documentElement.clientHeight >
        this.threshold
    ) {
      if (!this.devtoolsOpen) {
        this.devtoolsOpen = true;
        alert('Developer tools are open!');
      }
    } else {
      this.devtoolsOpen = false;
    }
  }

  constructor(public router: Router, private commonService: CommonService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/login' ||
          event['url'] == '/' ||
          event['url'] == '/AMS/login' ||
          event['url'] == '/users-creation'
        ) {
          this.showHead = false;
          this.showSidebar = false;
        } else {
          this.showHead = true;
          this.showSidebar = true;
        }
      }
    });

    this.subscription = this.commonService.eventEmitter.subscribe((data) => {
      this.eventData = data;
      if (this.eventData == 'true') {
        this.shrinkMain();
      } else {
        this.expandMain();
      }
    });
  }

  ngOnInit() {}

  shrinkMain() {
    this.isShrink = true;
  }

  expandMain() {
    this.isShrink = false;
  }
}
