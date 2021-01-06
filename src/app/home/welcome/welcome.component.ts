import { appSetting } from 'src/app/app-setting';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModelService } from 'src/app/Services/userModel/user-model.service';
import { UserTypeService } from 'src/app/Services/userType/user-type.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserModelService,
    private appSetting: appSetting,
    private userTypeService: UserTypeService
  ) {
    // setTimeout(() => {this.toHomePage()}, 4000);
  }

  ngOnInit() { }

  toHomePage() {
    this.router.navigateByUrl("/Foods");
  }

}
