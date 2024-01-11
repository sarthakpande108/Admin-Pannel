import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  getPublicationsDetails(userid: any) {
    return this.http.get(this.apiUrl + 'expert/publications/' + userid);
  }

  addPublications(data: any) {
    return this.http.post(this.apiUrl + 'expert/publications', data);
  }
  updatePublications(data: any, userid: any) {
    return this.http.put(this.apiUrl + 'expert/publications/' + userid, data);
  }
  deletePublications(id: any) {
    return this.http.delete(this.apiUrl + 'expert/publications/' + id);
  }
}