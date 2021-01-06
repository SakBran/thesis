import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { appSetting } from 'src/app/app-setting';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RiderEarningService } from 'src/app/Services/riderEarning/rider-earning.service';
import { riderEarningModel } from 'src/app/Models/riderEarningModel';

@Component({
  selector: 'app-rider-earning-list',
  templateUrl: './rider-earning-list.component.html',
  styleUrls: ['./rider-earning-list.component.scss'],
})
export class RiderEarningListComponent implements OnInit {
  DataList: riderEarningModel[] = [];
  constructor(
    public location: Location,
    public appSetting: appSetting,
    public riderEarningService: RiderEarningService,
    private route: Router
  ) {}

  ngOnInit() {
    this.dataLoading();
  }

  back() {
    this.location.back();
  }
  dataLoading() {
    this.riderEarningService.get().subscribe(
      (x) => {
        this.appSetting.showLoading();
        this.DataList = x;
      },
      (err) => this.appSetting.showError(err),

      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  refresh(event) {
    this.riderEarningService.get().subscribe(
      (x) => {
        this.DataList = x;
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
    this.route.navigateByUrl("managmenet/tabs/tab3/riderEarningEdit/" + id);
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
        this.riderEarningService.delete(id);
        this.DataList.splice(id, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
