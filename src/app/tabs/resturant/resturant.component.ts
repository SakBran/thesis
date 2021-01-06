import { Component, OnInit } from '@angular/core';
import { appSetting } from 'src/app/app-setting';

@Component({
  selector: 'app-resturant',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.scss'],
})
export class ResturantComponent implements OnInit {

  constructor(public appSetting:appSetting) { }

  ngOnInit() {}

}
