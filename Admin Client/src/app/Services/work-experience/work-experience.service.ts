import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  getWorkExperienceDetails(userid: any) {
    return this.http.get(this.apiUrl + 'expert/workExperience/' + userid);
  }

  addWorkExperience(data: any) {
    return this.http.post(this.apiUrl + 'expert/workExperience', data);
  }
  updateWorkExperience(data: any, userid: any) {
    return this.http.put(this.apiUrl + 'expert/workExperience/' + userid, data);
  }
  deleteWorkExperience(id: any) {
    return this.http.delete(this.apiUrl + 'expert/workExperience/' + id);
  }
}