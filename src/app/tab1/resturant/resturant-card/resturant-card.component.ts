import { mainModel } from 'src/app/Models/mainModel';
import { OrderService } from 'src/app/Services/order/order.service';
import { appSetting } from 'src/app/app-setting';

import { Component, OnInit, Input } from '@angular/core';
import { orderDetialModel } from 'src/app/Models/orderDetailModel';
import { resendModel } from 'src/app/Models/resendModel';
import Swal from 'sweetalert2';
import { orderTransationModel } from 'src/app/Models/orderTransationModel';
import { resturantCardViewmodel } from 'src/app/Models/rescturantCardViewmodel';

@Component({
  selector: 'app-resturant-card',
  templateUrl: './resturant-card.component.html',
  styleUrls: ['./resturant-card.component.scss'],
})
export class ResturantCardComponent implements OnInit {
@Input('data') orderDetail:orderDetialModel;
comment:string="";
  constructor(public appSetting:appSetting,private orderService:OrderService) { 
    
  }
  available:boolean=true;
  ngOnInit() {
    //console.log(this.appSetting.constmainItemDataList);
  }
 
  resendListKeyPress(e){
    let data:resendModel={
      orderDetailID:this.orderDetail.orderDetailID,
      comment:this.comment,
      orderNo:this.orderDetail.orderID,
      resturantID:this.appSetting.resturantID
    }
    let i=-1;
      const temp=[...this.appSetting.resendListFromResturant];
      temp.forEach(x=>{
        i=i+1;
        if(x.orderNo===data.orderNo && x.orderDetailID===data.orderDetailID){
          this.appSetting.resendListFromResturant[i].comment=this.comment;
        }
      });
      
  }
  resendListFun(e){
    let data:resendModel={
      orderDetailID:this.orderDetail.orderDetailID,
      comment:this.comment,
      orderNo:this.orderDetail.orderID,
      resturantID:this.appSetting.resturantID
    }
    if(this.available===false){
   
     this.appSetting.resendListFromResturant.push(data);
    }else{
      
      let i=-1;
      const temp=[...this.appSetting.resendListFromResturant];
      temp.forEach(x=>{
        i=i+1;
        if(x.orderNo===data.orderNo && x.orderDetailID===data.orderDetailID){
          this.appSetting.resendListFromResturant.splice(i,1);
        }
      })
    }
    
  }
  //For Food Descriptions
  foodName(id):string{
    let result="";
    const temp=[...this.appSetting.foodDataList];
    temp.forEach(x=>{
      
      if(x.id===id){
       
        result=x.itemName;
      }
    });
    return result;
  }

  //For Main Name
  foodDescription(id):resturantCardViewmodel{
    let res:resturantCardViewmodel=new resturantCardViewmodel();
    const temp=[...this.appSetting.foodDataList];
    const main=[...this.appSetting.constmainItemDataList];
    //console.log(main);
    temp.forEach(x=>{
      if(x.id===id){
        let mainData:mainModel=main.filter(r=>r.id===x.mainitem_id)[0];
        if(mainData)
        {
          res.main=mainData.name;
        }
        else{
          res.main="";
        }
        res.secondary=x.itemName;
        res.resturant=this.appSetting.resName(x.resturant_id);
        
      }
    });
    //console.log(res);
    return res;
  }
  //For Resturant Name


  onDelete(id){
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
        this.orderService.deleteOrderDetail(id);
        this.orderService
      .get()
      .subscribe(
        (x) => {
          this.appSetting.orderTransationList = x;
        },
        (err) => this.appSetting.showError(err),
        () => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      );
        
      }
    });
  }
  
}
