import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'auth_token';
    private userKey = 'current_user';

    private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    public authState$ = this.authStateSubject.asObservable();

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<ApiResponse<AuthResponse>> {
        return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setToken(response.data.token);
                        this.setUser({
                            id: response.data.id,
                            username: response.data.username,
                            email: response.data.email,
                            role: response.data.role
                        });
                        this.authStateSubject.next(true);
                    }
                })
            );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.authStateSubject.next(false);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    private setUser(user: User): void {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getMe(): Observable<ApiResponse<User>> {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`);
    }
}
