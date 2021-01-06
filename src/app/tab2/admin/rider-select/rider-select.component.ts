import { OrderService } from "src/app/Services/order/order.service";
import { appSetting } from "./../../../app-setting";
import { UserModelService } from "./../../../Services/userModel/user-model.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { userModel } from "src/app/Models/userModel";
import { orderModel } from "src/app/Models/orderModel";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { orderDetialModel } from "src/app/Models/orderDetailModel";
import { resturantModel } from "src/app/Models/resturantModel";
import { foodModel } from "src/app/Models/foodModel";

@Component({
  selector: "app-rider-select",
  templateUrl: "./rider-select.component.html",
  styleUrls: ["./rider-select.component.scss"],
})
export class RiderSelectComponent implements OnInit {
  rider: userModel[] = [];
  progressRider: userModel[] = [];
  id = 0;
  data: orderModel = new orderModel();

  riderSelection: string = "available";

  constructor(
    private route: ActivatedRoute,
    public appSetting: appSetting,
    private router: Router,
    private UserModelService: UserModelService,
    private orderService: OrderService
  ) {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.loadAvailable();
    this.appSetting.orderTransationList.forEach((x) => {
      if (x.orderModel.id === this.id) {
        this.data = x.orderModel;
      }
    });
  }

  ngOnInit() {}

  loadAvailable() {
    this.appSetting.showLoading();
    this.UserModelService.getAvailableRider().subscribe(
      (x) => (this.rider = x),
      (err) => this.appSetting.showError(err),
      () => {
        this.riderSelection = "available";
        this.appSetting.loadingClose();
      }
    );
  }

  locationCalculate(riderLongitude, riderLatidude) {
    const temp: orderTransationModel[] = [
      ...this.appSetting.orderTransationList,
    ];
    let tempDetial: orderDetialModel[] = this.tempDetail(temp);
    const tempLocation: resturantModel[] = [
      ...this.appSetting.resturandDataList,
    ];

    const foodDB: foodModel[] = [...this.appSetting.menuFoodDataList];
    let tempRes: number[] = this.tempResMethod(foodDB, tempDetial);
   
    let resIDlist: number[] = this.getUnique(tempRes);
    let locationDB: resturantModel[] = this.locationDBMethod(
      tempLocation,
      resIDlist
    );

    return (
      Math.min.apply(
        null,
        this.distanceCalculation(locationDB, riderLatidude, riderLongitude)
      ) / 1000
    );
  }

  private distanceCalculation(
    locationDB: resturantModel[],
    riderLatidude: any,
    riderLongitude: any
  ): number[] {
    let distanceList: number[] = [];
    locationDB.forEach((y) => {
      distanceList.push(
        this.appSetting.distanceCal(
          y.latitude,
          y.longitude,
          riderLatidude,
          riderLongitude
        )
      );
    });
    return distanceList;
  }

  private locationDBMethod(
    tempLocation: resturantModel[],
    resIDlist: number[]
  ) {
    let locationDB: resturantModel[] = [];
    tempLocation.forEach((x) => {
      resIDlist.forEach((y) => {
        if (y === x.id) {
          locationDB.push(x);
        }
      });
    });
    return locationDB;
  }

  private tempResMethod(foodDB: foodModel[], tempDetial: orderDetialModel[]) {
    let tempRes: number[] = [];
    foodDB.forEach((x) => {
      tempDetial.forEach((y) => {
      
        if (y.itemID === x.id) {
          tempRes.push(x.resturant_id);
        } else {
     
        }
      });
    });
    return tempRes;
  }

  private tempDetail(temp: orderTransationModel[]): orderDetialModel[] {
    let dataList: orderDetialModel[] = [];
    temp.forEach((x) => {
      x.orderDetailModels.forEach((y) => {
        if (y.orderID === this.id) {
          dataList.push(y);
        }
      });
    });
    return dataList;
  }

  getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
  loadInProgress() {
    this.appSetting.showLoading();
    this.UserModelService.getDeliveringRider().subscribe(
      (x) => (this.progressRider = x),
      (err) => this.appSetting.showError(err),
      () => {
        this.riderSelection = "inProgress";
        this.appSetting.loadingClose();
      }
    );
  }

  refresh(e) {
    this.UserModelService.getAvailableRider().subscribe(
      (x) => (this.rider = x),
      (err) => this.appSetting.showError(err),
      () => {
        e.target.complete();
      }
    );
  }

  refreshDelivering(e) {
    this.UserModelService.getDeliveringRider().subscribe(
      (x) => (this.progressRider = x),
      (err) => this.appSetting.showError(err),
      () => {
        e.target.complete();
      }
    );
  }

  onSelect(id) {
    this.appSetting.showLoading();
    this.data.riderID = id;
    this.data.status = "delivering";
    this.orderService.put(this.data);
    this.router.navigateByUrl("/managmenet/tabs/tab1/deliveryPending");
  }
}
