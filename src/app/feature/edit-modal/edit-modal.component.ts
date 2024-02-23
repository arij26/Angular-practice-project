import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/services/products.service';
import { take } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';

import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatButtonModule,MatSelectModule,MatInputModule,ReactiveFormsModule,
    MatFormFieldModule,MatFormFieldModule,FormsModule,MatIconModule,MatCheckboxModule
  ],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit{

  // listProducts: any[] = [];
  // productId:any
  // idProduit :any
  form:FormGroup;

  listProducts: string[] = [
    'Title',
    'Price',
    'Description',
    'Category',
    'Image',
    'Rating',
      ];
constructor(private productsService: ProductsService,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private builder: FormBuilder,
  private _dialogRef:MatDialogRef<EditModalComponent>,
  private productService:ProductsService,
  private coreServie:CoreService

  )
  {
    this.form = this.builder.group({
      title:'',
        price:Number,
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
  this.form.patchValue(this.data);//pass the value
}


saveEditProduct(){
  if(this.data){
    console.log(this.form.value);
    this.productService
    .editproduct(this.data.id,this.form.value)
    .subscribe({
      next:(val:any)=>{
        //  alert('product updated');
         this.coreServie.openSnackBar('product updated','done')
        this._dialogRef.close(true);
        
      },
      error:(err) => {
        console.error(err)
      }

    })
  }

}
}
