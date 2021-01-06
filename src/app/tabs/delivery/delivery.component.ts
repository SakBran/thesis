import { Component, OnInit } from '@angular/core';
import { appSetting } from 'src/app/app-setting';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {

  constructor(public appSetting:appSetting) { }

  ngOnInit() {}

}
