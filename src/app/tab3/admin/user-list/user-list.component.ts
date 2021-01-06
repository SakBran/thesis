import { Router } from "@angular/router";
import { UserModelService } from "./../../../Services/userModel/user-model.service";
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Location } from "@angular/common";
import { userModel } from "src/app/Models/userModel";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  userDataList: userModel[] = [];
  constructor(
    public appSetting: appSetting,
    public location: Location,
    private UserModelService: UserModelService,
    private route: Router
  ) {}

  ngOnInit() {
    this.dataLoading();
  }
  back() {
    this.location.back();
  }

  dataLoading() {
    this.UserModelService.get().subscribe(
      (x) => {
        this.appSetting.showLoading();
        this.userDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
       
      }
    );
  }
  refresh(event){
    this.UserModelService.get().subscribe(
      (x) => {
        this.userDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        if(event!==undefined||event!==null){
        event.target.complete();
        }
      }
    );
  }

  onEdit(id) {
    this.route.navigateByUrl("managmenet/tabs/tab3/userEdit/" + id);
  }

  onDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.UserModelService.delete(id);
        this.userDataList.splice(id, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
