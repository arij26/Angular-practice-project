import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductsService } from 'src/services/products.service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AddProductComponent } from '../add-product/add-product.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';

export interface PeriodicElement {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'image',
    'rating',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private coreServie:CoreService
  ) {
    this.productsService.listen().subscribe((m: any) => {
      console.log(m);
      this.getProducts();
    });
  }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '570px',
      data: {
        // title:'Add Product'
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      },
    });
  }

  editProduct(data: any) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '570px',
      data: data, //data, pass data to the dialog box
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      },
    });
  }

  deleteProduct(id: number) {
    // const dialogRef = this.dialog
    //   .open(DeleteModalComponent, {
    //     width: '570px',
    //     data: {},
    //   })
    // .afterClosed()
    // .subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    //   //this.getProducts();
    // });
    this.productsService.deleteproduct(id).subscribe({
      next: (res) => {
        this.coreServie.openSnackBar('product deleted','done')
        this.getProducts();
      },
      error: console.log,
    });
  }

}
