import { transition } from '@angular/animations';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() clientOwner: any;
  @Input() currentUser:any;

  deactivateInputs: boolean = true;
  windowName:string='';

  public productToUpdate: any = {
    type_of_account: null,
    account_number: null,
    state: null,
    exempt_of_gmf: null,
    last_modification_date: null,
    last_modification_user: null,
  }

  products: Array<any> = [];

  ngOnInit() {
  }

  constructor(private clientService: ClientService) { }

  showProducts() {
    this.products.shift();
    this.clientService.findProducts(this.clientOwner).subscribe(
      (data) => {
        console.log(data);
        this.products.push(data);
        console.log(this.products);
      }, (error) => {
        console.log(error);
      }
    )
  }

  getProductToChange(accountNumber: number) {
    this.productToUpdate.account_number = accountNumber;
    console.log(accountNumber);

    this.clientService.findProductByAccountNumber(accountNumber).subscribe(
      (data) => {
        console.log(data);
        this.productToUpdate.type_of_account = JSON.parse(JSON.stringify(data))['type_of_account'];
        this.productToUpdate.state = JSON.parse(JSON.stringify(data))['state'];
        this.productToUpdate.current_balance = JSON.parse(JSON.stringify(data))['current_balance'];
        this.productToUpdate.available_balance = JSON.parse(JSON.stringify(data))['available_balance'];
        this.productToUpdate.exempt_of_gmf = JSON.parse(JSON.stringify(data))['exempt_of_gmf'];
      }, (error) => {
        console.log(error);
      }
    );
    this.deactivateInputs = !this.deactivateInputs;
  }


  /*Revisar si este metodo se puede mover a otro lugar ya que se esta reutilizando*/
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

  changeStatus() {
    if (this.productToUpdate.state === "Cancelada") {
      alert("El producto se encuentra cancelado, no se puede realizar esta acción");
    } else {
      if (this.productToUpdate.state === 'Activa') {
        this.productToUpdate.state = 'Inactiva';
      } else if (this.productToUpdate.state === "Inactiva") {
        this.productToUpdate.state = 'Activa';
      }

      this.productToUpdate.last_modification_date = this.calculateDate();
      this.productToUpdate.last_modification_user = this.currentUser;

      this.clientService.updateProduct(this.productToUpdate, this.productToUpdate.account_number).subscribe(
        (data) => {
          console.log(data);
          alert('producto actalizado con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo modificar el producto');
        }
      );
      alert("el producto ha sido " + this.productToUpdate.state + "do con exito.")
      this.showProducts();
    }
  }

  cancelProduct() {
    if (this.productToUpdate.state === "Cancelada") {
      alert("El producto ya se encuentra cancelado, no se puede realizar esta acción");
    } else {
      if (this.productToUpdate.current_balance >= 1) {
        alert("El producto cuenta con un saldo positivo de: $" + this.productToUpdate.current_balance + " por lo que no puede cancelarlo");
      } else if (this.productToUpdate.current_balance < 0) {
        alert("El producto cuenta con un saldo negativo de: $" + this.productToUpdate.current_balance + " por lo que no puede cancelarlo");
      } else if (this.productToUpdate.current_balance >= 0 && this.productToUpdate.current_balance < 1) {

        this.productToUpdate.state = "Cancelada";
        this.productToUpdate.exempt_of_gmf = "false";
        this.productToUpdate.last_modification_date = this.calculateDate();
        this.productToUpdate.last_modification_user = this.currentUser;

        this.clientService.updateProduct(this.productToUpdate, this.productToUpdate.account_number).subscribe(
          (data) => {
            console.log(data);
            alert('producto actalizado con exito.');
          }, (error) => {
            console.log(error);
            alert('No se pudo modificar el producto');
          }
        );
        alert("el producto ha sido cancelado con exito.");
        this.showProducts();
      }
    }
  }

  untaxMark() {
    if (this.productToUpdate.state === "Cancelada") {
      alert("El producto se encuentra cancelado, no se puede realizar esta acción");
    } else if (this.productToUpdate.type_of_account === "Corriente") {
      alert("Las cuentas corrientes no cuentan con este beneficio, no se puede realizar esta acción");
    } else if (this.productToUpdate.type_of_account === "Ahorros") {
      if (this.productToUpdate.exempt_of_gmf === true) {
        alert("La cuenta ya cuentan con este beneficio, no se puede realizar esta acción");
      } else {
        for (let product of this.products[0]) {
          if (product['exempt_of_gmf'] === true) {

            product['exempt_of_gmf'] = false;
            product['last_modification_date'] = this.calculateDate();
            product['last_modification_user'] = this.currentUser;

            this.clientService.updateProduct(product, product['account_number']).subscribe(
              (data) => {
                console.log(data);
              }, (error) => {
                console.log(error);
              }
            );
            break;
          }
        }

        this.productToUpdate.exempt_of_gmf = true;
        this.productToUpdate.last_modification_date = this.calculateDate();
        this.productToUpdate.last_modification_user = this.currentUser;

        this.clientService.updateProduct(this.productToUpdate, this.productToUpdate.account_number).subscribe(
          (data) => {
            console.log(data);
          }, (error) => {
            console.log(error);
          }
        );
        alert("La cuenta ha sido marcada con exito.");
        this.showProducts();
      }
    }
  }

  @Output() windowSwitch = new EventEmitter<string>();

  closeWindow(): void {
    this.windowSwitch.emit();
  }

  openWindow(windowComponentName: string){
    this.windowName=windowComponentName;
  }

}