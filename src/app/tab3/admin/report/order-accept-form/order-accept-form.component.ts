import { orderAcceptModel } from './../../../../Models/orderAccpetModel';
import { Component, OnInit } from '@angular/core';
import { OrderAceptService } from 'src/app/Services/Report/orderAcept/order-acept.service';

@Component({
  selector: 'app-order-accept-form',
  templateUrl: './order-accept-form.component.html',
  styleUrls: ['./order-accept-form.component.scss'],
})
export class OrderAcceptFormComponent implements OnInit {

  dataList:orderAcceptModel[]=[];
  startDate:Date=new Date();
  endDate:Date=new Date();
  constructor(private orderAcceptService:OrderAceptService) {
   
    this.orderAcceptService.get(this.date2String(this.startDate),this.date2String(this.endDate)).subscribe(x=>{
      this.dataList=x
    })
   }

  ngOnInit() {}

  click(){
   this.orderAcceptService.get(this.date2String(this.startDate),this.date2String(this.endDate)).subscribe(x=>
      this.dataList=x,err=>console.log(err),()=>{console.log(this.dataList)}
    );
    
   
  }

  date2String(data:Date):string{
    const x:Date=new Date(data);
    let month:string="00";
    let date:string="00";
    if(x.getMonth()+1<10){
      month=`0${(x.getMonth()+1).toString()}`
    }else{
      month=(x.getMonth()+1).toString();
    }
    if(x.getDate()<10){
      date=`0${x.getDate().toString()}`
    }else{
      date=x.getDate().toString();
    }
    const startDate:string=`${x.getFullYear().toString()}-${month}-${date}`;
    return startDate;
  }
}
