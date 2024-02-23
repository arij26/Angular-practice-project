import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get<any>('https://fakestoreapi.com/users');
   }

   updateUsers(id:number,data:any):Observable<any>{
return this.http.put<any>(`'https://fakestoreapi.com/users/${id}`,data)
   }
  // editUser(id:number):Observable<any>{
  //  return this.http.put<any>(`https://fakestoreapi.com/users/${id}`,{})
  //     }
}
