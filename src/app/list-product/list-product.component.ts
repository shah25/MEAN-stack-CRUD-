import { Component, OnInit, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ProductServiceService } from '../product-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
export interface Products {
  Name: string;
  ID: string;
  Description: string;
  Price: Number;
}
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListProductComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Important objects
  MyDataSource: any={};
  // MyDataSource: MatTableDataSource<Products> = [];
  ProductsList: Products[] = [];
  displayedColumns: string[] = ['Name', 'ID', 'Description', 'Price', 'action'];
  objectKeys = Object.keys;
  datapresent;
  constructor(private service: ProductServiceService, private router: Router, private toaster: ToastrService) {
    this.getProduct();
  }

  ngOnInit() {
    this.getProduct();
  }
  ngAfterViewInit() {
    this.getProduct();
  }
  // To Get List Of Product
  getProduct() {
    this.service
      .getProducts()
      .subscribe(
        data => {
          // .subscribe((data) => {
          this.MyDataSource = new MatTableDataSource();
          this.datapresent = data;
          this.MyDataSource.data = data;
          this.MyDataSource.paginator = this.paginator;
          this.MyDataSource.sort = this.sort;
        },
        error => {
          this.toaster.error('Error ', 'Something went wrong');
        }
      );

  }

  // To Edit Product
  editProduct(empid: any) {
    this.router.navigate([`/edit/${empid}`]);
  }
  deleteProduct(empid: any) {
    this.service.deleteProduct(empid).subscribe(data => {

      this.toaster.success('Success ', 'Product Deleted Successfully');
      this.getProduct();
    },
      error => {
        this.toaster.error('Error ', 'Something went wrong');
      })
  }

  gotoAdd() {
    this.router.navigate([`/create`]);
  }

}