import { LocationService } from "./../../../Services/location/location.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { appSetting } from "src/app/app-setting";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { resturantModel } from "src/app/Models/resturantModel";
import { ResturantModelService } from "./../../../Services/resturantModel/resturant-model.service";
import { locationModel } from "src/app/Models/locationModel";

@Component({
  selector: "app-resturant-create",
  templateUrl: "./resturant-create.component.html",
  styleUrls: ["./resturant-create.component.scss"],
})
export class ResturantCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private ResturantModelService: ResturantModelService,
    private route: Router,
    private LocationService: LocationService,
    private Router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.locationCharges();
    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }

  locationData: locationModel[] = [];
  locationCharges() {
    this.appSetting.showLoading();
    this.LocationService.get().subscribe(
      (x) => {
        this.locationData = x;
      },
      (err) => console.log(err),
      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  back() {
    this.location.back();
  }

  credit: string = "credit";
  debit: string = "debit";
  resData: resturantModel = {
    id: 0,
    username: "",
    password: "",
    phone: "",
    usertype: 2,
    locationID: 0,
    latitude: "0",
    longitude: "0",
    shopname: "",
    resturantType: "debit",
  };
  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.ResturantModelService.getSingle(id).subscribe(
        (x) => (this.resData = x),
        (err) => this.appSetting.showError(err),
        () => this.appSetting.loadingClose()
      );
    } else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (
      this.resData.password === "" ||
      this.resData.phone === "" ||
      this.resData.username === "" ||
      this.resData.usertype === 0 ||
      this.resData.shopname === ""
    ) {
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.ResturantModelService.post(this.resData);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.ResturantModelService.put(this.resData);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
}
