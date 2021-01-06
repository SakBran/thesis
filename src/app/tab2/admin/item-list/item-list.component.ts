import { orderModel } from './../../../Models/orderModel';
import { OrderService } from './../../../Services/order/order.service';
import { LocationService } from "./../../../Services/location/location.service";
import { locationModel } from "./../../../Models/locationModel";
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { orderTransationModel } from 'src/app/Models/orderTransationModel';

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    private LocationService: LocationService,
    private orderService:OrderService
  ) {
    this.locationReload();
  }
  list: number[] = [1, 2, 34, 5, 6];
  ngOnInit() {}
  editInvoice(i) {
    this.appSetting.adminTab2Process = "edit";
  }
  riderSelect() {
    this.appSetting.adminTab2Process = "riderSelect";
  }

  locationReload() {
    if (this.appSetting.locationDataList.length === 0) {
      this.LocationService.get().subscribe(
        (x) => (this.appSetting.locationDataList = x)
      );
    }
  }
  refresh(event) { 
      this.LocationService.get().subscribe(
        (x) => (this.appSetting.locationDataList = x),
        (err) => this.appSetting.showError(err),
        () => {
          event.target.complete();
        }
      );
    
  }
  deliverChange(e) {
    this.appSetting.orderData.Township_id = e;
    const temp: locationModel[] = [...this.appSetting.locationDataList];
    temp.forEach((x) => {
      if (x.id === e) {
        this.appSetting.orderData.deliveryCharegs = x.deliveryCharges;
      }
    });
  }

  itemJoin(id): itemRest {
    let i: itemRest = {
      itemName: "",
      resturant: "",
    };
    const temp = [...this.appSetting.constFoodDataList];
    temp.forEach((x) => {
      if (x.id === id) {
        i.itemName = x.itemName;
        i.resturant = this.appSetting.resName(x.resturant_id);
      }
    });
    return i;
  }

  deleteInvoice(id) {
    this.appSetting.orderDetailList.splice(id, 1);
    this.appSetting.orderDetailViewList.splice(id, 1);
  }

  sendToResturant(){
    this.appSetting.showLoading();
   
    let data:orderTransationModel={
      orderModel:this.appSetting.orderData,
      orderDetailModels:this.appSetting.orderDetailList
    }
  
    this.orderService.post(data);
  }

  revceiveOpt:string[]=['All','COD','Epayment'];
  
}

export class itemRest {
  itemName: string;
  resturant: string;
}
