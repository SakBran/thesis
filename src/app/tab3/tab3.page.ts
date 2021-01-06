import { Component } from '@angular/core';
import { appSetting } from '../app-setting';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public appSetting:appSetting) {}

}
