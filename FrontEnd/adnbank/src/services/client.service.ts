import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ClientService { 

  constructor(private httpClient:HttpClient) { }

  //Client request
  public createClient(client:any){
    return this.httpClient.post(`${baseUrl}/v0/api/clients`,client);
  }

  public updateClient(client:any, id:number,){
    return this.httpClient.put(`${baseUrl}/v0/api/clients/`+id,client);
  }

  public getClientById(id:number){
    return this.httpClient.get(`${baseUrl}/v0/api/clients/`+id);
  }

  public deleteClientById(id:number){
    return this.httpClient.delete(`${baseUrl}/v0/api/clients/`+id);
  }

  public findAllClients(){
    return this.httpClient.get(`${baseUrl}/v0/api/clients/`);
  }

  //Product request
  public createProduct(product:any){
    return this.httpClient.post(`${baseUrl}/v0/api/products`, product);
  }

  public findProducts(clientOwner:string){
    return this.httpClient.get(`${baseUrl}/v0/api/products/client/`+clientOwner);
  }

  public findProductByAccountNumber(accountNumber:number){
    return this.httpClient.get(`${baseUrl}/v0/api/products/`+accountNumber);
  }

  public updateProduct(product:any, accountNumber:number,){
    return this.httpClient.put(`${baseUrl}/v0/api/products/`+accountNumber,product);
  }

  //Movement request
  public createMovement(financialMovement:any){
    return this.httpClient.post(`${baseUrl}/v0/api/movements`, financialMovement);
  }

  public findMovementsByAccountNumber(accountNumber:number){
    return this.httpClient.get(`${baseUrl}/v0/api/movements/`+accountNumber);
  }

  //User request
  public login(user:any){
    return this.httpClient.post(`${baseUrl}/v0/api/login`, user);
  }
}
