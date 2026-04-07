import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ministry, MinistryService } from '../../../services/ministry.service';
import { UploadService } from '../../../services/upload.service';

@Component({
    selector: 'app-manage-ministries',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './manage-ministries.component.html',
    styleUrl: './manage-ministries.component.css'
})
export class ManageMinistriesComponent implements OnInit {
    ministries: Ministry[] = [];
    currentMinistry: any = { name: '', description: '', leader: '', meetingTime: '', imageUrl: '' };
    showForm = false;
    isEditing = false;
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    selectedFile: File | null = null;
    photoPreview: string | null = null;

    constructor(
        private ministryService: MinistryService,
        private uploadService: UploadService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadMinistries();
    }

    loadMinistries() {
        this.isLoading = true;
        this.ministryService.getAllMinistries().subscribe({
            next: (response) => {
                if (response.success) {
                    this.ministries = response.data;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading ministries', error);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    showAddForm() {
        this.showForm = true;
        this.isEditing = false;
        this.currentMinistry = { name: '', description: '', leader: '', meetingTime: '', imageUrl: '' };
        this.selectedFile = null;
        this.photoPreview = null;
    }

    editMinistry(ministry: Ministry) {
        this.showForm = true;
        this.isEditing = true;
        this.currentMinistry = { ...ministry };
        this.selectedFile = null;
        this.photoPreview = ministry.imageUrl || null;
    }

    cancelForm() {
        this.showForm = false;
        this.currentMinistry = { name: '', description: '', leader: '', meetingTime: '', imageUrl: '' };
        this.selectedFile = null;
        this.photoPreview = null;
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

    saveMinistry() {
        this.isLoading = true;

        const formData = this.uploadService.createMinistryFormData(
            this.currentMinistry,
            this.selectedFile || undefined
        );

        if (this.isEditing) {
            this.ministryService.updateMinistry(this.currentMinistry.id, formData).subscribe({
                next: (response) => {
                    this.successMessage = 'Ministry updated successfully';
                    this.loadMinistries();
                    this.cancelForm();
                    setTimeout(() => this.successMessage = '', 3000);
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error updating ministry', error);
                    this.errorMessage = 'Failed to update ministry';
                    this.isLoading = false;
                }
            });
        } else {
            this.ministryService.createMinistry(formData).subscribe({
                next: (response) => {
                    this.successMessage = 'Ministry created successfully';
                    this.loadMinistries();
                    this.cancelForm();
                    setTimeout(() => this.successMessage = '', 3000);
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error creating ministry', error);
                    this.errorMessage = 'Failed to create ministry';
                    this.isLoading = false;
                }
            });
        }
    }

    deleteMinistry(id: number) {
        if (confirm('Are you sure you want to delete this ministry?')) {
            this.ministryService.deleteMinistry(id).subscribe({
                next: (response) => {
                    this.successMessage = 'Ministry deleted successfully';
                    this.loadMinistries();
                    setTimeout(() => this.successMessage = '', 3000);
                },
                error: (error) => {
                    console.error('Error deleting ministry', error);
                    this.errorMessage = 'Failed to delete ministry';
                }
            });
        }
    }
}
