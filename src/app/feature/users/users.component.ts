import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsersService } from 'src/services/users.service';
import {MatIconModule} from '@angular/material/icon';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface usersModel{
  id:number,
  email:string,
  username:string,
  password:string,
  name:fullName,
  adress:adress,
  geolocation:geolocation,
  phone:string
}
  export interface fullName
  {
      firstname:'John',
      lastname:'Doe'
  }
  export interface adress
  {
    city:string,
    street:string,
    number:number,
    zipcode:string,
    geolocation:geolocation
  }

  export interface geolocation
    {
        lat:string,
        long:string
  }


const ELEMENT_DATA: usersModel[] = [];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  

  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'adress','actions'];

  dataSource!: MatTableDataSource<any>;

  constructor(
    private usersService:UsersService,
    public dialog: MatDialog,
    ){

  }

  ngOnInit(){
    this.getUsersList();
  }


  openDetails(data:any){
  const dialog = this.dialog.open(UserDetailsComponent,{
    width: '570px',
     height:'400px',
    data: data
    //{
       //title:'User Details',
       //id:this.userId,
    //},
  });
  dialog.afterClosed().subscribe(item=>{
    console.log(item);
    
  })

  }




// editProduct(data: any) {
//   const dialogRef = this.dialog.open(EditModalComponent, {
//     width: '570px',
//     data: data, //data, pass data to the dialog box
//   });
//   dialogRef.afterClosed().subscribe({
//     next: (val) => {
//       if (val) {
//         this.getProducts();
//       }
//     },
//   });
// }

  

  getUsersList(){
this.usersService.getAllUsers().subscribe({
  next :(res) => {
this.dataSource = new MatTableDataSource(res);
  },
  error:(err)=>{
    console.log(err);
    
  },
});
  }


}
