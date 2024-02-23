import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProductsService } from 'src/services/products.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatDialogModule,MatIconModule,MatSelectModule,
    MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  form:FormGroup;
  listProducts: string[] = [
'Title',
'Price',
'Description',
'Category',
'Image',
'Rating',
  ];
  inputData:any

  // ratingForm:FormGroup;

  constructor(
    private productService:ProductsService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _dialogRef:MatDialogRef<AddProductComponent>,
    private ref:MatDialogRef<AddProductComponent>,
    private builder: FormBuilder,
    private coreServie:CoreService
    )
    {
this.form = this.builder.group({
  title:'',
    price:'', 
    description:'',
    category:'',
    image:'',
    rating :this.builder.group({
      rate:'',
      count:''
    })

})

  }
  ngOnInit(){
//  this.inputData = this.data

}

  saveAdd(){
    if(this.form.valid){
      console.log(this.form.value);
      this.productService.addProduct(this.form.value).subscribe({
        next:(val:any)=>{
          // alert('product addes successfully');
          this.coreServie.openSnackBar('product added','done')
          this._dialogRef.close(true);
          
        },
        error:(err) => {
          console.error(err)
        },

      });
    }

  }
  
}
