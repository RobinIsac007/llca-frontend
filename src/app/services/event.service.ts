import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    imageUrl: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8080/api/events';

    constructor(private http: HttpClient) { }

    getAllEvents(): Observable<Event[]> {
        return this.http.get<ApiResponse<Event[]>>(this.apiUrl)
            .pipe(map(response => response.data));
    }

    getEventsByCategory(category: string): Observable<Event[]> {
        return this.http.get<ApiResponse<Event[]>>(`${this.apiUrl}?category=${category}`)
            .pipe(map(response => response.data));
    }

    getEventById(id: number): Observable<Event> {
        return this.http.get<ApiResponse<Event>>(`${this.apiUrl}/${id}`)
            .pipe(map(response => response.data));
    }

    createEvent(event: any | FormData): Observable<Event> {
        return this.http.post<ApiResponse<Event>>(this.apiUrl, event)
            .pipe(map(response => response.data));
    }

    updateEvent(id: number, event: any | FormData): Observable<Event> {
        return this.http.put<ApiResponse<Event>>(`${this.apiUrl}/${id}`, event)
            .pipe(map(response => response.data));
    }

    deleteEvent(id: number): Observable<void> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
            .pipe(map(response => response.data));
    }
}
