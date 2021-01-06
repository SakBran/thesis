import { orderModel } from "src/app/Models/orderModel";
import { orderDetialModel } from "src/app/Models/orderDetailModel";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { locationModel } from "src/app/Models/locationModel";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { OrderService } from "src/app/Services/order/order.service";

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.scss"],
})
export class ClientInfoComponent implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    public appSetting: appSetting,
    private orderService: OrderService
  ) {
    this.appSetting.zone=[];
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage() {
    let temp = localStorage.getItem("localData");
    if (temp !== null) {
      const localData: orderModel = Object.assign(JSON.parse(temp));

      this.appSetting.orderData.clientName = localData.clientName;
      this.appSetting.orderData.clitentPhone = localData.clitentPhone;
      this.appSetting.orderData.Township_id = localData.Township_id;
      this.appSetting.orderData.clitentFlatNo = localData.clitentFlatNo;
      this.appSetting.orderData.clientAddress = localData.clientAddress;
      this.appSetting.orderData.longitude = localData.longitude;
      this.appSetting.orderData.latitude = localData.latitude;
      let location=localStorage.getItem("locationSet");
      if(location!==null){
        this.deliverChange(location);
      }
    }
  }
  
  locationSet="";
  ngOnInit() {
    const temp: locationModel[] = [...this.appSetting.locationDataList];
    let tempLocation: String[] = [];
    temp.forEach((x) => tempLocation.push(x.TownShip));
    this.location = tempLocation.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    
  }

  deliverChange(e) {
    this.locationSet=e;
    this.appSetting.zone=[];
    const temp: locationModel[] = [...this.appSetting.locationDataList];
    const orderData = [...this.appSetting.orderDetailViewList];
    const foodData = [...this.appSetting.menuFoodDataList];
    let resturnatList: number[] = [];
    orderData.forEach((x) => {
      foodData.forEach((a) => {
        if (a.id == x.orderDetialModel.itemID) {
       
          this.appSetting.zone.push(this.appSetting.resZone(a.resturant_id));
          resturnatList.push(a.resturant_id);
        }
      });
    });

    const arr = [...this.appSetting.zone];
    let unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
   
    //this.appSetting.orderData.Township_id = 0;
    if (unique.length === 1) {
      temp.forEach((x) => {
        if (x.TownShip === e && x.Zone === unique[0]) {
          this.appSetting.orderData.deliveryCharegs = x.deliveryCharges;
          this.appSetting.orderData.Township_id = x.id;
        }
      });
      let resturant = resturnatList.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      let additionalCharges = 0;
      if (resturant.length > 1) {
        additionalCharges = (resturant.length - 1) * 500;
      }
      this.appSetting.orderData.deliveryCharegs =
        this.appSetting.orderData.deliveryCharegs + additionalCharges;
    } else {
      this.appSetting.orderData.Township_id = 0;
    }
  }

  location: String[] = [];
  filter(arr) {
    var unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  submitOrder() {
    this.appSetting.showLoading();
    const temp = [...this.appSetting.orderDetailViewList];
    let orderDetial: orderDetialModel[] = [];
    temp.forEach((x) => {
      orderDetial.push(x.orderDetialModel);
    });
    let data: orderTransationModel = {
      orderModel: this.appSetting.orderData,
      orderDetailModels: orderDetial,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.appSetting.orderData.latitude = position.coords.latitude.toString();
        this.appSetting.orderData.longitude = position.coords.longitude.toString();
      });
    }
    localStorage.setItem(
      "localData",
      JSON.stringify(this.appSetting.orderData)
    );
    localStorage.setItem("locationSet",this.locationSet);
    this.orderService.post(data);
  }
}
