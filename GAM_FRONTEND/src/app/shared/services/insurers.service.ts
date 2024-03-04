import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Insurer } from '../interfaces/insurer.interface';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {
  private url = 'http://localhost:3003/insurers/';

  constructor(private httpClient: HttpClient) { }

  public getInsurers() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.httpClient.get(`${this.url}/all`, httpOptions);
  }

  public addInsurer(insurer: Insurer) {
    return this.httpClient.post(this.url, insurer, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}
