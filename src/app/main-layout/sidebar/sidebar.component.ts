import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  openSubMenus: Set<string> = new Set<string>();
  role: any = 1;
  roleType!: string;
  userDetails: any = [];

  constructor(private commonService: CommonService, private routes: Router) {}

  ngOnInit() {
    this.role = 1;
    this.roleType = 'Admin';
  }

  toggleSubMenu(menu: string): void {
    if (this.isSubMenuOpen(menu)) {
      this.openSubMenus.delete(menu);
    } else {
      this.openSubMenus.add(menu);
    }
  }

  isSubMenuOpen(menu: string): boolean {
    return this.openSubMenus.has(menu);
  }

  shrinkMain() {
    this.commonService.eventEmitter.emit('true');
  }

  expandMain() {
    this.commonService.eventEmitter.emit('false');
  }

  navigateTo(path: any) {
    this.commonService.eventEmitter.emit('false');
    this.routes.navigate([path]);
  }
}
