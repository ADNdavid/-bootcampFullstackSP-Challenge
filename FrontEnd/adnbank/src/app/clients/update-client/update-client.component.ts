import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  @Input()  currentUser:any;

  ngOnInit(): void {
  }

  clientId: number = 0;
  activateFiels_1: boolean = true;
  activateFiels_2: boolean = true;
  windowName:string='';

  products: Array<any> = [];

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
          this.activateFiels_1 = false;
        }, (error) => {
          console.log(error);
          alert('No se pudo encontrar el cliente');
          this.cleanForm();
        }
      );      
    }
  }


  editInfo() {
    this.activateFiels_2 = !this.activateFiels_2;
    console.log("el campo es: " + this.activateFiels_2);
    this.getProducts();
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
      this.client.last_modification_user = this.currentUser;
      this.client.last_modification_date = this.calculateDate();
      this.clientService.updateClient(this.client, this.clientId).subscribe(
        (data) => {
          console.log(data);
          alert('Cliente modificado con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo modificar el cliente');
        }
      );
      /*} else {
        alert("no puedes editar la edad, eres menor de edad");
      }*/
    } else {
      alert("ingresa el campo requerido:");
    }
  }

  deleteClient() {
    if (this.productCancelledChecker()) {
      this.clientService.deleteClientById(this.clientId).subscribe(
        (data) => {
          console.log(data);
          alert('Cliente eliminado con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo eliminar el cliente');
        }
      );
      this.cleanForm();      
    }
  }
  
  getProducts() {
    this.products.shift();
    this.clientService.findProducts(this.client.identification_number).subscribe(
      (data) => {
        this.products.push(data);
        console.log(this.products);
      }, (error) => {
        console.log(error);
      }
    )
  }
  productCancelledChecker(): boolean {
    let condition: boolean = false;
    if (this.products[0].length === 0) {
      console.log(this.products[0].length);
      condition = true;
      return condition;
    } else {
      for (let product of this.products[0]) {
        if (product['state'] != "Cancelada") {
          alert('El cliente aún posee productos activos o inactivos.');
          condition = false;
          return condition;
        } else {
          condition = true;
          return condition;
        }
      }
    }    
    return condition;
  }

  cleanForm(){
    //Cleaner Forms
    this.activateFiels_1 = true;
    this.activateFiels_2 = true;
    this.client.client_id = null;
    this.client.type_of_identification = null;
    this.client.identification_number = null;
    this.client.name = null;
    this.client.lastname = null;
    this.client.e_mail = null;
    this.client.born_date = null;
    this.client.creation_date_of_the_account = null;
    this.client.creation_user = null;
    this.client.last_modification_date = null;
    this.client.last_modification_user = null;
  }

  @Output() windowSwitch= new EventEmitter<string>();

    closeWindow():void{
      this.windowSwitch.emit();
      this.cleanForm();
    }

    openWindow(windowComponentName: string){
      this.windowName=windowComponentName;
    }
    
}
