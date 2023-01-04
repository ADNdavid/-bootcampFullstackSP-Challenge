import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  message: string = '';
  statusIcon: string = '';
  toastVisible: boolean = false;
  borderColor:string='';

  alertMessage(message: string, type_alert: string): void {
    this.message = message;
    this.toastVisible = true;
    if (type_alert === "warning") {
      this.statusIcon = 'warning';
      this.borderColor='#FFCC4D';
    } else if (type_alert === "success") {
      this.statusIcon = 'success';
      this.borderColor= '#06D6A0';
    } else if (type_alert === "error") {
      this.statusIcon = 'error';
      this.borderColor='#E63946';
    }
    setTimeout(() => {
      this.toastVisible = false;
    }, 3800);
  }

}
