import { userModel } from "./../../Models/userModel";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModelService } from "src/app/Services/userModel/user-model.service";
import { UserTypeService } from "src/app/Services/userType/user-type.service";

@Component({
  selector: "app-login-from",
  templateUrl: "./login-from.component.html",
  styleUrls: ["./login-from.component.scss"],
})
export class LoginFromComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserModelService,
    private appSetting: appSetting,
    private userTypeService: UserTypeService
  ) {}

  ngOnInit() {}
  username: string = "";
  password: string = "";
  passwordVisibility = "password";
  passVisible() {
    if (this.passwordVisibility === "password") {
      this.passwordVisibility = "text";
    } else {
      this.passwordVisibility = "password";
    }
    
  }

  userData: userModel = {
    id: 0,
    username: "",
    password: "",
    usertype: 0,
    phone: "",
    latitude: "",
    longitude: "",
  };

  
  locationUpdate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userData.latitude = position.coords.latitude.toString();
        this.userData.longitude = position.coords.longitude.toString();

        this.userService.putLocation(this.userData);
      });
    }
  }
  onClick() {
    this.appSetting.showLoading();
    this.userService.getLogin(this.username, this.password).subscribe(
      (x) => {
        this.appSetting.sessionUserID = x.id;
        this.userData = x;
      },
      (err) => this.appSetting.loginFail(),
      () => {
        if (this.appSetting.sessionUserID === 0) {
          this.appSetting.loginFail();
        } else {
          this.userTypeService.getSingle(this.userData.usertype).subscribe(
            (y) => {
              this.appSetting.loginType = y.usertypeName.toLocaleLowerCase();
            },
            (err) => this.appSetting.showError(err),
            () => {
              if (this.appSetting.loginType === "resturant") {
                this.appSetting.resturantID = this.appSetting.sessionUserID;
              }

              if (this.appSetting.loginType === "rider") {
                setInterval(() => {
                  //this.locationUpdate();
                  this.locationUpdate();
                }, 10000);
              }           
              this.router.navigateByUrl("/managmenet");
              this.appSetting.loadingClose();
            }
          );
        }
        
      }
    );
  }
}
