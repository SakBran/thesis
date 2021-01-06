import { Component, OnInit } from '@angular/core';
import { appSetting } from 'src/app/app-setting';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(public appSetting:appSetting) {
    this.appSetting.adminTab2Process='list';
   }

  ngOnInit() {}

}
