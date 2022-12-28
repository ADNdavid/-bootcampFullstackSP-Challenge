import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  windowName:string='';
  user:any;


  loginFormVisible:boolean=false;
  profileVisible:boolean=false;
  toolsVisible:boolean=false;
  navBarVisible:boolean=false;
  logInOutIcon:string='logIn';
  

  loginFormSwitch(){
    this.loginFormVisible=!this.loginFormVisible;
  }

  logIn(){
    this.loginFormVisible=false;
    this.logInOutIcon='logOut';
    this.toolsVisible=true;
    this.user='ADNadmin';
  }

  logOut(){
    this.logInOutIcon='logIn';
    this.toolsVisible=false;
    this.navBarVisible=false;
    this.user=null;
  }

  profileSwitch(){
    this.profileVisible=!this.profileVisible;
  }

  navBarSwitch(){
    this.navBarVisible=!this.navBarVisible;
  }

}
