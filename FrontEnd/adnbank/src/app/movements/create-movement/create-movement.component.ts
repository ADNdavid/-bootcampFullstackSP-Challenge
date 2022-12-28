import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.css']
})
export class CreateMovementComponent {
  @Input() currentUser:any;
  
  constructor(private clientService: ClientService) { }

  type_of_transaction: string = "";
  accountNumber: number = 0;
  deactivateOriginInput: boolean = true;
  deactivateTargetInput: boolean = true;
  exemptGMF: boolean = false;

  public movement: any = {
    movement_date: null,
    type_of_transaction: null,
    description: null,
    type_of_movement: null,
    amount: null,
    current_balance: null,
    available_balance: null,
    origin_product: null,
    target_product: null,
    creation_user: null,
    successful_transaction: null
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
    if ((this.type_of_transaction === '') || (this.movement.amount < 1)) {
      return false;
    } else if ((this.type_of_transaction === 'Consignación') && (this.movement.target_product === null)) {
      return false;
    } else if ((this.type_of_transaction === 'Retiro') && (this.movement.origin_product === null)) {
      return false;
    } else if ((this.type_of_transaction === 'Transferencia') && 
                (((this.movement.origin_product === null) || (this.movement.target_product === null)) || 
                  (this.movement.origin_product === this.movement.target_product))) {
      return false;
    } else {
      return true;
    }
  }

  public originProduct: any = {
    type_of_account: null,
    account_number: null,
    state: null,
    current_balance: null,
    available_balance: null,
    exempt_of_gmf: null,
    last_modification_date: null,
    last_modification_user: null,
  }

  public targetProduct: any = {
    type_of_account: null,
    account_number: null,
    state: null,
    current_balance: null,
    available_balance: null,
    exempt_of_gmf: null,
    last_modification_date: null,
    last_modification_user: null,
  }

  getOriginProduct(): any {
    this.clientService.findProductByAccountNumber(this.movement.origin_product).subscribe(
      (data) => {
        console.log(data);
        this.originProduct.type_of_account = JSON.parse(JSON.stringify(data))['type_of_account'];
        this.originProduct.account_number = JSON.parse(JSON.stringify(data))['account_number'];
        this.originProduct.state = JSON.parse(JSON.stringify(data))['state'];
        this.originProduct.current_balance = JSON.parse(JSON.stringify(data))['current_balance'];
        this.originProduct.available_balance = JSON.parse(JSON.stringify(data))['available_balance'];
        this.originProduct.exempt_of_gmf = JSON.parse(JSON.stringify(data))['exempt_of_gmf'];
        console.log("la cuenta esta:" + this.originProduct.state);
      }, (error) => {
        console.log(error);
      }
    );
  }

  getTargetProduct(): any {
    this.clientService.findProductByAccountNumber(this.movement.target_product).subscribe(
      (data) => {
        console.log(data);
        this.targetProduct.account_number = JSON.parse(JSON.stringify(data))['account_number'];
        this.targetProduct.state = JSON.parse(JSON.stringify(data))['state'];
        this.targetProduct.current_balance = JSON.parse(JSON.stringify(data))['current_balance'];
        this.targetProduct.available_balance = JSON.parse(JSON.stringify(data))['available_balance'];
        this.targetProduct.exempt_of_gmf = JSON.parse(JSON.stringify(data))['exempt_of_gmf'];
        console.log("la cuenta esta:" + this.targetProduct.state);
      }, (error) => {
        console.log(error);
      }
    );
  }


  deposit() {
    if (this.targetProduct.state === null || this.targetProduct.state === 'Cancelada') {
      alert("No es posible realizar la consignación");

    } else {
      let newBalance: number = this.targetProduct.current_balance + this.movement.amount;
      this.targetProduct.current_balance = newBalance;
      if (this.targetProduct.exempt_of_gmf === true) {
        this.targetProduct.available_balance = newBalance;
      } else {
        this.targetProduct.available_balance = newBalance - newBalance * (4 / 1000);
      }

      this.targetProduct.last_modification_date = this.calculateDate();
      this.targetProduct.last_modification_user = this.currentUser;

      this.clientService.updateProduct(this.targetProduct, this.movement.target_product).subscribe(
        (data) => {
          console.log(data);
          alert('producto actalizado con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo modificar el producto');
        }
      );

      this.movement.movement_date = this.calculateDate();
      this.movement.type_of_transaction = this.type_of_transaction;
      this.movement.type_of_movement = "Crédito";
      this.movement.current_balance = this.targetProduct.current_balance;
      this.movement.available_balance = this.targetProduct.available_balance;
      this.movement.creation_user = this.currentUser;
      this.movement.successful_transaction = true;
      this.clientService.createMovement(this.movement).subscribe(
        (data) => {
          console.log(data);
          alert('transacción realizada con exito.');
        }, (error) => {
          console.log(error);
          alert('No se pudo realizar la transación');
        }
      );
    }
  }

