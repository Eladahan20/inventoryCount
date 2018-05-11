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
  //  =[{"_id":"5ae837bd12a1dc354c3bf864","code":"175006","name":" שעון גאומטריכ גכהדג הדגחמהחגד","price":240,"quantity":"3","category":"שעונים", "isEditable": false},
  //                             {"_id":"5ae838bc12a1dc354c3bf865","code":"175572","name":"שעון זהב מרובע","price":239,"quantity":"2","category":"שעונים", "isEditable": false},
  //                             {"_id":"5ae838f612a1dc354c3bf866","code":"175145/37","name":"שעון מרובע עץ","price":279,"quantity":"2","category":"שעונים", "isEditable": false}

  // ];
  newArr: Array<Product>;
  searchCategory: string = "code";
  editedProduct: Product;
  
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
  showDetails(product, i) {
    console.log(product);
    console.log(i);
  }
  editProduct(product) {
    if (product.isEditable) {
      console.log(this.editedProduct);
      product.isEditable = false;
      this._dataService.modifyProduct(this.editedProduct).subscribe();
    } else {
      product.isEditable = true;
      this.editedProduct = product;
    }
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

