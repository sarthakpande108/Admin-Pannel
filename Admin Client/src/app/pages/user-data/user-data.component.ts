import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';
declare let $: any;
@Flowbite()
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
userDetails!: any;
  viewDetails: boolean = false;

  showUserDetails(val: boolean, data?: any) {
    this.userDetails = data;
    this.viewDetails = val;
    $(document).ready(() => {
      console.log($("#main-container")[0].offsetTop);
      $("#main-container")[0].scrollTop = 0
    });
  }
userData = [
    {
      id: "1",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Amit Jadhwar",
      email: "amit@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:true
    },
    {
      id: "2",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Rushi Aher",
      email: "rushi@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:false
    },
    {
      id: "3",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Juned ",
      email: "juned@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:true
    },
    {
      id: "4",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Shalil ",
      email: "shalil@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:true
    },
    {
      id: "5",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Juned ",
      email: "rushi@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:true
    },
    {
      id: "6",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Sadanand ",
      email: "sada@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:true
    },
    {
      id: "7",
      profileImg:"../../../assets/assets/icons/Michael Cullen.svg",
      name: "Juned ",
      email: "juned@gmail.com",
      phone: "8787809833",
      state: "Maharashtra",
      city: "pune",
      pincode: "422008",
      post:"5",
      isActive:false
    },
  ]
}
