import { InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";
import { FoodService } from "src/app/Services/food/food.service";
import { OrderService } from "src/app/Services/order/order.service";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { UserModelService } from "src/app/Services/userModel/user-model.service";

@Component({
  selector: "app-client-invoice",
  templateUrl: "./client-invoice.component.html",
  styleUrls: ["./client-invoice.component.scss"],
})
export class ClientInvoiceComponent implements OnInit {
  invoiceNo = null;
  phoneNo = null;
  data: orderTransationModel = new orderTransationModel();
  constructor(
    public appSetting: appSetting,
    public modalCtrl: ModalController,
    public modalController: ModalController,
    private orderService: OrderService,
    private FoodService: FoodService,
    private iab: InAppBrowser,
    private userService: UserModelService
  ) {}

  ngOnInit() {}

  dismissModal() {
    this.data = new orderTransationModel();
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  count(id, fun) {
    let i = 0;
    const temp = [...this.appSetting.orderDetailViewList];
    temp.forEach((x) => {
      i = i + 1;
      if (i === id) {
        if (fun === "add") {
          x.orderDetialModel.itemQty = x.orderDetialModel.itemQty + 1;
        } else {
          x.orderDetialModel.itemQty = x.orderDetialModel.itemQty - 1;
        }
        x.orderDetialModel.itemFinalPrice =
          this.calculatePrice(x.orderDetialModel.itemID) *
          x.orderDetialModel.itemQty;
        x.orderDetialModel.itemOrgPrice = x.orderDetialModel.itemFinalPrice;
      }
    });
  }

  delete(id) {
    let i = -1;
    const temp = [...this.appSetting.orderDetailViewList];
    temp.forEach((x) => {
      i = i + 1;
      if (i === id) {
        this.appSetting.orderDetailViewList.splice(i, 1);
      }
    });
  }

  calculatePrice(id): number {
    const temp = [...this.appSetting.menuFoodDataList];
    let res = 0;
    temp.forEach((x) => {
      if (x.id === id) {
        res = x.price;
      }
    });
    return res;
  }

  status = "";
  displayTotal = 0;
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    zoom: "no", //Android only ,shows browser zoom controls
    hideurlbar: "yes", //Or 'no'
  };
  total() {
    let total = 0;
    const temp = [...this.data.orderDetailModels];

    temp.forEach((x) => {
      total = total + x.itemFinalPrice;
    });

    this.status = this.data.orderModel.status;

    this.displayTotal = total;
  }

  loading = 0;
  riderID = 0;
  search() {
    this.loading = 1;
    this.orderService.getInvoice(this.invoiceNo, this.phoneNo).subscribe(
      (x) => (this.data = x),
      (err) => {
        this.appSetting.showInvalid();
      },
      () => {
        this.riderID = this.data.orderModel.riderID;
        this.food();
        this.loading=0
      }
    );
  }

  food() {
    if (this.appSetting.constFoodDataList.length === 0) {
      this.FoodService.getActive().subscribe(
        (x) => (this.appSetting.menuFoodDataList = x),
        (err) => this.appSetting.showError(err),
        () => {
          this.appSetting.constFoodDataList = this.appSetting.menuFoodDataList;

          this.total();
          this.loading = 0;
        }
      );
    } else {
      this.total();
      this.loading = 0;
    }
  }

  showMap() {
    this.appSetting.showLoading();
    this.getCustomerInfo();
  }

  googleMap(meltd, melng, clientLtd, clientLng) {
    const url = `https://www.google.com/maps/dir/${meltd},${melng}/${clientLtd},${clientLng}/@${clientLtd},${clientLng}`;
    let target = "_blank";
    const browser = this.iab.create(url, target, this.options);

    browser.on("loadstop").subscribe((event) => {
      browser.insertCSS({ code: "body{color: red;" });
    });
  }
  onClick() {
    
    let userLatitude = this.ltd;
    let userLongitude = this.lng;

    if (userLongitude === "" || userLatitude === "" || userLatitude === null) {
      this.appSetting.showInvalid();
    } else {
      this.appSetting.loadingClose();
      this.geolocation(userLatitude, userLongitude);
    }
  }

  geolocation(lat, long) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude.toString();
        let longitude = position.coords.longitude.toString();
        this.googleMap(latitude, longitude, lat, long);
      });
    }
  }

  ltd: String = "";
  lng: String = "";
  getCustomerInfo() {
    this.userService.getSingle(this.riderID).subscribe(
      (x) => {
        this.ltd = x.latitude;
        this.lng = x.longitude;
      },
      (err) => console.log(err),
      () => {
        this.onClick();
      }
    );
  }
}
