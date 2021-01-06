import { Component, OnInit } from "@angular/core";
import { locationModel } from "src/app/Models/locationModel";
import { appSetting } from "src/app/app-setting";
import { Router, ActivatedRoute } from "@angular/router";
import { LocationService } from "src/app/Services/location/location.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-location-create",
  templateUrl: "./location-create.component.html",
  styleUrls: ["./location-create.component.scss"],
})
export class LocationCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private LocationService: LocationService,
    private route: Router,
    private Router: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }
  back() {
    this.location.back();
  }

  locationData: locationModel = {
    id: 0,
    TownShip: "",
    Zone: "",
    deliveryCharges: 0,
    riderEarning: 0,
  };
  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.LocationService.getSingle(id).subscribe(
        (x) => (this.locationData = x),
        (err) => this.appSetting.showError(err),
        () => this.appSetting.loadingClose()
      );
    } else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (
      this.locationData.TownShip === "" ||
      this.locationData.deliveryCharges === 0 
    ) {
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.LocationService.post(this.locationData);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.LocationService.put(this.locationData);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
}
