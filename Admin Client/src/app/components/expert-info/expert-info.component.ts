import { Component, Input } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';
declare let $: any;
import { WorkExperienceService } from '../../Services/work-experience/work-experience.service';
import { EducationService } from '../../Services/education/education.service';
import { CertificationService } from '../../Services/certification/certification.service';
import { PublicationService } from '../../Services/publication/publication.service';
import { ExpertProfileService } from '../../Services/expert-profile/expert-profile.service';
@Flowbite()
@Component({
  selector: 'app-expert-info',
  templateUrl: './expert-info.component.html',
  styleUrls: ['./expert-info.component.css']
})
export class ExpertInfoComponent {
  @Input() userid: any;
  workExperienceData: any = [];
  educationData: any = [];
  certificationData: any = [];
  publicationData: any = [];
  preferredLanguageData: any = [];
  preferredIndustriesData: any = [];
  preferredSmeData: any = [];
  expertInfo: any;
  smeData: any;
  allLanguages: any = [];
  allIndustries: any = [];
  subjectMatterEXP: any = [];
  lanuages: any;
  industries: any;
  constructor(
    private WorkExperienceService: WorkExperienceService,
    private EducationService: EducationService,
    private CertificationService: CertificationService,
    private PublicationService: PublicationService,
    private ExpertProfileService: ExpertProfileService,

  ) {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    $(document).ready(() => {
      $('#sidebar-link-1').addClass('active');
      $('#right-arrow-1').removeClass('hidden');
    });

    this.getWorkExperienceDetails();
    this.getEducationDetails();
    this.getCertificationDetails();
    this.getPublicationDetails();
    this.getProfileDetails();
    this.getAllAvailableLanguages();
    this.getAllAvailableIndustries();
    this.getAllAvailableSME()
    this.getPreferredLanguageDetails();
    this.getPreferredIndustriesDetails();
    this.getPreferredSmeDetails();
  }


  getWorkExperienceDetails() {
    this.WorkExperienceService.getWorkExperienceDetails(this.userid).subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.workExperienceData = []
          } else {
            this.workExperienceData = data.data;
          }
        } catch (error) { }
      }
    );
  }
  getEducationDetails() {
    this.EducationService.getEducationDetails(this.userid).subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.educationData = []
          } else {
            this.educationData = data.data;
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
  getCertificationDetails() {
    this.CertificationService.getCertificationsDetails(this.userid).subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.certificationData = []
          } else {
            this.certificationData = data.data;
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  getPublicationDetails() {
    this.PublicationService.getPublicationsDetails(this.userid).subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.publicationData = []
          } else {
            this.publicationData = data.data;
          }
          // console.log("jdflka", data)
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  getProfileDetails() {
    this.ExpertProfileService.getUserDetailsById({ "userid": this.userid }).subscribe((response: any) => {
      try {
        if (!response.error) {
          this.expertInfo = response.data;


        }
      } catch (error) {
        console.log(error);
      }
    })
  }

  getAllAvailableLanguages() {
    this.ExpertProfileService.getAllAvailableLanguages().subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.allLanguages = []
          } else {
            // this.publicationData = data.data;
            data.data.forEach((ele: any) => {
              this.allLanguages.push({ id: ele.id, name: ele.language })
            });
            this.setAllAvailableLanguages()
          }
          // console.log("jdflka", data)
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
  getAllAvailableSME() {
    this.ExpertProfileService.getAllAvailableSME().subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.subjectMatterEXP = []
          } else {
            // this.publicationData = data.data;
            data.data.forEach((ele: any) => {
              this.subjectMatterEXP.push({ id: ele.id, name: ele.sub_category_name, child: { state: ele.category_name } })
            });
            this.setAllAvailableSME()
          }
          // console.log("jdflka", data)
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
  setAllAvailableSME() {
    this.smeData = this.subjectMatterEXP
    console.log("smedata", this.smeData)
  }
  setAllAvailableLanguages() {
    this.lanuages = this.allLanguages
  }
  getAllAvailableIndustries() {
    this.ExpertProfileService.getAllAvailableIndustries().subscribe(
      (data: any) => {
        try {
          if (data == null) {
            this.allIndustries = []
          } else {
            // this.publicationData = data.data;
            data.data.forEach((ele: any) => {
              this.allIndustries.push({ id: ele.id, name: ele.industry })
            });
            this.setAllAvailableIndustries()
          }
          // console.log("jdflka", data)
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  setAllAvailableIndustries() {
    this.industries = this.allIndustries
  }
  getPreferredLanguageDetails() {
    this.ExpertProfileService.getPreferredLanguages(this.userid).subscribe(
      (response: any) => {
        try {
          // this.publicationData = data.data;
          let data = response.data;
          console.log(data)
          console.log(this.allLanguages)
          if (data != null) {
            this.preferredLanguageData = this.allLanguages.filter((obj1: any) => data.some((obj2: any) => obj2.languageid == obj1.id));

          } else {
            this.preferredLanguageData = []
          }

        } catch (error) {
          console.log(error);
        }
      }
    );
  }
  getPreferredIndustriesDetails() {
    this.ExpertProfileService.getPreferredIndustries(this.userid).subscribe(
      (response: any) => {
        try {
          // this.publicationData = data.data;
          let data = response.data;
          console.log(data)
          console.log(this.allIndustries)
          if (data != null) {
            this.preferredIndustriesData = this.allIndustries.filter((obj1: any) => data.some((obj2: any) => obj2.smeid == obj1.id));

          } else {
            this.preferredIndustriesData = []

          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
  getPreferredSmeDetails() {
    this.ExpertProfileService.getPreferredSme(this.userid).subscribe(
      (response: any) => {
        try {
          // this.publicationData = data.data;
          let data = response.data;
          console.log(data)
          console.log(this.smeData)
          if (data != null) {
            this.preferredSmeData = this.smeData.filter((obj1: any) => data.some((obj2: any) => obj2.smeid == obj1.id));
            console.log(this.preferredSmeData)
            let preferredSmeIds = this.preferredSmeData.map((ele: any) => ele.id)
            console.log(preferredSmeIds)

          } else {
            this.preferredSmeData = []
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  updateVerificationStatus(status: any) {
    let data = {
      "expertid": this.userid,
      "status": status
    }
    this.ExpertProfileService.updateVerificationStatus(data).subscribe(
      (response: any) => {
        try {
          // this.publicationData = data.data;
          if (!response.error) {
            console.log(response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
}
