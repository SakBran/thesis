import { orderDetialModel } from 'src/app/Models/orderDetailModel';
import { orderTransationModel } from './../../../Models/orderTransationModel';
import { itemRest } from './../../../app-setting';
import { orderDetialViewmodel } from './../../../Models/orderDetailViewmodel';
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { foodModel } from "src/app/Models/foodModel";
import { Location } from "@angular/common";
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-pending-item-edit',
  templateUrl: './pending-item-edit.component.html',
  styleUrls: ['./pending-item-edit.component.scss'],
})
export class PendingItemEditComponent implements OnInit {
  foodData = new foodModel();
  orderDetail: orderDetialModel = {
    orderDetailID: 0,
    itemID: 0,
    itemQty: 1,
    itemOrgPrice: 0,
    discount: 0,
    itemFinalPrice: 0,
    orderID: 0,
    status:'no',
    remark: "",
    comment:"",
    isPickUpResturant:false,
    isPickUpRider:false
  };

  id=+this.Router.snapshot.paramMap.get("id");
  constructor(
    public appSetting: appSetting,
    private Router: ActivatedRoute,
    private location: Location,
    private route:Router,
    private orderService:OrderService
  ) {
    this.id=+this.Router.snapshot.paramMap.get("id");
    this.foodData = this.loadData(this.id);
   
  }

  back() {
    this.location.back();
  }
  loadData(id): foodModel {
    let result = new foodModel();
    let i=-1;
    const temp:orderTransationModel[]=this.appSetting.orderTransationList;
    temp.forEach((x) => {
     
      x.orderDetailModels.forEach(
        y=>{
          if(y.orderDetailID===id){
            this.orderDetail=y;
            result=this.loadFoodData(y.itemID);
          }
        }
      )
    });
    return result;
  }

  loadFoodData(id): foodModel {
    let result = new foodModel();
    const temp=[...this.appSetting.menuFoodDataList]
    temp.forEach((x) => {


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
    this.appSetting.showLoading();
    if(this.validation()){
      let itemJ:itemRest=this.appSetting.itemJoin(this.foodData.id);
      this.orderDetail.status='no';
      this.orderService.putOrderDetail(this.orderDetail);
      
    }
  }
  ngOnInit() {}
}

