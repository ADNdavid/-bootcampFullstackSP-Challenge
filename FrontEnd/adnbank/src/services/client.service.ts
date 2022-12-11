import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 

  constructor(private httpClient:HttpClient) { }

  public createClient(client:any){
    return this.httpClient.post(`${baseUrl}/v0/api/clients`,client)
  }
}
