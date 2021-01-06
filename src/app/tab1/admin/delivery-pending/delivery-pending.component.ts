import { FoodService } from "./../../../Services/food/food.service";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/Services/order/order.service";

@Component({
  selector: "app-delivery-pending",
  templateUrl: "./delivery-pending.component.html",
  styleUrls: ["./delivery-pending.component.scss"],
})
export class DeliveryPendingComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    private FoodService: FoodService,
    private orderService: OrderService
  ) {
    this.firstLoad();
   
  }
  ngOnInit() {
    //this.firstLoad();
  }

  firstLoad() {
    this.appSetting.showLoading();
    this.orderService.get().subscribe(
      (x) => {
        this.appSetting.orderTransationList = x;
      },
      (err) => this.appSetting.showError(err),
      () => {
        this.loadFoodModel();
       
      }
    );
  }
  loadFoodModel() {
    this.appSetting.foodDataList = this.appSetting.menuFoodDataList;
    this.appSetting.loadingClose();
  }

  refresh(event) {
    this.orderService.get().subscribe(
      (x) => {
        this.appSetting.orderTransationList = x;
      },
      (err) => this.appSetting.showError(err),
      () => {
        event.target.complete();
      }
    );
  }
}
