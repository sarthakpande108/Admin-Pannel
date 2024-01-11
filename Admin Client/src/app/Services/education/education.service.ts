import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EducationService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  getEducationDetails(userid: any) {
    return this.http.get(this.apiUrl + 'expert/education/' + userid);
  }

  addEducation(data: any) {
    return this.http.post(this.apiUrl + 'expert/education', data);
  }
  updateEducation(data: any, userid: any) {
    return this.http.put(this.apiUrl + 'expert/education/' + userid, data);
  }
  deleteEducation(id: any) {
    return this.http.delete(this.apiUrl + 'expert/education/' + id);
  }

}