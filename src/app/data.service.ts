import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private apiUrl = "";
  result:any;

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get("/api/products")
      .map(result => this.result = result.json().data);
  }
  createProduct(product) {
    return this._http.post("/api/product", product)
    .map(result => this.result = result.json().data);
  }
  deleteProduct(product){
    return this._http.delete("/api/product/" + product._id)
    .map(result => this.result = result.json().data);
  }
  modifyProduct(product) {
    return this._http.put("/api/product", product)
    .map(result => this.result = result.json().data);
  }

}