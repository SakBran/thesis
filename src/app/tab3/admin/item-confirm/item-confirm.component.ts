import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { appSetting } from "src/app/app-setting";
import { Location } from "@angular/common";
import { FoodService } from "src/app/Services/food/food.service";
import { foodModel } from "src/app/Models/foodModel";

@Component({
  selector: "app-item-confirm",
  templateUrl: "./item-confirm.component.html",
  styleUrls: ["./item-confirm.component.scss"],
})
export class ItemConfirmComponent implements OnInit {
  constructor(
    public location: Location,
    public appSetting: appSetting,
    public FoodService: FoodService,
    private route: Router
  ) {}

  ngOnInit() {
    this.dataLoading();
  }

  back() {
    this.location.back();
  }
  dataLoading() {
    this.FoodService.getPending().subscribe(
      (x) => {
        this.appSetting.showLoading();
        this.appSetting.foodDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
      }
    );
  }

  acept(id) {
    this.FoodService.putConfirm(id, "true");
    this.FoodService.getPending().subscribe(
      (x) => {
        this.appSetting.foodDataList = x;
      },
      (err) => {
        this.appSetting.showError(err);
      },

      () => {}
    );
  }
  reject(id) {
    this.FoodService.putConfirm(id, "false");
    this.FoodService.getPending().subscribe(
      (x) => {
        this.appSetting.foodDataList = x;
      },
      (err) => {
        this.appSetting.showError(err);
      },

      () => {}
    );
  }
  refresh(event) {
    this.FoodService.getPending().subscribe(
      (x) => {
        this.appSetting.foodDataList = x;
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
    this.route.navigateByUrl("managmenet/tabs/tab3/foodEdit/" + id);
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
        this.FoodService.delete(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
