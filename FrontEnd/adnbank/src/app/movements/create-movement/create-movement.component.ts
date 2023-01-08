import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastComponent } from 'src/app/toast/toast.component';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.css']
})
export class CreateMovementComponent {
  @Input() currentUser: any;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private clientService: ClientService) { }

  type_of_transaction: string = "";
  hintVisible: boolean = false;
  message: string = '';
  statusIcon: string = 'loading';
  accountNumber: number = 0;
  deactivateOriginInput: boolean = true;
  deactivateTargetInput: boolean = true;
  deactivateButton: boolean = false;
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
    setTimeout(() => {
      if(this.originProduct.state === 'Cancelada'){
        this.toast.alertMessage('El producto de origen con número de cuenta: ' + this.originProduct.account_number + ', ha sido cancelado','warning');
      }else if(this.originProduct.account_number === null){
        this.toast.alertMessage('El número de cuenta ingresado no ha sido encontrado en la base de datos','error');
      }
    }, 100);
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
        this.toast.alertMessage('El producto de destino con número de cuenta: ' + this.movement.target_product + ', no ha sido encontrado','error');
      }
    );
    setTimeout(() => {
      if(this.targetProduct.state === 'Cancelada'){
        this.toast.alertMessage('El producto de destino con número de cuenta: ' + this.targetProduct.account_number + ', ha sido cancelado','warning');
      }else if(this.targetProduct.account_number === null){
        this.toast.alertMessage('El número de cuenta ingresado no ha sido encontrado en la base de datos','error');
      }
    }, 100);
  }


  deposit() {
    if (this.targetProduct.state === null || this.targetProduct.state === 'Cancelada') {
      this.alertMessage('No es posible realizar la operación', 'error');

    } else {
      let newBalance: number = this.targetProduct.current_balance + this.movement.amount;
      this.targetProduct.current_balance = newBalance;
      if (this.targetProduct.exempt_of_gmf === true) {
        this.targetProduct.available_balance = newBalance;
      } else {
        this.targetProduct.available_balance = newBalance - newBalance * (4 / 1000);
      }
      setTimeout(() => {
        this.targetProduct.last_modification_date = this.calculateDate();
        this.targetProduct.last_modification_user = this.currentUser;

        this.clientService.updateProduct(this.targetProduct, this.movement.target_product).subscribe(
          (data) => {
            console.log(data);
            this.alertMessage('Producto de destino actualizado con éxito', 'success');
          }, (error) => {
            console.log(error);
            this.alertMessage('No se pudo modificar el producto', 'error');
          }
        );
      }, 200);

      setTimeout(() => {
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
            this.alertMessage('Transacción realizada con éxito', 'success');
          }, (error) => {
            console.log(error);
            this.alertMessage('No se pudo realizar la transación', 'error');
          }
        );
      }, 400);
    }
  }

  withdraw() {
    if (this.originProduct.state === null || this.originProduct.state === 'Cancelada' || this.originProduct.state === 'Inactiva') {
      this.alertMessage('No es posible realizar el retiro', 'error');

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
          this.alertMessage('No es posible realizar la operación, fondos insuficientes', 'error');
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
          this.alertMessage('No es posible realizar la operación, fondos insuficientes', 'error');
          this.movement.successful_transaction = false;
        } else {
          this.originProduct.current_balance = newBalance;
          this.originProduct.available_balance = newBalance - newBalance * (4 / 1000);
          this.movement.successful_transaction = true;
        }
      } else if (this.originProduct.exempt_of_gmf === false && this.originProduct.type_of_account === 'Ahorros') {
        newBalance = this.originProduct.current_balance - this.movement.amount - taxAmount;

        if (newBalance <= 0) {
          this.alertMessage('No es posible realizar la operación, fondos insuficientes', 'error');
          this.movement.successful_transaction = false;
        } else {
          this.originProduct.current_balance = newBalance;
          this.originProduct.available_balance = newBalance - newBalance * (4 / 1000);
          this.movement.successful_transaction = true;
        }
      }

      if (this.movement.successful_transaction === true) {
        setTimeout(() => {
          this.originProduct.last_modification_date = this.calculateDate();
          this.originProduct.last_modification_user = this.currentUser;

          this.clientService.updateProduct(this.originProduct, this.movement.origin_product).subscribe(
            (data) => {
              console.log(data);
              this.alertMessage('Producto de origen actualizado con éxito', 'success');
            }, (error) => {
              console.log(error);
              this.alertMessage('No se pudo modificar el producto', 'error');
            }
          );

        }, 50);

        setTimeout(() => {
          this.movement.movement_date = this.calculateDate();
          this.movement.type_of_transaction = this.type_of_transaction;
          this.movement.type_of_movement = "Débito";
          this.movement.current_balance = this.originProduct.current_balance + taxAmount;
          this.movement.available_balance = this.originProduct.available_balance + taxAmount;
          this.movement.creation_user = this.currentUser;
          this.clientService.createMovement(this.movement).subscribe(
            (data) => {
              console.log(data);
              this.alertMessage('Transacción realizada con éxito', 'success');
            }, (error) => {
              console.log(error);
              this.alertMessage('No se pudo realizar la transación', 'error');
            }
          );
        }, 100);


        if (this.originProduct.exempt_of_gmf === false) {
          setTimeout(() => {
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
                this.alertMessage('Impuesto debitado con exito', 'success');
              }, (error) => {
                console.log(error);
                this.alertMessage('No se pudo debitar el impuesto', 'error');
              }
            );
          }, 1100);
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
    this.hintVisible = true;
    if (this.correctlyCompletedForm()) {
      this.deactivateButton = true;
      setTimeout(() => {
        this.alertMessage('Los campos son correctos', 'success');
        if (this.type_of_transaction === 'Consignación') {
          this.deposit();
        } else if (this.type_of_transaction === 'Retiro') {
          this.withdraw();
        } else if (this.type_of_transaction === 'Transferencia') {
          this.withdraw();
          if (this.movement.successful_transaction === true) {
            setTimeout(() => {
              this.deposit();
            }, 1000);
          }
        }
        setTimeout(() => {
          this.cleanForm();
        }, 3000);
      }, 500);
    } else {
      this.alertMessage('Diligencia correctamente los campos', 'warning');
    }
  }


  deactivateForm() {
    this.deactivateButton = false;
    if (this.type_of_transaction === 'Consignación') {
      this.deactivateOriginInput = true;
      this.deactivateTargetInput = false;
      this.movement.origin_product = null;
    } else if (this.type_of_transaction === 'Retiro') {
      this.deactivateOriginInput = false;
      this.deactivateTargetInput = true;
      this.movement.target_product = null;
    } else if (this.type_of_transaction === 'Transferencia') {
      this.deactivateOriginInput = false;
      this.deactivateTargetInput = false;
    } else if (this.type_of_transaction === '') {
      this.deactivateOriginInput = true;
      this.deactivateTargetInput = true;
    }
  }


  @Output() windowSwitch = new EventEmitter<string>();

  closeWindow(): void {
    this.windowSwitch.emit();
    this.hintVisible = false;
    this.cleanForm();
  }

  alertMessage(message: string, type_alert: string): void {
    setTimeout(() => {
      this.message = message;
      if (type_alert === "warning") {
        this.statusIcon = 'warning';
      } else if (type_alert === "success") {
        this.statusIcon = 'success';
      } else if (type_alert === "error") {
        this.statusIcon = 'error';
      }
    }, 200);
  }

  cleanForm() {
    this.type_of_transaction = '';
    this.movement.amount = null;
    this.movement.origin_product = null;
    this.movement.target_product = null;
    this.movement.description = null;
    this.deactivateForm();
  }
}
