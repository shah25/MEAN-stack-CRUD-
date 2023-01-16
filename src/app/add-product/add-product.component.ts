
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  formGroup: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, private toaster: ToastrService, private ProductServiceService: ProductServiceService, private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  // To initialize Form
  initializeForm() {
    this.formGroup = this.formBuilder.group({
      Name: ['', [Validators.required]],
      ID: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]],
    });
  }

  // Add Product When Submit Button Is Clicked
  addProduct() {
    if (this.formGroup?.valid) {
      let data = this.formGroup?.value;
      this.ProductServiceService.addProduct(data).subscribe(() => {
        this.toaster.success('Success ', 'Product Added Successfully');
        this.router.navigate(['/']);
      },
        error => {
          this.toaster.error('Error ', 'Something went wrong');
        });
    }
  }

}