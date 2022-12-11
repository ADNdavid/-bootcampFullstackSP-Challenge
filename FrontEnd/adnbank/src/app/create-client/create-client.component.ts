import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit  {

  public client= {
    type_of_identification: '',
    identification_number: '',
    name: '',
    lastname: '',
    e_mail: '',
    born_date: '',
    creation_date_of_the_account: null,
    creation_user: "yo",
    last_modification_date: null,
    last_modification_user: ''

  }
  
  constructor(private clientService:ClientService){ }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.client);
    if(this.client.name == '' || this.client.name ==null ){
      alert("ingresa el campo requerido:")
    }

    this.clientService.createClient(this.client).subscribe(
      (data) =>{
        console.log(data);
        alert('Cleinte ingresado');
        },(error)=>{
        console.log(error);
        alert('no se pudo ingresar el usuario');
        }
    )
  }

}
