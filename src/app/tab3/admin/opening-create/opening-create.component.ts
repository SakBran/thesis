import { userModel } from 'src/app/Models/userModel';
import { UserModelService } from 'src/app/Services/userModel/user-model.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { appSetting } from 'src/app/app-setting';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OpeningBalanceModel } from 'src/app/Models/openingBalanceModel';
import { OpeningBalanceService } from 'src/app/Services/openingBalance/opening-balance.service';

@Component({
  selector: 'app-opening-create',
  templateUrl: './opening-create.component.html',
  styleUrls: ['./opening-create.component.scss'],
})
export class OpeningCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  constructor(public location: Location,
    public appSetting: appSetting,
    private OpeningBalanceService: OpeningBalanceService,
    private riderSelectService:UserModelService,
    private route: Router,
    private Router: ActivatedRoute) { 
      this.riderFilter();
    }


  ngOnInit() {

    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }
  back() {
    this.location.back();
  }

  resData: OpeningBalanceModel = {
    id: 0,
    openingAmount:0,
    openingAmount_date:new Date(),
    operatorID:this.appSetting.sessionUserID,
    riderID:0
  };

  riderList:userModel[]=[];
    riderFilter(){
    let temp1:userModel[]=[];
    this.riderSelectService.get().subscribe(x=>temp1=x,err=>this.appSetting.showError(err),()=>{
    const temp2=temp1;
    temp2.forEach(x=>{
      if(x.usertype===3){
        this.riderList.push(x);
      }
    })
    })
  }
  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.OpeningBalanceService.getSingle(id).subscribe(
        (x) => (this.resData = x),
        (err) => this.appSetting.showError(err),
        () => this.appSetting.loadingClose()
      );
    }
    else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (
      this.resData.openingAmount === 0||
      this.resData.operatorID === 0||
      this.resData.riderID ===  0

    ) {
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.OpeningBalanceService.post(this.resData);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.OpeningBalanceService.put(this.resData);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
}
