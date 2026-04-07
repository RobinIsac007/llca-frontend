import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pastor {
    id?: number;
    name: string;
    title: string;
    bio?: string;
    photoUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class PastorService {
    private apiUrl = 'http://localhost:8080/api/pastors';

    constructor(private http: HttpClient) { }

    getAllPastors(): Observable<ApiResponse<Pastor[]>> {
        return this.http.get<ApiResponse<Pastor[]>>(`${this.apiUrl}/all`);
    }

    getActivePastors(): Observable<ApiResponse<Pastor[]>> {
        return this.http.get<ApiResponse<Pastor[]>>(this.apiUrl);
    }

    getPastorById(id: number): Observable<ApiResponse<Pastor>> {
        return this.http.get<ApiResponse<Pastor>>(`${this.apiUrl}/${id}`);
    }

    createPastor(formData: FormData): Observable<ApiResponse<Pastor>> {
        return this.http.post<ApiResponse<Pastor>>(this.apiUrl, formData);
    }

    updatePastor(id: number, formData: FormData): Observable<ApiResponse<Pastor>> {
        return this.http.put<ApiResponse<Pastor>>(`${this.apiUrl}/${id}`, formData);
    }

    deletePastor(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    togglePastorStatus(id: number): Observable<ApiResponse<Pastor>> {
        return this.http.patch<ApiResponse<Pastor>>(`${this.apiUrl}/${id}/toggle`, {});
    }
}
