import { RiderEarningService } from './../../../Services/riderEarning/rider-earning.service';
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { riderEarningModel } from 'src/app/Models/riderEarningModel';
@Component({
  selector: 'app-rider-earning-create',
  templateUrl: './rider-earning-create.component.html',
  styleUrls: ['./rider-earning-create.component.scss'],
})
export class RiderEarningCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private RiderEarningService: RiderEarningService,
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

  riderEarningData: riderEarningModel = {
    id: 0,
    deliveryCharges: 0,
    riderEarning: 0,
  };
  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.RiderEarningService.getSingle(id).subscribe(
        (x) => (this.riderEarningData = x),
        (err) => this.appSetting.showError(err),
        () => this.appSetting.loadingClose()
      );
    } else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (
      this.riderEarningData.deliveryCharges === 0 
    ) {
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.RiderEarningService.post(this.riderEarningData);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.RiderEarningService.put(this.riderEarningData);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
}
