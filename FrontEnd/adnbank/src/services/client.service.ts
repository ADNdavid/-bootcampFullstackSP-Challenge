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

  public updateClient(client:any, id:number,){
    return this.httpClient.put(`${baseUrl}/v0/api/clients/`+id,client)
  }

  public getClientById(id:number){
    return this.httpClient.get(`${baseUrl}/v0/api/clients/`+id)
  }

  public deleteClientById(id:number){
    return this.httpClient.delete(`${baseUrl}/v0/api/clients/`+id)
  }

  public findAllClients(){
    return this.httpClient.get(`${baseUrl}/v0/api/clients/`)
  }
}
