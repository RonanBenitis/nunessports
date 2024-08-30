import { Observable } from "rxjs";

export interface InterfaceService<T> {
    getAll(): Observable<T[]>;
    getById(id: number | string): Observable<T>;
    add(data: T): Observable<T>;
    update(id: number | string, data: T): Observable<void>;
    delete(id: number | string): Observable<void>;
}