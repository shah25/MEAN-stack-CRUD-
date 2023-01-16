
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Product from '../../../Model/Product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  prdid: string;
  ProductDetail: Product;
  formGroup: FormGroup;

  constructor(private service: ProductServiceService, private toaster: ToastrService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.prdid = params['id'];
    });
    this.initializeForm();
  }

  ngOnInit() {
    this.getProductById(this.prdid);
  }

  // To Initialize Form
  initializeForm() {
    this.formGroup = this.formBuilder.group({
      Name: ['', [Validators.required]],
      ID: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]],
    });
  }

  // To Single Product Details By ID
  getProductById(prdid) {
    this.service.getProductById(prdid).subscribe(res => {
      this.ProductDetail = res;
      this.formGroup.patchValue({
        Name: this.ProductDetail.Name,
        ID: this.ProductDetail.ID,
        Description: this.ProductDetail.Description,
        Price: this.ProductDetail.Price,
      });
    },
    
        error => {
          this.toaster.error('Error ', 'Something went wrong');
        });
  }

  // To Update Product Detail
  updateProduct() {
    if (this.formGroup.valid) {
      let data = this.formGroup.value;
      this.service.updateProduct(this.prdid, data).subscribe(() => {
        this.toaster.success('Success ', 'Product Updated Successfully');
        this.router.navigate(['/']);
      },
      error => {
        this.toaster.error('Error ', 'Something went wrong');
      });
    }
  }

}