import { orderDetialModel } from "./../../../Models/orderDetailModel";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit, Input } from "@angular/core";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { resendModel } from "src/app/Models/resendModel";
import { OrderService } from "src/app/Services/order/order.service";
import Swal from "sweetalert2";
import { DeliveryRecordService } from "src/app/Services/deliveryRecord/delivery-record.service";
import { deliveryRecordModel } from "src/app/Models/deliveryRecordModel";
import { orderModel } from "src/app/Models/orderModel";

@Component({
  selector: "app-resturant-individual-order",
  templateUrl: "./resturant-individual-order.component.html",
  styleUrls: ["./resturant-individual-order.component.scss"],
})
export class ResturantIndividualOrderComponent implements OnInit {
  @Input("orderNo")public Orderid: number;
  public itemVisible: boolean = false;
  public data: orderTransationModel = new orderTransationModel();
  invoiceNo = 0;
  constructor(
    public appSetting: appSetting,
    private orderService: OrderService,
    private DeliveryRecordService: DeliveryRecordService
  ) {}

  ngOnInit() {
    this.itemFilter();
  }

  async itemFilter() {
    const temp = [...this.appSetting.orderTransationList];
    temp.forEach((x) => {
      if (x.orderModel.id === this.Orderid) {
        this.data = x;
        this.selectedCard=this.data.orderModel.riderTakeOption;
      }
    });
  }

  total(): number {
    let total = 0;
    this.data.orderDetailModels.forEach((x) => {
      this.invoiceNo = x.orderID;
      total = total + x.itemFinalPrice;
    });
    this.appSetting.orderTransationList.forEach((x) => {
      if (x.orderModel.id === this.Orderid) {
        total = total + x.orderModel.deliveryCharegs;
      }
    });

    return total;
  }
  itemVisibleMethod() {
    if (this.itemVisible === false) {
      this.itemVisible = true;
    } else {
      this.itemVisible = false;
    }
  }

  status(): string {
    let result = "yes";
    const temp: orderTransationModel = this.data;
    temp.orderDetailModels.forEach((x) => {
      if (x.status === "pending") {
        result = x.status;
      } else if (x.status === "no") {
        result = x.status;
      }
    });
    return result;
  }
  recordData: deliveryRecordModel = {
    id: 0,
    orderID: 0,
    resturant: 0,
    resurant_date: new Date(),
    customer: false,
    customer_date: new Date(),
  };

  delivryRecordSave(id) {
    this.recordData.orderID = id;
    this.recordData.resturant = 0;
    this.appSetting.showLoading();

    this.DeliveryRecordService.put(this.recordData);
  }
  sendToServer() {
    if (this.appSetting.loginType === "admin") {
      this.appSetting.showLoading();
      const temp = [...this.appSetting.resendListFromResturant];
      let dataList: resendModel[] = [];
      temp.forEach((x) => {
        if (x.orderNo === this.invoiceNo) {
          dataList.push(x);
        }
      });

      this.orderService.putResend_From_Resturant(this.invoiceNo,this.data.orderModel, dataList);
    } /*else if (this.appSetting.loginType === "admin") {
      this.appSetting.showLoading();
      const temp = [...this.appSetting.resendListFromResturant];
      let dataList: resendModel[] = [];
      temp.forEach((x) => {
        if (x.orderNo === this.invoiceNo) {
          dataList.push(x);
        }
      });*/
      //this.orderService.putResend_From_Resturant(this.invoiceNo, dataList);
      //Resend function from Admin to resturant}
     else if (this.appSetting.loginType === "rider") {
      this.appSetting.showLoading();
      this.DeliveryRecordService.putRider(this.Orderid);
      //this.orderService.putResend_From_Resturant(this.invoiceNo, dataList);
      //Resend function from Admin to resturant
    }
  }

  onDelete(id) {
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
        this.orderService.delete(id);
        const temp: orderTransationModel[] = [
          ...this.appSetting.orderTransationList,
        ];
        let i = -1;
        temp.forEach((x) => {
          i = i + 1;
          if (x.orderModel.id === id) {
            this.appSetting.orderTransationList.splice(i, 1);
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  selectedCard=""
  changeModel(status){
    this.selectedCard=status.toLocaleLowerCase();
    this.data.orderModel.riderTakeOption=this.selectedCard;
  }
}
