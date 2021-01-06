import { orderModel } from './../../../Models/orderModel';
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
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
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

  id=+this.Router.snapshot.paramMap.get("id");
  constructor(
    public appSetting: appSetting,
    private Router: ActivatedRoute,
    private location: Location,
    private route:Router
  ) {
    this.id=+this.Router.snapshot.paramMap.get("id");
    this.foodData = this.loadData(this.id);
   
  }

  back() {
    this.route.navigateByUrl('/tabs/tab2');
  }
  loadData(id): foodModel {
    let result = new foodModel();
    let i=-1;
    const temp=[...this.appSetting.orderDetailList];
    temp.forEach((x) => {
      i=i+1;

      if(i===id){
        
        result=this.loadFoodData(x.itemID);
        this.orderDetail=x;
      }
    });
    return result;
  }

  loadFoodData(id): foodModel {
    let result = new foodModel();
    const temp=[...this.appSetting.constFoodDataList]
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
    if(this.validation()){
      let itemJ:itemRest=this.appSetting.itemJoin(this.foodData.id);
    
      let i=-1;
      this.appSetting.orderDetailList.forEach(x=>{
        i=i+1;
        if(i===this.id){
          x=this.orderDetail;
        }
      });
      let temp:orderDetialViewmodel={
        orderDetialModel:this.orderDetail,
        itemName:itemJ.itemName,
        resturantName:itemJ.resturant
      }
      let z=-1;
      this.appSetting.orderDetailViewList.forEach(x=>{
        z=z+1;
        if(z===this.id){
          x=temp;

        }
      });
      
    }
    this.route.navigateByUrl('/tabs/tab2');
  }
  ngOnInit() {}
}

