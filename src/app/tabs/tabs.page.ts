import { Component } from '@angular/core';
import { appSetting } from '../app-setting';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public appsetting:appSetting) {}

}
