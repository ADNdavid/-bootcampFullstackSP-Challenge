import { Component, ViewChild } from '@angular/core';
import { ClientService } from 'src/services/client.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(ToastComponent) toast!:ToastComponent;

  constructor(private clientService: ClientService) { }

  windowName: string = '';
  user: any;  
  credentials: any = {
    username: null,
    password: null
  }

  loginFormVisible: boolean = false;
  profileVisible: boolean = false;
  toolsVisible: boolean = false;
  navBarVisible: boolean = false;
  logInOutIcon: string = 'logIn';


  loginFormSwitch() {
    this.loginFormVisible = !this.loginFormVisible;
  }

  logIn() {
    this.loginFormVisible = false;
    this.logInOutIcon = 'logOut';
    this.toolsVisible = true;
    this.user = this.credentials.username;
  }

  logOut() {
    this.logInOutIcon = 'logIn';
    this.toolsVisible = false;
    this.navBarVisible = false;
    this.user = null;
    localStorage.removeItem('token');
  }

  profileSwitch() {
    this.profileVisible = !this.profileVisible;
  }

  navBarSwitch() {
    this.navBarVisible = !this.navBarVisible;
  }

  correctlyCompletedForm(): boolean {
    if (this.credentials.username == null || this.credentials.username == '' || this.credentials.password == null || this.credentials.password == '') {
      return false;
    } else {
      return true;
    }
  }

  formSubmit() {
    if (this.correctlyCompletedForm()) {
      this.clientService.login(this.credentials).subscribe(
        (data) => {
          console.log(data);
          let token = JSON.parse(JSON.stringify(data))['token'];
          console.log(token);
          this.toast.alertMessage('Se ha iniciado sesión correctamente','success');
          localStorage.setItem('token', token);
          setTimeout(() => {
            if (localStorage.getItem('token') != '') {
              this.logIn();
              this.credentials.password = null;
              this.credentials.username = null;
            }
          }, 100);
        }, (error) => {
          console.log(error);
          this.toast.alertMessage('No se pudo iniciar sesión, verifica que las credenciales ingresadas sean correctas', 'error');
        }
      );
      
    } else {
      this.toast.alertMessage("Ingresa el campo requerido:",'warning');
    }
  }

}
