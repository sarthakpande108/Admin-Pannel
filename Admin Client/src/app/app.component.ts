import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from './flowbite.decorator';
@Flowbite()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductryExpertCRM';

  ngOnInit(): void {
    initFlowbite();
  }
}
