import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';

declare let $: any;
@Flowbite()
@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent {
 showAnswer(id:any){
  $('.answer-div').slideUp();
  $('.plus-icon').html('add');
  $('#icon-'+id).html('remove');
  $('#answer-'+id).slideDown();
 }
  showAccordion() {
    if ($('#icon').hasClass('bi-chevron-up')) {
      $('.content-div').slideDown();
      $('#icon').removeClass('bi-chevron-up')
      $('#icon').addClass('bi-chevron-down')
    } else {
      $('.content-div').slideUp();
      $('#icon').addClass('bi-chevron-up')
      $('#icon').removeClass('bi-chevron-down')
    }
    
  }

  projectDetails = [
    {
      id: "1",
      name: "UV Exposure Helmet",
      date: "28 May 2023",
      img: "../../../assets/assets/your project/helmet.png",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,explicabo unde fugit nobis fugit nobis tempore tempore quo...",
      productSector: "Automative",
      projectOrganization: "manufacturing industry",
      projectPhase: "speciallity product",
      note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error reprehenderit expedita.",
      materialUsed: ['condenser tubes', 'fins', "gaskets/seals"],
    },
    {
      id: "2",
      name: "Indirect HT AI Fin Condenser",
      img: "../../../assets/assets/your project/condenser.png",
      date: "23 May 2023",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,explicabo unde fugit nobis fugit nobis tempore tempore quo...",
      productSector: "Automative",
      projectOrganization: "manufacturing industry",
      projectPhase: "speciallity product",
      note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error reprehenderit expedita.",
      materialUsed: ['condenser tubes', 'fins', "gaskets/seals"],
    },
  ]

  faqData = [
    {
      id: 1,
      question: "Is my project confidential",
      answer: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,."
    },

    {
      id: 3,
      question: "How do select an expert?",
      answer: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,."
    },
    {
      id: 4,
      question: "Is there is any money back gurentee?",
      answer: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,."
    },
    {
      id: 5,
      question: "How much does it cost?",
      answer: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,."
    },
  ]

  confidentialAssured = [
    {
      id: "1",
      question: "Keep your project Private",
      answer:"lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been thlorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th"
    },
    {
      id: "2",
      question: "NDA and IP Protection",
      answer:"lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been thlorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th"
    },
  ]
}
