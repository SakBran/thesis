import { DeliveryRecordService } from './../../../Services/deliveryRecord/delivery-record.service';
import { FoodService } from "./../../../Services/food/food.service";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/Services/order/order.service";
import { deliveryRecordModel } from 'src/app/Models/deliveryRecordModel';

@Component({
  selector: "app-resturant-main",
  templateUrl: "./resturant-main.component.html",
  styleUrls: ["./resturant-main.component.scss"],
})
export class ResturantMainComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    private FoodService: FoodService,
    private orderService: OrderService
    
  ) {
    
    this.firstLoad();
  }

  firstLoad(){
    this.appSetting.showLoading();
    if(this.appSetting.loginType==="admin")
    {
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
    else if(this.appSetting.loginType==="resturant"){
      this.orderService
      .getResturantPendings(this.appSetting.resturantID)
      .subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
      
          this.loadFoodModel();
        }
      );
    }
    else if(this.appSetting.loginType==="rider"){

    }

  }
  loadFoodModel() {
    this.FoodService.getActive().subscribe(
      (x) => (this.appSetting.foodDataList = x),
      (err) => this.appSetting.showError(err),
      () => this.appSetting.loadingClose()
    );
  }
  ngOnInit() {}

 

  refresh(event) {
   if(this.appSetting.displaySetting==='pending'){
    this.orderService
      .getResturantPendings(this.appSetting.resturantID)
      .subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
         event.target.complete();
        }
      );
  }else if(this.appSetting.displaySetting==='delivering'){
    this.orderService
    .getResturantOrder()
    .subscribe(
      (x) => {
        this.appSetting.orderTransationList = x;
      },
      (err) => this.appSetting.showError(err),
      () => {
      
       event.target.complete();
      }
    );
  }}
}
