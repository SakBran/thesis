import { Router } from '@angular/router';
import { ResturantModelService } from "./../../../Services/resturantModel/resturant-model.service";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { resturantModel } from "src/app/Models/resturantModel";
import Swal from 'sweetalert2';

@Component({
  selector: "app-resturant-list",
  templateUrl: "./resturant-list.component.html",
  styleUrls: ["./resturant-list.component.scss"],
})
export class ResturantListComponent implements OnInit {
  resDataList: resturantModel[] = [];
  constructor(
    public location: Location,
    public appSetting: appSetting,
    public ResturantModelService: ResturantModelService,
    private route: Router
  ) { 
    this.dataLoading();
  }

  ngOnInit() {
    
  }
  back() {
    this.location.back();
  }
  dataLoading() {
    this.appSetting.showLoading();
    this.ResturantModelService.get().subscribe(
      (x) => {
        
        this.resDataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  refresh(event) {
    this.ResturantModelService.get().subscribe(
      (x) => {
        this.resDataList = x;
      },
      (err) => { this.appSetting.showError(err); event.target.complete(); },

      () => {
        if (event !== undefined || event !== null) {
          event.target.complete();
        }
      }
    );
  }

  onEdit(id) {
    this.route.navigateByUrl("managmenet/tabs/tab3/resturantEdit/" + id);
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
        this.ResturantModelService.delete(id);
        this.resDataList.splice(id, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
