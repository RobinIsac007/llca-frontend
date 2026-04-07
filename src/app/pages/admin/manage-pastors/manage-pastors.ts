import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PastorService, Pastor } from '../../../services/pastor.service';
import { UploadService } from '../../../services/upload.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-pastors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-pastors.html',
  styleUrl: './manage-pastors.css',
})
export class ManagePastorsComponent implements OnInit {
  pastors: Pastor[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Form state
  showForm = false;
  isEditing = false;
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  currentPastor: Pastor = {
    name: '',
    title: '',
    bio: '',
    displayOrder: 0,
    isActive: true
  };

  constructor(
    private pastorService: PastorService,
    private uploadService: UploadService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPastors();
  }

  loadPastors(): void {
    this.isLoading = true;
    this.errorMessage = 'Fetching pastors... check console';
    console.log('Starting loadPastors...');
    this.pastorService.getAllPastors().subscribe({
      next: (response) => {
        console.log('Response received:', response);
        if (response.success) {
          this.pastors = response.data;
          console.log('Pastors loaded:', this.pastors.length);
        } else {
          console.warn('Response success is false');
          this.errorMessage = 'Backend returned success: false';
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading pastors:', error);
        this.errorMessage = 'Failed to load pastors: ' + (error.message || 'Unknown error');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  showAddForm(): void {
    this.isEditing = false;
    this.showForm = true;
    this.currentPastor = {
      name: '',
      title: '',
      bio: '',
      displayOrder: this.pastors.length + 1,
      isActive: true
    };
    this.selectedFile = null;
    this.photoPreview = null;
  }

  editPastor(pastor: Pastor): void {
    this.isEditing = true;
    this.showForm = true;
    this.currentPastor = { ...pastor };
    this.selectedFile = null;
    this.photoPreview = pastor.photoUrl || null;
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.currentPastor = {
      name: '',
      title: '',
      bio: '',
      displayOrder: 0,
      isActive: true
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

  savePastor(): void {
    if (!this.currentPastor.name || !this.currentPastor.title) {
      this.errorMessage = 'Name and title are required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.uploadService.createPastorFormData(
      {
        name: this.currentPastor.name,
        title: this.currentPastor.title,
        bio: this.currentPastor.bio,
        displayOrder: this.currentPastor.displayOrder,
        isActive: this.currentPastor.isActive
      },
      this.selectedFile || undefined
    );

    const request = this.isEditing
      ? this.pastorService.updatePastor(this.currentPastor.id!, formData)
      : this.pastorService.createPastor(formData);

    request.subscribe({
      next: (response) => {
        console.log('Save response:', response);
        if (response.success) {
          this.successMessage = this.isEditing ? 'Pastor updated successfully' : 'Pastor created successfully';
          this.loadPastors();
          this.cancelForm();
          setTimeout(() => this.successMessage = '', 3000);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error saving pastor:', error);
        this.errorMessage = 'Failed to save: ' + (error.error?.message || error.message || 'Unknown error');
        this.isLoading = false;
      }
    });
  }

  deletePastor(pastor: Pastor): void {
    if (!confirm(`Are you sure you want to delete ${pastor.name}?`)) {
      return;
    }

    this.isLoading = true;
    this.pastorService.deletePastor(pastor.id!).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Pastor deleted successfully';
          this.loadPastors();
          setTimeout(() => this.successMessage = '', 3000);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting pastor:', error);
        this.errorMessage = 'Failed to delete pastor';
        this.isLoading = false;
      }
    });
  }

  toggleStatus(pastor: Pastor): void {
    this.pastorService.togglePastorStatus(pastor.id!).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Pastor status updated';
          this.loadPastors();
          setTimeout(() => this.successMessage = '', 3000);
        }
      },
      error: (error) => {
        console.error('Error toggling status:', error);
        this.errorMessage = 'Failed to update status';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
