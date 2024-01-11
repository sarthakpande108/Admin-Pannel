import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';
declare let $: any;
@Flowbite()
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  all: boolean = true;
  ongoing: boolean = false;
  completed: boolean = false;
  postedProjects: boolean = false;
  completedProjectDetails = []
  postedProjectDetails = []
  ongoingProjectDetails = []
  projectDetails: any = [];
  ngOnInit() {
    this.projectDetails = this.allProjectDetails;

  }
  toggleAccordion(id: any) {
    console.log("clicked");
    if ($("#accordion-body-" + id).hasClass('hidden')) {
      $("#accordion-body-" + id).removeClass('hidden')
      $("#accordion-container-" + id).addClass(['bg-gray-100', 'p-3'])
      $("#show-more-btn-" + id).addClass('hidden')
    } else {
      console.log("inside");
      $("#accordion-body-" + id).addClass('hidden')
      $("#accordion-container-" + id).removeClass(['bg-gray-100', 'p-3'])
      $("#show-more-btn-" + id).removeClass('hidden')
    }

  }
  showExpertAccordion(pid: any,cid:any) {
    if ($("#expert-accordion-body-" + pid+"-"+cid).hasClass('hidden')) {
      $("#expert-accordion-body-" + pid + "-"+cid).removeClass('hidden')
      $("#expert-show-more-btn-" + pid + "-"+cid).addClass('hidden')
      $("#expert-show-less-btn-" + pid + "-"+cid).removeClass('hidden')
    } else {
      $("#expert-accordion-body-" + pid + "-"+cid).addClass('hidden')
      $("#expert-show-more-btn-" + pid + "-"+cid).removeClass('hidden')
      $("#expert-show-less-btn-" + pid + "-"+cid).addClass('hidden')
    }

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
      projectImg: "../../../../assets/assets/icons/helmet.png",
      projectName: "helmet helmet jsjd jdklj fggfgfdg fdffd fdfdf fddfdf",
      postedDate: "21 feb 2023",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      problem: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      output: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      isRunning: true,
      expertsInvolved: [
        {
          id: "1",
          profileImg: "../../../../assets/assets/icons/Michael Cullen.svg",
          name: "Ankul singh",
          designation: "material expert",
          joinDate: "26 mar 2023",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quis tenetur quibusdam officiis inventore quae enim, sapiente molestiae qui provident, nemo eos libero distinctio harum?",
          isWorking: false,
          transactionData :[
        {
          id: "1",
          profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
          name: "angad jain",
          transactionId: "243353",
          paid: "Rs. 1600",
          pending: null,
          date: "26 jan 2023",
          status:"Success"
        },
        {
          id: "2",
          profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
          name: "komal mane",
          transactionId: "243353",
          paid: null,
          pending: "Rs. 200",
          date: "26 jan 2023",
          status:"Failed"
        },
        {
          id: "3",
          profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
          name: "rahul shinde",
          transactionId: "243353",
          paid: "Rs. 1600",
          pending: null,
          date: "26 jan 2023",
          status:"Return"
        },
      ]
        },
        {
          id: "2",
          profileImg: "../../../../assets/assets/icons/Michael Cullen.svg",
          name: "angad jain",
          designation: "material expert",
          joinDate: "26 mar 2023 - 24 june 2023",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quis tenetur quibusdam officiis inventore quae enim, sapiente molestiae qui provident, nemo eos libero distinctio harum?",
          isWorking: true,

        },

      ],
      

    },
    {
      id: "2",
      projectImg: "../../../../assets/assets/icons/condenser.png",
      projectName: "condenser",
      postedDate: "21 feb 2023",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      problem: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      output: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      isRunning: false,
      expertsInvolved: [
        {
          id: "1",
          profileImg: "../../../../assets/assets/icons/Michael Cullen.svg",
          name: "Ankul singh",
          designation: "material expert",
          joinDate: "26 mar 2023",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quis tenetur quibusdam officiis inventore quae enim, sapiente molestiae qui provident, nemo eos libero distinctio harum?",
          isWorking: false,
          transactionData: [
            {
              id: "1",
              profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
              name: "angad jain",
              transactionId: "243353",
              paid: "Rs. 1600",
              pending: null,
              date: "26 jan 2023",
              status: "Success"
            },
            {
              id: "2",
              profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
              name: "komal mane",
              transactionId: "243353",
              paid: null,
              pending: "Rs. 200",
              date: "26 jan 2023",
              status: "Failed"
            },
            {
              id: "3",
              profileImg: "../../../assets/assets/icons/Michael Cullen.svg",
              name: "rahul shinde",
              transactionId: "243353",
              paid: "Rs. 1600",
              pending: null,
              date: "26 jan 2023",
              status: "Return"
            },
          ]
        },
        {
          id: "2",
          profileImg: "../../../../assets/assets/icons/Michael Cullen.svg",
          name: "angad jain",
          designation: "material expert",
          joinDate: "26 mar 2023 - 24 june 2023",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quis tenetur quibusdam officiis inventore quae enim, sapiente molestiae qui provident, nemo eos libero distinctio harum?",
          isWorking: true,

        },

      ],

    },
  ]




}
