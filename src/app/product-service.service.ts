
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductServiceService {

    // Main api url to call api
    uri = 'http://localhost:4000/Products';

    constructor(private http: HttpClient) { }

    // To Get The List Of Product
    getProducts() {
        return this.http.get(`${this.uri}`);
    }

    // To Get Product Details For Single Record Using Id
    getProductById(empid: any) {
        return this.http.get(`${this.uri}/editProduct/${empid}`);
    }

    // To Updated Specific Product
    updateProduct(id: any, body: any) {
        return this.http.post(`${this.uri}/updateProduct/${id}`, body);
    }

    // To Create/Add New Product
    addProduct(body: any) {
        return this.http.post(`${this.uri}/addProduct`, body);
    }

    // To Delete Any Product
    deleteProduct(empid: any) {
        return this.http.get(`${this.uri}/deleteProduct/${empid}`);
    }

}