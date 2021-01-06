import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { appSetting } from "src/app/app-setting";
import { LocationService } from "src/app/Services/location/location.service";
import { Location } from "@angular/common";
import { locationModel } from "src/app/Models/locationModel";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationListComponent implements OnInit {
  locationDataList: locationModel[] = [];
  constructor(
    public location: Location,
    public appSetting: appSetting,
    public LocationService: LocationService,
    private route: Router
  ) {}

  ngOnInit() {
    this.dataLoading();
  }

  back() {
    this.location.back();
  }
  dataLoading() {
    this.LocationService.get().subscribe(
      (x) => {
        this.appSetting.showLoading();
        this.locationDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  refresh(event) {
    this.LocationService.get().subscribe(
      (x) => {
        this.locationDataList = x;
      },
      (err) => {
        this.appSetting.showError(err);
        event.target.complete();
      },

      () => {
        if (event !== undefined || event !== null) {
          event.target.complete();
        }
      }
    );
  }

  onEdit(id) {
    this.route.navigateByUrl("managmenet/tabs/tab3/locationEdit/" + id);
  }

  onDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.LocationService.delete(id);
        this.locationDataList.splice(id, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
