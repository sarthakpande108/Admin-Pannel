import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  getCertificationsDetails(userid: any) {
    return this.http.get(this.apiUrl + 'expert/certifications/' + userid);
  }

  addCertifications(data: any) {
    return this.http.post(this.apiUrl + 'expert/certifications', data);
  }
  updateCertifications(data: any, userid: any) {
    return this.http.put(this.apiUrl + 'expert/certifications/' + userid, data);
  }
  deleteCertifications(id: any) {
    return this.http.delete(this.apiUrl + 'expert/certifications/' + id);
  }

}