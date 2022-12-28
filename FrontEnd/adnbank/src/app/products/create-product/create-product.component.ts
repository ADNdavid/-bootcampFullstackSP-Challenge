import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  @Input() clientOwner: any;
  @Input() currentUser:any;

  constructor(private clientService: ClientService) { }

  type_of_account: string = "";
  accountNumber: number = 0;
  activateFiels: boolean = true;
  exemptGMF: boolean = false;

  products: Array<any> = [];

  public product: any = {
    type_of_account: null,
    account_number: null,
    state: null,
    current_balance: null,
    available_balance: null,
    exempt_of_gmf: null,
    creation_date_of_the_account: null,
    creation_user: null,
    last_modification_date: null,
    last_modification_user: null,
    client_owner: null
  }

  generateAccountNumber(): number {
    let prefix: string = "";
    let suffix: string = "";
    const NUMBER_LENGHT: number = 8;

    for (let i = 1; i <= NUMBER_LENGHT; i++) {
      suffix += (Math.round(Math.random() * 9)).toString();
    }
    if (this.type_of_account === "Ahorros") {
      prefix = "46";
      this.activateFiels = false;
    } else if (this.type_of_account === "Corriente") {
      prefix = "23";
      this.activateFiels = true;
      this.exemptGMF = false;
    }
    console.log(this.type_of_account);
    console.log(this.exemptGMF);
    this.accountNumber = parseInt(prefix + suffix);
    return this.accountNumber;
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

  correctlyCompletedForm(): boolean {
    if ((this.type_of_account == null || this.type_of_account.length < 7) ||
      (this.accountNumber === 0)
    ) {
      return false;
    } else {
      return true;
    }
  }

  gmfSwitch() {
    this.exemptGMF = !this.exemptGMF;
    this.getProducts();
  }

  formSubmit() {
    console.log(this.product);
    if (this.correctlyCompletedForm()) {
      this.product.type_of_account = this.type_of_account;
      this.product.account_number = this.accountNumber;
      this.product.state = "Activa";
      this.product.current_balance = 0;
      this.product.available_balance = 0;
      this.product.exempt_of_gmf = this.taxChecker();
      this.product.creation_user = this.currentUser;
      this.product.creation_date_of_the_account = this.calculateDate();
      this.product.last_modification_user = this.currentUser;
      this.product.last_modification_date = this.calculateDate();
      this.product.client_owner = this.clientOwner;
      this.clientService.createProduct(this.product).subscribe(
        (data) => {
          console.log(data);
          alert('Cuenta creada con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo crear la Cuenta');
        }
      )

    } else {
      alert("Selecciona el producto a crear:");
    }
  }

  getProducts() {
    this.products.shift();
    this.clientService.findProducts(this.clientOwner).subscribe(
      (data) => {
        this.products.push(data);
        console.log(this.products);
      }, (error) => {
        console.log(error);
      }
    )
  }

  taxChecker(): boolean {
    if (this.products[0].length === 0) {
      console.log(this.products[0].length);
      this.exemptGMF = true;
      return this.exemptGMF;
    } else {
      for (let product of this.products[0]) {
        if (product['exempt_of_gmf'] === true) {
          alert("El cliente ya posee un producto exento de GMF \n Esto puede modificarse en el gestor de productos");
          this.exemptGMF = false;
          return this.exemptGMF;
        } else {
          this.exemptGMF = true;
          return this.exemptGMF;
        }
      }
    }
    return this.exemptGMF;
  }

  @Output() windowSwitch= new EventEmitter<string>();

    closeWindow():void{
      this.windowSwitch.emit();
      this.product.type_of_account = null;
      this.product.account_number = null;
      this.product.state = null;
      this.product.current_balance = null;
      this.product.available_balance = null;
      this.product.exempt_of_gmf = null;
      this.product.creation_user = null;
      this.product.creation_date_of_the_account = null;
      this.product.last_modification_user = null;
      this.product.last_modification_date = null;
      this.product.client_owner = null;
    }
}
