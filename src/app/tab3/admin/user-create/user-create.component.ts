import { Router, ActivatedRoute } from "@angular/router";
import { UserModelService } from "./../../../Services/userModel/user-model.service";
import { appSetting } from "src/app/app-setting";
import { UserTypeService } from "./../../../Services/userType/user-type.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { userModel } from "src/app/Models/userModel";
import Swal from "sweetalert2";
import { userTypeModel } from 'src/app/Models/usertypeModel';

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  userTypeData:userTypeModel[]=[];
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private UserTypeService: UserTypeService,
    private UserModelService: UserModelService,
    private route: Router,
    private Router: ActivatedRoute
  ) {
    if (this.appSetting.userTypeData.length === 0) {
      this.appSetting.showLoading();
      this.UserTypeService.get().subscribe(
        (x) => (this.appSetting.userTypeData = x),
        (err) => console.log(err),
        () => {
        
          
          this.userTypeData=[...this.appSetting.userTypeData];
          let i=-1;
          this.appSetting.userTypeData.forEach(x=>{
            i=i+1;
            if(x.usertypeName==='Resturant'){
              this.userTypeData.splice(i,1);
            }
          });
          this.appSetting.loadingClose();
          
        }
      );
    }

    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }
  

  userData: userModel = {
    id: 0,
    username: "",
    password: "",
    phone: "",
    usertype: 0,
    latitude: "0",
    longitude: "0"
  };
  ngOnInit() { }
  back() {
    this.location.back();
  }

  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.UserModelService.getSingle(id).subscribe(
        (x) => (this.userData = x),
        (err) => this.appSetting.showError(err),
        () => this.appSetting.loadingClose()
      );
    }
    else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (
      this.userData.password === "" ||
      this.userData.phone === "" ||
      this.userData.username === "" ||
      this.userData.usertype === 0
    ) {
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.UserModelService.post(this.userData);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.UserModelService.put(this.userData);
      //this.route.navigateByUrl('tabs/tab3/userList');
    } else {
      this.appSetting.showInvalid();
    }
  }
}
