import { ClientInfoComponent } from './../client-info/client-info.component';
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-client-shopcart",
  templateUrl: "./client-shopcart.component.html",
  styleUrls: ["./client-shopcart.component.scss"],
})
export class ClientShopcartComponent implements OnInit {
  constructor(
    public appSetting: appSetting,
    public modalCtrl: ModalController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.appSetting.orderDetailViewList);
  }

  dismissModal() {
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

  delete(id){
    let i = -1;
    const temp = [...this.appSetting.orderDetailViewList];
    temp.forEach((x) => {
      i = i + 1;
      if (i === id) {
        this.appSetting.orderDetailViewList.splice(i,1);
    
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

  total():number{
    let total=0;
    const temp=[...this.appSetting.orderDetailViewList];
    temp.forEach(x=>{
      total=total+x.orderDetialModel.itemFinalPrice;
    });
    return total;
  }

  async clientInfo() {
    const modal = await this.modalController.create({
      component: ClientInfoComponent,
      //,cssClass: 'my-custom-class'
    });
    
    return await modal.present();
  }
}
