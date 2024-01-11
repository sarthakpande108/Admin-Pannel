import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Flowbite } from '../flowbite.decorator';
declare let $:any
@Flowbite()
@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent {
constructor(private route: Router) { }
svg:string = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 13H12" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 17H16" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

  navMenuLinks=[
    {
      id:'1',
      name:'dashboard',
      icon:'../../../assets/assets/master/dashboard.svg',
      url:'/',
      hasSubmenu:false,
      externalLink:null,
    },
    {
      id:'2',
      name:'access controll setting',
      icon:'../../../assets/assets/master/setting.svg',
      url:'access-control',
      hasSubmenu:false,
      externalLink:null,
    },
    {
      id:'3',
      name:'expert data',
      icon:'../../../assets/assets/master/expert.svg',
      url:null,
      hasSubmenu:true,
      externalLink:null,
      submenu:[
        {
          id:'1',
          name:'view all',
          icon:'../../../assets/assets/master/subicon/viewall.svg',
          url:'/find-expert',
          status:'',
        },
        {
          id:'2',
          name:'pending verification',
          icon:'../../../assets/assets/master/subicon/verification.svg',
          url:'/verify-expert',
        },
        // {
        //   id:'3',
        //   name:'find expert',
        //   icon:'../../../assets/assets/master/subicon/find.svg',
        //   url:'/find-expert',
        // }
      ]
    },
    {
      id:'4',
      name:'user data',
      icon:'../../../assets/assets/master/user.svg',
      url:'user-data',
      hasSubmenu:false,
      externalLink:null,
    },
    {
      id:'5',
      name:'project data',
      icon:'../../../assets/assets/master/project.svg',
      url:'project-data',
      hasSubmenu:false,
      externalLink:null,
    },
    // {
    //   id:'6',
    //   name:'ABCNDJBJB JDBSJHBS  SBSJBJSB',
    //   icon:'../../../assets/assets/master/setting.svg',
    //   url:null,
    //   hasSubmenu:true,
    //   externalLink:null,
    //   submenu:[
    //     {
    //       id:'1',
    //       name:'view all31515151515 cbahcv ac agvch agvs',
    //       icon:'../../../assets/assets/master/subicon/viewall.svg',
    //       url:'/view-all-expert',
    //     },
    //     {
    //       id:'2',
    //       name:'Pending Verification',
    //       icon:'../../../assets/assets/master/subicon/verification.svg',
    //       url:'/verify-expert',
    //     },
    //     {
    //       id:'3',
    //       name:'find expert',
    //       icon:'../../../assets/assets/master/subicon/find.svg',
    //       url:'/find-expert',
    //     }
    //   ]
    // },
  ]

  toggleSubmenu(id:any){
    $('.submenu').slideUp();
    $('.submenu-icon').removeClass('active')
    $('.submenu-parent-item-link').removeClass('visibleSubmenu').removeClass('active')
    if( $('#'+id+'-submenu').is(':visible')){
      $('#'+id+'-sumenu-parent').removeClass('visibleSubmenu').removeClass('active')
      $('#'+id+'-submenu-arrow-icon').removeClass('active')
      $('#'+id+'-submenu').slideup();
    }else{$('#'+id+'-submenu').slideToggle();
    $('#'+id+'-sumenu-parent').addClass('visibleSubmenu').addClass('active')
    $('#'+id+'-submenu-arrow-icon').addClass('active')}
  }

  openMenu(){
    $('.sideBar').toggleClass('open')
    if($('.sideBar').hasClass('open')){
      $('.expand-icon').addClass('open')
      $('.overlay').fadeIn();
    }else{$('.expand-icon').removeClass('open')
    $('.overlay').fadeOut();}
  }

  closeMobileMenu(){
    $('.sideBar').removeClass('menu-open')
    $('.overlay').fadeOut();
    $('.sideBar').removeClass('open')
  }
  openMobileMenu(){
    $('.sideBar').addClass('menu-open')
    $('.overlay').fadeIn();
  }
logout() {
  localStorage.clear()
  this.route.navigateByUrl('/login')
  
  }



}
