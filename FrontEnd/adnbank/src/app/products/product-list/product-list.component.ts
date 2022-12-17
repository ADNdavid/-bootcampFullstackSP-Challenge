import { Component, Input } from '@angular/core';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() clientOwner:any;

  products:Array<any>=[];

  ngOnInit(){    
  }
  
  constructor(private clientService: ClientService) { }

  showProducts(){
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

}


