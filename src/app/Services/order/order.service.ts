import { orderModel } from './../../Models/orderModel';
import { orderDetialModel } from "./../../Models/orderDetailModel";
import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { orderTransationModel } from "src/app/Models/orderTransationModel";
import { resendModel } from "src/app/Models/resendModel";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private url = `${this.appSetting.apiAddress}/api/orderModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(
    public modalCtrl: ModalController,
    private http: HttpClient,
    private appSetting: appSetting
  ) {}

  get(): Observable<orderTransationModel[]> {
    return this.http.get<orderTransationModel[]>(
      this.url + "/" + this.appSetting.sessionUserID
    );
  }
  getInvoice(
    orderID: number,
    clientPhone: string
  ): Observable<orderTransationModel> {
    const searchUrl = `${this.url}/client/invoice?orderID=${orderID}&clientPhone=${clientPhone}`;
    return this.http.get<orderTransationModel>(searchUrl);
  }
  getResturantOrder(): Observable<orderTransationModel[]> {
    console.log(
      this.url + "/resturant/orderTracking?id=" + this.appSetting.resturantID
    );
    return this.http.get<orderTransationModel[]>(
      this.url + "/resturant/orderTracking?id=" + this.appSetting.resturantID
    );
  }
  getResturantPendings(id: number): Observable<orderTransationModel[]> {
    const searchUrl = `${this.url}/resturant/pendings?ResturantID=${id}`;
    return this.http.get<orderTransationModel[]>(searchUrl);
  }

  getResturantComplete(id: number): Observable<orderTransationModel[]> {
    const searchUrl = `${this.url}/resturant/complete?ResturantID=${id}`;
    return this.http.get<orderTransationModel[]>(searchUrl);
  }

  getRiderComplete(): Observable<orderTransationModel[]> {
    const searchUrl = `${this.url}/rider/complete?id=${this.appSetting.sessionUserID}`;
    return this.http.get<orderTransationModel[]>(searchUrl);
  }

  getRiderPending(): Observable<orderTransationModel[]> {
    const searchUrl = `${this.url}/rider/pending?id=${this.appSetting.sessionUserID}`;
    return this.http.get<orderTransationModel[]>(searchUrl);
  }

  post(data: orderTransationModel): void {
    data.orderModel.operatorID = this.appSetting.sessionUserID;
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
        
        this.appSetting.orderTransationClear();
        this.modalCtrl.dismiss({
          dismissed: true,
        });

        this.appSetting.showSuccess();
        this.modalCtrl.dismiss({
          dismissed: true,
        });
      },
      (err) => {
        this.appSetting.showError(err);
      }
    );
  }

  put(data: orderModel): void {
    const searchUrl = `${this.url}/${data.id}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  putOrderDetail(data: orderDetialModel): void {
    const searchUrl = `${this.appSetting.apiAddress}/api/orderDetailModels/${data.orderDetailID}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  putResend_From_Resturant(orderID,updateData:orderModel, data: resendModel[]): void {
    console.log(orderID,data);
    //const searchUrl = `${this.url}/resturant/resend?id=${orderID}&ResturantID=${this.appSetting.resturantID}`;
    const searchUrl = `${this.url}/resturant/resend?id=${orderID}&ResturantID=${0}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        let i = -1;
        const temp = [...this.appSetting.orderTransationList];
        let aClone:orderTransationModel[]=temp.filter(x=>{
          if(x.orderModel.id===orderID){
            x.orderDetailModels.forEach(y=>{
              y.status="yes";
            })
            return x;
          }
        });
        this.appSetting.orderTransationList=[...temp.filter(x=>x.orderModel.id!==orderID)];
        aClone.forEach(x=>{
          this.appSetting.orderTransationList.push(x);
        })

      /*  temp.forEach((x) => {
          i = i + 1;
          if (x.orderModel.id === orderID) {
            this.appSetting.orderTransationList.splice(i, 1);
          }
        });*/
        this.put(updateData);
        this.appSetting.showSuccess();
        this.appSetting.resendListFromResturant = [];
      },
      (err) => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  delete(id: number): void {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        
      }
    });

    xhr.open("DELETE", this.url + "/" + id);

    xhr.send(data);
  }

  deleteOrderDetail(id: number): void {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        
      }
    });

    xhr.open(
      "DELETE",
      `${this.appSetting.apiAddress}/api/orderDetailModels/` + id
    );

    xhr.send(data);
  }
}
