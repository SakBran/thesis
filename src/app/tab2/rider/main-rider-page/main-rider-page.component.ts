import { dailyReturnModel } from "./../../../Models/dailyReturnModel";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { DailyReturnService } from "src/app/Services/dailyReturn/daily-return.service";

@Component({
  selector: "app-main-rider-page",
  templateUrl: "./main-rider-page.component.html",
  styleUrls: ["./main-rider-page.component.scss"],
})
export class MainRiderPageComponent implements OnInit {
  constructor(
    private appSetting: appSetting,
    private datilyReturnService: DailyReturnService
  ) {
    
  }

  ngOnInit() {}
  refresh() {
   
  }
  dateData = new Date().toISOString();
  search() {
    if (this.dateData === "") {
      this.appSetting.showInvalid();
    } else {
      this.appSetting.showLoading();
      this.datilyReturnService
        .get(this.appSetting.sessionUserID, this.dateData)
        .subscribe(
          (x) => (this.data = x),
          (err) => this.appSetting.showError(err),
          () => {
          
            this.appSetting.loadingClose();
          }
        );
    }
  }

  data: dailyReturnModel = {
    deliverCharges: 0,
    debit: 0,
    credit: 0,
    openingBalance: 0,
    riderEarning: 0,
    dailyReturnAmount: 0,
  };
}
