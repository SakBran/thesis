import { itemRest } from './../../../app-setting';
import { orderDetialViewmodel } from './../../../Models/orderDetailViewmodel';
import { orderDetialModel } from "./../../../Models/orderDetailModel";
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { foodModel } from "src/app/Models/foodModel";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-to-invoice",
  templateUrl: "./add-to-invoice.component.html",
  styleUrls: ["./add-to-invoice.component.scss"],
})
export class AddToInvoiceComponent implements OnInit {
  foodData = new foodModel();
  orderDetail: orderDetialModel = {
    orderDetailID: 0,
    itemID: this.foodData.id,
    itemQty: 1,
    itemOrgPrice: 0,
    discount: 0,
    itemFinalPrice: 0,
    orderID: 0,
    status:'pending',
    remark: "",
    comment:"",
    isPickUpResturant:false,
    isPickUpRider:false
  };
  constructor(
    public appSetting: appSetting,
    private Router: ActivatedRoute,
    private location: Location,
    private route:Router
  ) {
    this.foodData = this.loadData(+this.Router.snapshot.paramMap.get("id"));
  }

  back() {
    this.location.back();
  }
  loadData(id): foodModel {
    let result = new foodModel();
    
    this.appSetting.constFoodDataList.forEach((x) => {
      if (x.id === id) {
        result = x;
      }
    });
    return result;
  }

  totalAmount(): string {
    if (this.orderDetail.itemQty !== 0) {
      this.orderDetail.itemOrgPrice =
        this.orderDetail.itemQty * this.foodData.price;
      this.orderDetail.itemFinalPrice =
        this.orderDetail.itemOrgPrice - this.orderDetail.discount;
      return this.orderDetail.itemFinalPrice.toString();
    } else {
      return "0";
    }
  }

  validation():boolean{
    if(this.orderDetail.itemQty===0){
      return false;
    }
    return true;
  }
  addToInvoice(){
    if(this.validation()){
      this.orderDetail.itemID= this.foodData.id;
      let itemJ:itemRest=this.appSetting.itemJoin(this.foodData.id);
      this.appSetting.orderDetailList.push(this.orderDetail);
      let temp:orderDetialViewmodel={
        orderDetialModel:this.orderDetail,
        itemName:itemJ.itemName,
        resturantName:itemJ.resturant
      }
      this.appSetting.orderDetailViewList.push(temp);
    }
    this.route.navigateByUrl('/tabs/tab1');
  }
  ngOnInit() {}
}
