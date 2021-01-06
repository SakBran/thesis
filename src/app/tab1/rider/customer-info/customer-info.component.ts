import { Component, OnInit } from "@angular/core";
import { appSetting } from "./../../../app-setting";
import { Router, ActivatedRoute } from "@angular/router";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { orderModel } from "src/app/Models/orderModel";
import { Location } from "@angular/common";
import { InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { LocationDBService } from "src/app/Services/locationDB/location-db.service";
@Component({
  selector: "app-customer-info",
  templateUrl: "./customer-info.component.html",
  styleUrls: ["./customer-info.component.scss"],
})
export class CustomerInfoComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    public location: Location,
    private iab: InAppBrowser,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get("id");
  }
  id = 0;
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    zoom: "no", //Android only ,shows browser zoom controls
    hideurlbar: "yes", //Or 'no'
  };
  ngOnInit() {
    this.getCustomerInfo();
  }
  orderData: orderModel = new orderModel();
  back() {
    this.location.back();
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
    this.appSetting.showLoading();
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

  ltd:String='';
  lng:String='';
  getCustomerInfo() {
    const temp: orderTransationModel[] = this.appSetting.orderTransationList;
    temp.forEach((x) => {
      if (x.orderModel.id === this.id) {
        this.orderData = x.orderModel;
        this.ltd=this.orderData.latitude;
        this.lng=this.orderData.longitude;
      }
      }
    );
  }
}
