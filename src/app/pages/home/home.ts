import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MinistryService, Ministry } from '../../services/ministry.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  ministries: Ministry[] = [];
  loading = true;

  constructor(
    private ministryService: MinistryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.ministryService.getAllMinistries().subscribe({
      next: (response) => {
        if (response.success) {
          // Take only the first 3 for the home page highlights
          this.ministries = response.data.slice(0, 3);
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading ministries', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
