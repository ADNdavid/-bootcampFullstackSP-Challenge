import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

@Output() windowSwitch= new EventEmitter<string>();

openWindow(windowComponentName: string){
  this.windowSwitch.emit(windowComponentName);
}

}
