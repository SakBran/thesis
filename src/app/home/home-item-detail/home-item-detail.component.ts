import { appSetting, itemRest } from "./../../app-setting";
import { foodModel } from "./../../Models/foodModel";
import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { orderDetialModel } from "src/app/Models/orderDetailModel";
import { orderDetialViewmodel } from "src/app/Models/orderDetailViewmodel";

@Component({
  selector: "app-home-item-detail",
  templateUrl: "./home-item-detail.component.html",
  styleUrls: ["./home-item-detail.component.scss"],
})
export class HomeItemDetailComponent implements OnInit {
  foodData: foodModel = new foodModel();
  
  foodList:foodModel[]=[];
  constructor(
    public modalCtrl: ModalController,
    public appSetting: appSetting
  ) {
    this.foodData.id=0;
    this.editOnload(this.appSetting.detailID);
  }

  ngOnInit() {
    this.orderDetail.itemOrgPrice=this.foodData.price;
    this.orderDetail.itemFinalPrice=this.foodData.price;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.appSetting.orderData.latitude = position.coords.latitude.toString();
        this.appSetting.orderData.longitude = position.coords.longitude.toString();
    
      });
    }
  }

  orderDetail: orderDetialModel = {
    orderDetailID: 0,
    itemID: this.foodData.id,
    itemQty: 1,
    itemOrgPrice: this.foodData.price,
    discount: 0,
    itemFinalPrice: this.foodData.price,
    orderID: 0,
    status: "no",
    remark: "",
    comment: "",
    isPickUpResturant: false,
    isPickUpRider: false,
  };

  count(e) {
    if (e === "add") {
      this.orderDetail.itemQty = this.orderDetail.itemQty + 1;
      
    } else if (e === "minus") {
      this.orderDetail.itemQty = this.orderDetail.itemQty - 1;
    }
    this.orderDetail.itemFinalPrice=this.foodData.price*this.orderDetail.itemQty;
  }
  AddtoCart() {
    this.orderDetail.itemID = this.foodData.id;
    let itemJ: itemRest = this.appSetting.itemJoin(this.foodData.id);
    this.appSetting.orderDetailList.push(this.orderDetail);
    let temp: orderDetialViewmodel = {
      orderDetialModel: this.orderDetail,
      itemName: itemJ.itemName,
      resturantName: itemJ.resturant,
    };
    this.appSetting.orderDetailViewList.push(temp);
    this.dismissModal();
  }

  editOnload(id) {
    this.appSetting.menuFoodDataList.forEach((x) => {
      if (x.mainitem_id === id) {
        this.foodList.push(x);
      }
    });
  }

  selectedCard=0;
  changeModel(id){
    const temp:foodModel[]=[...this.foodList];
    this.selectedCard=id;
    temp.forEach(x=>{
      if(x.id===id){
        this.foodData=x;
        this.orderDetail.itemFinalPrice=this.foodData.price*this.orderDetail.itemQty;
      }
    })
  }
  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
