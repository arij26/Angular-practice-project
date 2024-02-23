import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatSelectModule,MatFormFieldModule,],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit{

  constructor(){

  }
  
  ngOnInit() {
    
  }
 
}
