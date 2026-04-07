import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  stats = [
    { label: 'Total Events', value: 12, icon: 'calendar' },
    { label: 'Pending Admissions', value: 8, icon: 'users' },
    { label: 'Prayer Requests', value: 24, icon: 'heart' },
    { label: 'Active Ministries', value: 6, icon: 'star' }
  ];
}
