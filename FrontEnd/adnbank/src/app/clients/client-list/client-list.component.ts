import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

clients:Array<any>=[];

ngOnInit(): void {
  this.clients.shift();
  this.clientService.findAllClients().subscribe(
    (data) => {
      console.log(data);
      this.clients.push(data);
      console.log(this.clients);   
    }, (error) => {
      console.log(error);      
    }
  )
}

constructor(private clientService: ClientService) { }

@Output() windowSwitch= new EventEmitter<string>();

    closeWindow():void{
      this.windowSwitch.emit();
    }
}
