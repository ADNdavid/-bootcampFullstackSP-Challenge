import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  ngOnInit(): void {
  }

  clientId: number = 0;
  activateFiels: boolean = true;

  public client: any = {
    client_id: null,
    type_of_identification: null,
    identification_number: null,
    name: null,
    lastname: null,
    e_mail: null,
    born_date: null,
    creation_date_of_the_account: null,
    creation_user: null,
    last_modification_date: null,
    last_modification_user: null
  }

  constructor(private clientService: ClientService) { }

  findClientById() {
    if (this.clientId > 0) {
      this.clientService.getClientById(this.clientId).subscribe(
        (data) => {
          console.log(data);
          alert('Cliente encontrado con exito.');
          this.client.client_id = JSON.parse(JSON.stringify(data))['client_id'];
          this.client.type_of_identification = JSON.parse(JSON.stringify(data))['type_of_identification'];
          this.client.identification_number = JSON.parse(JSON.stringify(data))['identification_number'];
          this.client.name = JSON.parse(JSON.stringify(data))['name'];
          this.client.lastname = JSON.parse(JSON.stringify(data))['lastname'];
          this.client.e_mail = JSON.parse(JSON.stringify(data))['e_mail'];
          this.client.born_date = JSON.parse(JSON.stringify(data))['born_date'];
          this.client.creation_date_of_the_account = JSON.parse(JSON.stringify(data))['creation_date_of_the_account'];
          this.client.creation_user = JSON.parse(JSON.stringify(data))['creation_user'];
          this.client.last_modification_date = JSON.parse(JSON.stringify(data))['last_modification_date'];
          this.client.last_modification_user = JSON.parse(JSON.stringify(data))['last_modification_user'];
        }, (error) => {
          console.log(error);
          alert('No se pudo encontrar el cliente');
        }
      )
    }
  }


  editInfo() {
    this.activateFiels = !this.activateFiels;
    console.log("el campo es: " + this.activateFiels);
  }


  /*revisar si esto de puede mover a un servico para envitar la reutilizacion de codigo*/
  calculateDate() {
    let date = new Date();

    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();
    let hour = `${(date.getHours())}`.padStart(2, '0');
    let minutes = `${(date.getMinutes())}`.padStart(2, '0');
    let seconds = `${(date.getSeconds())}`.padStart(2, '0');

    let currentDate: string = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;

    return currentDate;
  }

  /*adultChecker(): boolean {
    let born_date = new Date(this.client.born_date);
    let today = new Date();
    let difference = (today.getTime() - born_date.getTime()) * (1 / 1000) * (1 / 60) * (1 / 60) * (1 / 24);
    let minimumAgeInDays = (18 * 365) + 1;

    if (difference > minimumAgeInDays) {
      return true;
    } else {
      return false;
    }
  }*/

  correctlyCompletedForm(): boolean {
    if ((this.client.name == null || this.client.name.length < 2) ||
      (this.client.lastname == null || this.client.lastname.length < 2) ||
      (this.client.e_mail == null || this.client.e_mail.indexOf("@") == -1) /*||
      (this.client.type_of_identification.length == 0 || this.client.type_of_identification == null) ||
      (this.client.identification_number.length == 0 || this.client.identification_number == null) ||
      (this.client.born_date.length == 0 || this.client.born_date == null)*/
    ) {
      return false;
    } else {
      return true;
    }
  }

  formSubmit() {
    console.log(this.client);
    if (this.correctlyCompletedForm()) {
      /*if (this.adultChecker()) { */  
        this.client.last_modification_user = "newAdmin";
        this.client.last_modification_date = this.calculateDate();
        this.clientService.updateClient(this.client,this.clientId).subscribe(
          (data) => {
            console.log(data);
            alert('Cliente modificado con exito.');
          }, (error) => {
            console.log(error);
            alert('No se pudo modificar el cliente');
          }
        )
      /*} else {
        alert("no puedes editar la edad, eres menor de edad");
      }*/
    } else {
      alert("ingresa el campo requerido:");
    }
  }

  deleteClient(){
    this.clientService.deleteClientById(this.clientId).subscribe(
      (data) => {
        console.log(data);
        alert('Cliente eliminado con exito.');
      }, (error) => {
        console.log(error);
        alert('No se pudo eliminar el cliente');
      }
    )
  }  
}
