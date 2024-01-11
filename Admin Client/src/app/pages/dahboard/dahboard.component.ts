import { Component } from '@angular/core';
import { Flowbite } from 'src/app/flowbite.decorator';

@Flowbite()
@Component({
  selector: 'app-dahboard',
  templateUrl: './dahboard.component.html',
  styleUrls: ['./dahboard.component.css']
})
export class DahboardComponent {
  expertByIndustries = [
    {
      id: "1",
      industry: "Automative Sector",
      count:"55"
  },
    {
      id: "2",
      industry: "Agriculture Sector",
      count:"35"
  },
    {
      id: "3",
      industry: "Biotech and life science sector life science sector life science sector  ",
      count:"33"
  },
    {
      id: "4",
      industry: "medical device sector",
      count:"76"
  },
    {
      id: "5",
      industry: "pharmaceuticals sector",
      count:"55"
  },
]
  expertBySubject = [
    {
      id: "1",
      industry: "Automative Sector",
      count:"55"
  },
    {
      id: "2",
      industry: "Agriculture Sector",
      count:"35"
  },
    {
      id: "3",
      industry: "Biotech and life science sector",
      count:"33"
  },
    {
      id: "4",
      industry: "medical device sector",
      count:"76"
  },
    {
      id: "5",
      industry: "pharmaceuticals sector",
      count:"55"
  },
  ]
  
}
