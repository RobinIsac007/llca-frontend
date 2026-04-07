import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }

    createPastorFormData(pastor: {
        name: string;
        title: string;
        bio?: string;
        displayOrder?: number;
        isActive?: boolean;
    }, photo?: File): FormData {
        const formData = new FormData();

        formData.append('name', pastor.name);
        formData.append('title', pastor.title);

        if (pastor.bio) {
            formData.append('bio', pastor.bio);
        }

        if (pastor.displayOrder !== undefined) {
            formData.append('displayOrder', pastor.displayOrder.toString());
        }

        if (pastor.isActive !== undefined) {
            formData.append('isActive', pastor.isActive.toString());
        }

        if (photo) {
            formData.append('photo', photo, photo.name);
        }

        return formData;
    }

    createEventFormData(event: {
        title: string;
        description: string;
        date: string;
        location: string;
        category: string;
    }, photo?: File): FormData {
        const formData = new FormData();

        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('date', event.date);
        formData.append('location', event.location);
        formData.append('category', event.category);

        if (photo) {
            formData.append('photo', photo, photo.name);
        }

        return formData;
    }

    createMinistryFormData(ministry: {
        name: string;
        description?: string;
        leader?: string;
        meetingTime?: string;
    }, photo?: File): FormData {
        const formData = new FormData();

        formData.append('name', ministry.name);

        if (ministry.description) {
            formData.append('description', ministry.description);
        }

        if (ministry.leader) {
            formData.append('leader', ministry.leader);
        }

        if (ministry.meetingTime) {
            formData.append('meetingTime', ministry.meetingTime);
        }

        if (photo) {
            formData.append('photo', photo, photo.name);
        }

        return formData;
    }

    validateImageFile(file: File): { valid: boolean; error?: string } {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
        }

        if (file.size > maxSize) {
            return { valid: false, error: 'File size must be less than 5MB' };
        }

        return { valid: true };
    }
}
