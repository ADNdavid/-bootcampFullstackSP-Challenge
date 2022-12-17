import { Component, Input } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  @Input() clientOwner:any;

  constructor(private clientService: ClientService) { }

  type_of_account:string="";
  accountNumber:number=0;
  activateFiels: boolean = true;
  exemptGMF:boolean=false;  

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

  generateAccountNumber():number {    
    let prefix:string="";
    let suffix:string="";
    const NUMBER_LENGHT:number=8;    

    for (let i=1; i<= NUMBER_LENGHT; i++){
        suffix+=(Math.round(Math.random()*9)).toString();        
    }
    if (this.type_of_account==="Ahorros"){
        prefix="46";
        this.activateFiels=false;
    }else if (this.type_of_account==="Corriente"){
        prefix="23";
        this.activateFiels=true;
        this.exemptGMF=false;
    }
    console.log(this.type_of_account);
    console.log(this.exemptGMF);
    this.accountNumber=parseInt(prefix+suffix);
    return this.accountNumber;
}


/*Revisar si este metodo se puede mover a otro lugar ya que se esta reutilizando*/
calculateDate(){
  let date = new Date();

  let day = `${(date.getDate())}`.padStart(2,'0');
  let month = `${(date.getMonth()+1)}`.padStart(2,'0');
  let year = date.getFullYear();
  let hour = `${(date.getHours())}`.padStart(2,'0');
  let minutes = `${(date.getMinutes())}`.padStart(2,'0');
  let seconds = `${(date.getSeconds())}`.padStart(2,'0');

  let currentDate:string=`${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
  
  return currentDate;
}

correctlyCompletedForm():boolean{
  if((this.type_of_account == null || this.type_of_account.length < 7) ||
  (this.accountNumber === 0)  
  ){
    return false;
  }else{
    return true;
  }
}

gmfSwitch(){
    this.exemptGMF=!this.exemptGMF;
    //this.product.exempt_of_gmf= this.exemptGMF;  
    console.log("casilla es: "+this.exemptGMF);
  }

formSubmit(){
  console.log(this.product);    
  if(this.correctlyCompletedForm()){
        this.product.type_of_account=this.type_of_account;
        this.product.account_number=this.accountNumber;
        this.product.state="Activa";
        this.product.current_balance=0;
        this.product.available_balance= 0;
        this.product.exempt_of_gmf= this.exemptGMF;   
        this.product.creation_user="Admin";
        this.product.creation_date_of_the_account=this.calculateDate();
        this.product.last_modification_user="Admin";
        this.product.last_modification_date=this.calculateDate();
        this.product.client_owner= this.clientOwner;
              this.clientService.createProduct(this.product).subscribe(
              (data) =>{
                console.log(data);
                alert('Cuenta creada con exito.');
                },(error)=>{
                console.log(error);
                alert('No se pudo crear la Cuenta');
                }
            )
        
    }else{
      alert("Selecciona el producto a crear:");       
      }
  }  
}
