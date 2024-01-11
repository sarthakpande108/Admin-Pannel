import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';

import { ExpertProfileService } from '../../../Services/expert-profile/expert-profile.service';
declare let $: any;
@Flowbite()
@Component({
  selector: 'app-verify-expert',
  templateUrl: './verify-expert.component.html',
  styleUrls: ['./verify-expert.component.css']
})
export class VerifyExpertComponent {
  expertId: any;
  viewDetails: any;
  expertVerificationData: any = []
  ResExpertProfile: any = []
  p: any = 1;
  constructor(
    private ExpertProfileService: ExpertProfileService,
  ) {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.getUserDetailsByRole()
  }
  showExpertDetails(val: boolean, userid?: any) {
    this.expertId = userid;
    this.viewDetails = val;
    $(document).ready(() => {
      console.log($("#main-container")[0].offsetTop);
      $("#main-container")[0].scrollTop = 0
    });
  }

  getUserDetailsByRole() {
    this.ExpertProfileService.getUserDetailsByRole({ role: 2 }).subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.expertVerificationData = []
          } else {
            this.ResExpertProfile = data.data;
            this.expertVerificationData = this.ResExpertProfile;
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  searchByName(e: any) {
    let str = e.target.value;
    this.expertVerificationData = this.ResExpertProfile.filter(
      (profile: any) => profile.username.toLowerCase().includes(str.toLowerCase())
    );
  }



}
