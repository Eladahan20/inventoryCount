import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Product } from '../Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;
  newArr: Array<Product>;
  searchCategory: string = "code";
 
    constructor(private _dataService: DataService) {

    // // Access the Data Service's getUsers() method we defined
    this._dataService.getProducts()
        .subscribe(res => this.products = res);
    }
  ngOnInit() {
  }

  deleteProduct(product){
    if(!product){ return; }
    this._dataService.deleteProduct(product)
      .subscribe();
      location.reload();
  }

  onKeyUp(searchedText) {
    if (searchedText == false) {
      this._dataService.getProducts()
      .subscribe(res => this.products = res);
    } else {
      
      console.log(this.searchCategory);
      console.log(searchedText);
      this.newArr = this.products.filter(item => 
        {
           if ((item[this.searchCategory] != null) && item[this.searchCategory].includes(searchedText)) {
              return item;
           }
      });
    }
    this.products = this.newArr;

}

  }

