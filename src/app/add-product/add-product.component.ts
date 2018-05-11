import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  routes: any;
  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }
  addProduct(product:any):void{
    if(!product){ return; }
    this._dataService.createProduct(product)
    .subscribe();
  }
}