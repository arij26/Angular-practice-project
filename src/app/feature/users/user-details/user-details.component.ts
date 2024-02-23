import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,MatButtonModule,
    MatCardModule,MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  inputdata:any;
  name:any;
  userId:number


  constructor(private ref:MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formbuilder : FormBuilder,
    private usersService:UsersService,
 
    )
  {
// this.name = data.name
// console.log('name',this.name);

this.userId = data.userId
console.log('id',this.userId);
  }
  ngOnInit(){
this.inputdata = this.data;
this.name = this.data.name
console.log('name',this.name);

this.userId = this.data.userId;
this.userForm.patchValue(this.data);
console.log('ssssssssssssssssssss',this.userForm.value);
console.log(this.data);


  }
  closePopUp(){
 this.ref.close('closed using function');
  }

  userForm = this.formbuilder.group({
    
   
    
    name:this.formbuilder.group({
      firstname:'',
      lastname:''
    }),
    email:'',
    address:this.formbuilder.group({
      city:'',
    street:'',
    number:Number,
    zipcode:'',
    geolocation:this.formbuilder.group({
      lat:'',
      long:''
    })
    
    })
    
  })
  get fullName(): string {
    const name = this.userForm.get('name');
    return name ? `${name.get('firstname')?.value} ${name.get('lastname')?.value}`.trim() : '';
  }


  viewDetails(){
    if (this.data){
      console.log(this.userForm.value);
      this.usersService.updateUsers(this.data.id,this.userForm.value)
      .subscribe({
        next:(val:any)=>{
          console.log('rrrrrrrrrrrr');
          
        }
      })
    }
  }

}

