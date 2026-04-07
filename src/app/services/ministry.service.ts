import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ministry {
    id: number;
    name: string;
    description: string;
    leader: string;
    meetingTime: string;
    imageUrl: string;
}

interface ApiResponse {
    success: boolean;
    data: Ministry[];
}

@Injectable({
    providedIn: 'root'
})
export class MinistryService {
    private apiUrl = 'http://localhost:8080/api/ministries';

    constructor(private http: HttpClient) { }

    getAllMinistries(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiUrl);
    }

    createMinistry(ministry: any | FormData): Observable<any> {
        return this.http.post(this.apiUrl, ministry);
    }

    updateMinistry(id: number, ministry: any | FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, ministry);
    }

    deleteMinistry(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
