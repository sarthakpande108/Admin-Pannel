import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';
declare let $: any;
@Flowbite()
@Component({
  selector: 'app-project-data',
  templateUrl: './project-data.component.html',
  styleUrls: ['./project-data.component.css']
})
export class ProjectDataComponent {
  all: boolean = true;
  ongoing: boolean = false;
  completed: boolean = false;
  postedProjects: boolean = false;
  completedProjectDetails = []
  postedProjectDetails = []
  ongoingProjectDetails = []
  projectDetails: any = [];
  viewDetails: boolean = false;
  projectData: any;
  individualProjectDetails: any;
  ngOnInit() {
    this.projectDetails = this.allProjectDetails;

  }
  showProjectDetails(val: boolean, data?: any) {
    this.individualProjectDetails = data;
    this.viewDetails = val;
    $(document).ready(() => {
      console.log($("#main-container")[0].offsetTop);
      $("#main-container")[0].scrollTop = 0
    });
  }
  changeTab(e: any) {
    let id = e.target.id;
    $('.tab-lifted').removeClass('tab-active');
    $('#' + id).addClass('tab-active');
    if (id == "all") {
      this.projectDetails = this.allProjectDetails;
      this.all = true; this.ongoing = false; this.completed = false; this.postedProjects = false;
    } else if (id == "ongoing") {
      this.projectDetails = this.ongoingProjectDetails;
      this.all = false; this.ongoing = true; this.completed = false; this.postedProjects = false;
    }
    else if (id == "completed") {
      this.projectDetails = this.completedProjectDetails;
      this.all = false; this.ongoing = false; this.completed = true; this.postedProjects = false;
    }
    else if (id == "postedProjects") {
      this.projectDetails = this.postedProjectDetails;
      this.all = false; this.ongoing = false; this.completed = false; this.postedProjects = true;
    }

  }
  allProjectDetails = [
    {
      id: "1",
      profileImg:"../../../assets/assets/icons/helmet.png",
      projectName: "helmet",
      postedBy: "Amit Jadhwar",
      expertRequired: "material expert",
      projectDescription: "Lorem Ipsum is simply dummy  ",
      date: "26 jan 2023",
      isRunning:true
    },
    {
      id: "2",
      profileImg: "../../../assets/assets/icons/condenser.png",
      projectName: "condenser",
      postedBy: "Rushi Aher",
      expertRequired: "material expert",
      projectDescription: "Lorem Ipsum is simply dummy  ",
      date: "26 jan 2023",
      isRunning:false
    },
   
  ]
}
