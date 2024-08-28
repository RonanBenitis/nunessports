import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InterfaceService } from "./interface.service";


export abstract class AbstractService<T> implements InterfaceService<T> {
    
    private readonly baseUrl: string = 'https://localhost:7196/api';
    
    protected abstract getEndpoint(): string;

    constructor(protected http: HttpClient) {}

    protected getApiUrl(): string {
        return `${this.baseUrl}${this.getEndpoint()}`;
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.getApiUrl());
    }
    getById(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.getApiUrl()}/${id}`);
    }
    add(data: T): Observable<T> {
        return this.http.post<T>(this.getApiUrl(), data);
    }
    update(id: number | string, data: T): Observable<void> {
        return this.http.put<void>(`${this.getApiUrl()}/${id}`, data)
    }
    delete(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.getApiUrl()}/${id}`);
    }
}
