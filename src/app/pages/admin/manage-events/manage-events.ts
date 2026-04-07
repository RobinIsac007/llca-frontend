import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from '../../../services/event.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-manage-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-events.html',
  styleUrl: './manage-events.css'
})
export class ManageEventsComponent implements OnInit {
  events: Event[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Form state
  showForm = false;
  isEditing = false;
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  currentEvent: Event = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    imageUrl: ''
  };

  constructor(
    private eventService: EventService,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.errorMessage = 'Failed to load events';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  showAddForm() {
    this.isEditing = false;
    this.showForm = true;
    this.currentEvent = {
      title: '',
      description: '',
      date: '',
      location: '',
      category: '',
      imageUrl: ''
    };
    this.selectedFile = null;
    this.photoPreview = null;
  }

  editEvent(event: Event) {
    this.isEditing = true;
    this.showForm = true;
    this.currentEvent = { ...event };
    this.selectedFile = null;
    this.photoPreview = event.imageUrl || null;
  }

  cancelForm() {
    this.showForm = false;
    this.isEditing = false;
    this.currentEvent = {
      title: '',
      description: '',
      date: '',
      location: '',
      category: '',
      imageUrl: ''
    };
    this.selectedFile = null;
    this.photoPreview = null;
    this.errorMessage = '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validation = this.uploadService.validateImageFile(file);
      if (!validation.valid) {
        this.errorMessage = validation.error || 'Invalid file';
        this.selectedFile = null;
        this.photoPreview = null;
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveEvent() {
    this.isLoading = true;

    const eventToSave = { ...this.currentEvent };
    // Ensure seconds are included in the date string for backend compatibility
    if (eventToSave.date && eventToSave.date.length === 16) {
      eventToSave.date += ':00';
    }

    const formData = this.uploadService.createEventFormData(
      eventToSave,
      this.selectedFile || undefined
    );

    if (this.isEditing) {
      this.eventService.updateEvent(eventToSave.id!, formData).subscribe({
        next: (response) => {
          this.successMessage = 'Event updated successfully';
          this.loadEvents(); // Reload list
          this.cancelForm(); // Close form
          setTimeout(() => this.successMessage = '', 3000);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.errorMessage = 'Failed to update event';
          this.isLoading = false;
        }
      });
    } else {
      this.eventService.createEvent(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Event created successfully';
          this.loadEvents(); // Reload list
          this.cancelForm(); // Close form
          setTimeout(() => this.successMessage = '', 3000);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating event:', error);
          this.errorMessage = 'Failed to create event';
          this.isLoading = false;
        }
      });
    }
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.successMessage = 'Event deleted successfully';
          this.loadEvents();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to delete event';
        }
      });
    }
  }
}
