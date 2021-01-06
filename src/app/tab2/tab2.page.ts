import { Component } from '@angular/core';
import { appSetting } from '../app-setting';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public appSetting:appSetting,public route:Router) {
    //this.route.navigateByUrl('tabs/tab2');
  }

}
