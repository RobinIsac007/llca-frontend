import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Worship', 'Youth', 'Education', 'Outreach', 'Prayer'];
  loading = false;
  error: string | null = null;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.error = null;

    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = data;
        this.loading = false;
        // Force view update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = 'Failed to load events. Make sure the backend is running at http://localhost:8080';
        this.loading = false;
        // Force view update
        this.cdr.detectChanges();
      }
    });
  }

  filterEvents() {
    if (this.selectedCategory === 'All') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(
        event => event.category === this.selectedCategory
      );
    }
  }
}
