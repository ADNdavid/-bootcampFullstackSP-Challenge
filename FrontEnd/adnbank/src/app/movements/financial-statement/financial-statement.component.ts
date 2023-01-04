import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-financial-statement',
  templateUrl: './financial-statement.component.html',
  styleUrls: ['./financial-statement.component.css']
})
export class FinancialStatementComponent {
  @Input() productSelected: any;

  movements: Array<any> = [];

  ngOnInit() {
    this.showMovements();
  }

  constructor(private clientService: ClientService) { }

  showMovements() {
    this.movements.shift();
    this.clientService.findMovementsByAccountNumber(this.productSelected.account_number).subscribe(
      (data) => {
        console.log(data);
        this.movements.push(data);
        console.log(this.movements);
      }, (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {
      for (let movement of this.movements[0]) {
        let currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 1 });
        movement["amount"] = currency.format(movement["amount"]);
        movement["current_balance"] = currency.format(movement["current_balance"]);
        movement["available_balance"] = currency.format(movement["available_balance"]);
      }
    }, 100);
  }

  @Output() windowSwitch = new EventEmitter<string>();

  closeWindow(): void {
    this.windowSwitch.emit();
  }
}