  withdraw() {
    if (this.originProduct.state === null || this.originProduct.state === 'Cancelada' || this.originProduct.state === 'Inactiva') {
      alert("No es posible realizar el retiro");

    } else {
      let newBalance: number;
      let taxAmount: number;

      if (this.originProduct.exempt_of_gmf === false) {
        taxAmount = this.movement.amount * (4 / 1000);
      } else {
        taxAmount = 0;
      }

      if (this.originProduct.exempt_of_gmf === true && this.originProduct.type_of_account === 'Ahorros') {
        newBalance = this.originProduct.current_balance - this.movement.amount;

        if (newBalance < 0) {
          alert("No es posible realizar el retiro, fondos insuficientes");
          this.movement.successful_transaction = false;
        } else {
          this.originProduct.current_balance = newBalance;
          this.originProduct.available_balance = newBalance;
          this.movement.successful_transaction = true;
        }
      } else if (this.originProduct.type_of_account === 'Corriente') {
        const CREDITLIMIT: number = -3000000;

        newBalance = this.originProduct.current_balance - this.movement.amount - taxAmount;

        if (newBalance < CREDITLIMIT) {
          alert("No es posible realizar el retiro, fondos insuficientes");
          this.movement.successful_transaction = false;
        } else {
          this.originProduct.current_balance = newBalance;
          this.originProduct.available_balance = newBalance - newBalance * (4 / 1000);
          this.movement.successful_transaction = true;
        }
      } else if (this.originProduct.exempt_of_gmf === false && this.originProduct.type_of_account === 'Ahorros') {
        newBalance = this.originProduct.current_balance - this.movement.amount - taxAmount;

        if (newBalance <= 0) {
          alert("No es posible realizar el retiro, fondos insuficientes");
          this.movement.successful_transaction = false;
        } else {
          this.originProduct.current_balance = newBalance;
          this.originProduct.available_balance = newBalance - newBalance * (4 / 1000);
          this.movement.successful_transaction = true;
        }
      }

      if (this.movement.successful_transaction === true) {

        this.originProduct.last_modification_date = this.calculateDate();
        this.originProduct.last_modification_user = this.currentUser;

        this.clientService.updateProduct(this.originProduct, this.movement.origin_product).subscribe(
          (data) => {
            console.log(data);
            alert('producto actalizado con exito.');
          }, (error) => {
            console.log(error);
            alert('No se pudo modificar el producto');
          }
        );


        this.movement.movement_date = this.calculateDate();
        this.movement.type_of_transaction = this.type_of_transaction;
        this.movement.type_of_movement = "Débito";
        this.movement.current_balance = this.originProduct.current_balance + taxAmount;
        this.movement.available_balance = this.originProduct.available_balance + taxAmount;
        this.movement.creation_user = this.currentUser;
        this.clientService.createMovement(this.movement).subscribe(
          (data) => {
            console.log(data);
            alert('transacción realizada con exito.');
          }, (error) => {
            console.log(error);
            alert('No se pudo realizar la transación');
          }
        );

        if (this.originProduct.exempt_of_gmf === false) {
          let gmfMovement: any = {
            movement_date: this.calculateDate(),
            type_of_transaction: this.type_of_transaction,
            description: "Gravámen Movimiento Financiero",
            type_of_movement: "Débito",
            amount: taxAmount,
            current_balance: this.originProduct.current_balance,
            available_balance: this.originProduct.available_balance,
            origin_product: this.movement.origin_product,
            target_product: null,
            creation_user: this.currentUser,
            successful_transaction: true
          }

          this.clientService.createMovement(gmfMovement).subscribe(
            (data) => {
              console.log(data);
              alert('Impuesto debitado con exito.');
            }, (error) => {
              console.log(error);
              alert('No se pudo debitar el impuesto');
            }
          );
        }
      } else if (this.movement.successful_transaction === false) {
        this.movement.movement_date = this.calculateDate();
        this.movement.type_of_transaction = this.type_of_transaction;
        this.movement.type_of_movement = "Débito";
        this.movement.current_balance = this.originProduct.current_balance;
        this.movement.available_balance = this.originProduct.available_balance;
        this.movement.creation_user = this.currentUser;
        this.movement.description = "Operación fallida"
        this.clientService.createMovement(this.movement).subscribe(
          (data) => {
            console.log(data);
          }, (error) => {
            console.log(error);
          }
        );

      }
    }
  }

  formSubmit() {
    if (this.correctlyCompletedForm()) {
      alert("los campos son correctos");
      if (this.type_of_transaction === 'Consignación') {
        this.deposit();
      } else if (this.type_of_transaction === 'Retiro') {
        this.withdraw();
      } else if (this.type_of_transaction === 'Transferencia') {
        this.withdraw();
        if (this.movement.successful_transaction === true) {
          this.deposit();
        }
      }

    } else {
      alert("Diligencia correctamente los campos");
    }

    this.type_of_transaction='';
    this.movement.amount=null;
    this.movement.origin_product=null;
    this.movement.target_product=null;
    this.movement.description=null;
  }


  deactivateForm() {
    if (this.type_of_transaction === 'Consignación') {
      this.deactivateOriginInput = true;
      this.deactivateTargetInput = false;
    } else if (this.type_of_transaction === 'Retiro') {
      this.deactivateOriginInput = false;
      this.deactivateTargetInput = true;
    } else if (this.type_of_transaction === 'Transferencia') {
      this.deactivateOriginInput = false;
      this.deactivateTargetInput = false;
    }
  }


  @Output() windowSwitch= new EventEmitter<string>();

  closeWindow():void{
    this.windowSwitch.emit();
  }
}
