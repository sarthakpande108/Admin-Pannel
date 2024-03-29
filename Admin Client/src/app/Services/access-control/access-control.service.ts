import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  constructor(private http: HttpClient) { }


  getAdmins():Observable<any>{
    return this.http.get(`${environment.apiUrl}admin`)
  } 

  addAdmin(data:any):Observable<any>{
    console.log("data : ", data);
    return this.http.post(`${environment.apiUrl}admin/addAdmin`,data)
  }

  editAdmin(data:any,userid:any):Observable<any>{
    console.log("data in service: ", data);
    return this.http.post(`${environment.apiUrl}admin/updateAdmin/${userid}`,data)
  }

  removeAdmin(data:any,userid:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}admin/deleteAdmin/${userid}`,data)
  }

  verifyPassword(current_password:any,userid:any):Observable<any>{
    console.log("data");
    console.log({current_password:current_password});
    return this.http.post(`${environment.apiUrl}admin/verifyAdminPassword/${userid}`,{current_password:current_password})
  }

  resetPassword(data:any,userid:any){
    return this.http.post(`${environment.apiUrl}admin/resetAdminPassword/${userid}`,data)
  }


  //services for permission
  getPermissions():Observable<any>{
    return this.http.get(`${environment.apiUrl}permission`)
  }
  addPermission(permissions:number[]):Observable<any>{
    return this.http.post(`${environment.apiUrl}permission/addPermission}`,permissions)
  }
  deletePermission(permission:number[],userid:number):Observable<any>{
    return this.http.post(`${environment.apiUrl}permission/deletePermission/${userid}`,permission)
  }
}
