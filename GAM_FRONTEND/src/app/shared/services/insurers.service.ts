import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Insurer } from '../interfaces/insurer.interface';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {
  private url = 'http://localhost:3003/insurers';

  constructor(private httpClient: HttpClient) { }

  public getInsurers() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.httpClient.get(`${this.url}/all`, httpOptions);
  }

  public async addInsurer(insurer: Insurer) {
    const response = await Http.request({
      method: 'POST',
      url: this.url,
      headers: { 'Content-Type': 'application/json' },
      data: insurer,
    });

    return response;
  }

  public async updateInsurer(id: string, insurer: Insurer) {
    try {
      const response = await Http.request({
        method: 'PUT',
        url: `http://localhost:3003/insurers/update/${id}`, 
        headers: { 'Content-Type': 'application/json' },
        data: insurer
      });
  
      console.log('Insurer updated successfully:', response);
  
      return response.data; 
    } catch (error) {
      console.error('Error updating insurer:', error);
      throw error;
    }
  }

  public async deleteInsurer(id: string) {
    const response = await Http.request({
      method: 'DELETE',
      url: `http://localhost:3003/insurers/delete/${id}`,
      headers: { 'Content-Type': 'application/json' }
      
    });
    return response; 
}

public getInsurerById(id: string) {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  return this.httpClient.get<Insurer>(`${this.url}/${id}`, httpOptions);
}


}
  
