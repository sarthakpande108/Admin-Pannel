import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ExpertProfileService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  getAllAvailableLanguages() {
    return this.http.get(this.apiUrl + 'language/languageMaster');
  }
  getAllAvailableSME() {
    return this.http.post(this.apiUrl + 'expert/smeMaster/getAllSmeDetails', null);
  }
  getPreferredLanguages(userid: any) {
    return this.http.get(this.apiUrl + 'language/preferredLanguage/' + userid);
  }
  getPreferredIndustries(userid: any) {
    return this.http.get(this.apiUrl + 'industry/preferredIndustry/' + userid);
  }
  getPreferredSme(userid: any) {
    return this.http.get(this.apiUrl + 'expert/preferredSme/' + userid);
  }
  getAllAvailableIndustries() {
    return this.http.get(this.apiUrl + 'industry/industryMaster');
  }
  getUserDetailsById(userid: any) {
    return this.http.post(this.apiUrl + 'user/getUserDetailsById', userid);
  }
  getUserDetailsByRole(role: any) {
    return this.http.post(this.apiUrl + 'user/getUserDetailsByRole', role);
  }
  updateUserDetails(userid: any, userdata: any) {
    return this.http.post(this.apiUrl + 'user/updateUserDetails/' + userid, userdata);
  }
  updatePreferredLanguageDetails(userid: any, userdata: any) {
    return this.http.post(this.apiUrl + 'language/preferredLanguage/' + userid, userdata);
  }
  updatePreferredSmeDetails(userid: any, userdata: any) {
    return this.http.post(this.apiUrl + 'expert/preferredSme/' + userid, userdata);
  }
  updatePreferredIndustriesDetails(userid: any, userdata: any) {
    return this.http.post(this.apiUrl + 'industry/preferredIndustry/' + userid, userdata);
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
  updateVerificationStatus(data: any) {
    return this.http.post(this.apiUrl + 'expert/updateVerificationStatus', data);
  }
}