import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { FoodService } from "src/app/Services/food/food.service";
import { OrderService } from "src/app/Services/order/order.service";

@Component({
  selector: "app-rider-main-page",
  templateUrl: "./rider-main-page.component.html",
  styleUrls: ["./rider-main-page.component.scss"],
})
export class RiderMainPageComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    private FoodService: FoodService,
    private orderService: OrderService
  ) {
    
    this.loadFoodModel();
    
  }
  ngOnInit() {
   
  }

  firstLoad() {
  
    if (this.appSetting.displaySetting === "delivering") {
      this.orderService.getRiderPending().subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
       
          this.appSetting.loadingClose();
        }
      );
    } else if (this.appSetting.displaySetting === "delivered") {
      this.orderService.getRiderComplete().subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
        
          this.appSetting.loadingClose();
        }
      );
    }
  }
  loadFoodModel() {
    this.appSetting.showLoading();
    this.FoodService.getActive().subscribe(
      (x) => (this.appSetting.foodDataList = x),
      (err) => this.appSetting.showError(err),
      () => {
        this.appSetting.menuFoodDataList=this.appSetting.foodDataList;
        this.appSetting.loadingClose();
        //this.firstLoad();
        
      }
    );
  }

  refresh(event) {
    if (this.appSetting.displaySetting === "delivering") {
      this.orderService.getRiderPending().subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
        
          event.target.complete();
        }
      );
    } else if (this.appSetting.displaySetting === "delivered") {
      this.orderService.getRiderComplete().subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
       
          event.target.complete();
        }
      );
    }
    else{
      this.orderService.getRiderPending().subscribe(
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
}
