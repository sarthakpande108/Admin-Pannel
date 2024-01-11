import { Component } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent {
  showExpertAccordion(pid: any, cid: any) {
    if ($("#expert-accordion-body-" + pid + "-" + cid).hasClass('hidden')) {
      $("#expert-accordion-body-" + pid + "-" + cid).removeClass('hidden')
      $("#expert-show-more-btn-" + pid + "-" + cid).addClass('hidden')
      $("#expert-show-less-btn-" + pid + "-" + cid).removeClass('hidden')
    } else {
      $("#expert-accordion-body-" + pid + "-" + cid).addClass('hidden')
      $("#expert-show-more-btn-" + pid + "-" + cid).removeClass('hidden')
      $("#expert-show-less-btn-" + pid + "-" + cid).addClass('hidden')
    }

  }
  userPostedProjects = [
    {
      id: "1",
      projectImg:"../../../../assets/assets/icons/helmet.png",
      projectName: "helmet fjsklfjdls dsjflksd klsfjdlk",
      postedDate: "21 feb 2023",
      postedBy: "Amit jadhwar",
      materialUsed:['condenser tubes', 'fins', "gaskets/seals"],
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      problem: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
      output:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ",
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

      ]
    },
   

  ]
  
}
