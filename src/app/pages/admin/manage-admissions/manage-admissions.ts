import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Admission {
  id: number;
  name: string;
  email: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-manage-admissions',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './manage-admissions.html',
  styleUrl: './manage-admissions.css',
})
export class ManageAdmissionsComponent {
  admissions: Admission[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-11-20', status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-11-18', status: 'Approved' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', date: '2024-11-15', status: 'Pending' }
  ];

  updateStatus(id: number, status: 'Approved' | 'Rejected') {
    const admission = this.admissions.find(a => a.id === id);
    if (admission) {
      admission.status = status;
    }
  }
}
