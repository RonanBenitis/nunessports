import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<any> {

  constructor(http: HttpClient) { 
    super(http);
  }

  protected getEndpoint(): string {
      return "/produto";
  }
}
