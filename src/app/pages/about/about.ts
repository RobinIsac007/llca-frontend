import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastorService, Pastor } from '../../services/pastor.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit {
  pastors: Pastor[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private pastorService: PastorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPastors();
  }

  loadPastors(): void {
    this.isLoading = true;
    this.pastorService.getActivePastors().subscribe({
      next: (response) => {
        if (response.success) {
          this.pastors = response.data;
        }
        this.isLoading = false;
        // Force view update
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading pastors:', error);
        this.errorMessage = 'Failed to load pastors';
        this.isLoading = false;
        // Force view update
        this.cdr.detectChanges();
      }
    });
  }
}
