import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { InterfaceService } from "./interface.service";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export abstract class AbstractService<T> implements InterfaceService<T> {
    
    private readonly baseUrl: string = 'https://localhost:7196/api';
    
    protected abstract getEndpoint(): string;

    constructor(protected http: HttpClient) {}

    protected getApiUrl(): string {
        return `${this.baseUrl}${this.getEndpoint()}`;
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = "Erro deconhecido!";

        if (error.error instanceof ErrorEvent) {
            // Erro de client-side
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Erro de server-side
            if (error.status === 400) {
                var errorTable = error.error.table
                var errorField = error.error.field
                errorMessage = `Em "${errorTable}" já possui este ${errorField.toLowerCase()} cadastrado` || 'Ocorreu um erro ao processar sua solicitação';
                } else if (error.status === 500) {
                  errorMessage = `Erro interno no servidor`;  
                }
            }
        return throwError(() => new Error(errorMessage));
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.getApiUrl())
            .pipe(
                catchError(this.handleError)
            );
    }
    getById(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.getApiUrl()}/${id}`);
    }
    add(data: T): Observable<T> {
        return this.http.post<T>(this.getApiUrl(), data)
            .pipe(
                catchError(this.handleError)
            );
    }
    update(id: number | string, data: T): Observable<void> {
        return this.http.put<void>(`${this.getApiUrl()}/${id}`, data)
    }
    delete(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.getApiUrl()}/${id}`);
    }
}
