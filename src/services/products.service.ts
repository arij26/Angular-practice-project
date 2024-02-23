import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any>{
   return this.http.get<any>('https://fakestoreapi.com/products');
  }
  addProduct(data: any):Observable<any> {
    return this.http.post<any>('https://fakestoreapi.com/products', data);
  }
   editproduct(id:number,data:any):Observable<any>{
return this.http.put<any>(`https://fakestoreapi.com/products/${id}`,data)
  }
  // deleteproduct(id:number):Observable<any>{
  //   return this.http.delete<any>('https://fakestoreapi.com/products/7', + id)
  //    }
  deleteproduct(id:number):Observable<any>{
    return this.http.delete<any>(`https://fakestoreapi.com/products/${id}`)
     }

  private _listners = new Subject<any>();
  listen():Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
  }


