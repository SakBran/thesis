import { userModel } from "src/app/Models/userModel";
import { UserModelService } from "src/app/Services/userModel/user-model.service";
import { Router } from "@angular/router";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import Swal from "sweetalert2";
import { OpeningBalanceService } from "src/app/Services/openingBalance/opening-balance.service";
import { OpeningBalanceModel } from "src/app/Models/openingBalanceModel";

@Component({
  selector: "app-opening-list",
  templateUrl: "./opening-list.component.html",
  styleUrls: ["./opening-list.component.scss"],
})
export class OpeningListComponent implements OnInit {
  resDataList: OpeningBalanceModel[] = [];
  constructor(
    public location: Location,
    public appSetting: appSetting,
    public OpeningBalanceService: OpeningBalanceService,
    private riderSelectService: UserModelService,
    private route: Router
  ) {
    this.riderFilter();
  }

  riderList: userModel[] = [];
  searchDate:Date=new Date();
  dateChange(e) {
    this.searchDate=e;
    this.appSetting.showLoading();
   
    this.OpeningBalanceService.getDate(e).subscribe(
      (x) => {this.resDataList=x},
      (err) => this.appSetting.showError(err),
      () => this.appSetting.loadingClose()
    );
  }
  riderFilter() {
    this.appSetting.showLoading();
    let temp1: userModel[] = [];
    this.riderSelectService.get().subscribe(
      (x) => (temp1 = x),
      (err) => this.appSetting.showError(err),
      () => {
        const temp2 = temp1;
        temp2.forEach((x) => {
          if (x.usertype === 3) {
            this.riderList.push(x);
          }
        });
        this.appSetting.loadingClose();
      }
    );
  }

  riderName(id): string {
    let name = "";
    const temp: userModel[] = [...this.riderList];
    temp.forEach((x) => {
      if (x.id === id) {
        name = x.username;
      }
    });
    return name;
  }
  ngOnInit() {
    this.dataLoading();
  }
  back() {
    this.location.back();
  }
  dataLoading() {
    this.appSetting.showLoading();
    this.OpeningBalanceService.get().subscribe(
      (x) => {
        this.resDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  refresh(event) {
    this.OpeningBalanceService.get().subscribe(
      (x) => {
        this.resDataList = x;
      },
      (err) => {
        this.appSetting.showError(err);
        event.target.complete();
      },

      () => {
        if (event !== undefined || event !== null) {
          event.target.complete();
        }
      }
    );
  }

  onEdit(id) {
    this.route.navigateByUrl("managmenet/tabs/tab3/openingBalanceEdit/" + id);
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
        this.OpeningBalanceService.delete(id);
        this.resDataList.splice(id, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
