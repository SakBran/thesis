import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { deliveryRecordModel } from "src/app/Models/deliveryRecordModel";
import { orderTransationModel } from "src/app/Models/orderTransationModel";

@Injectable({
  providedIn: "root",
})
export class DeliveryRecordService {
  private url = `${this.appSetting.apiAddress}/api/deliveryRecordModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient, private appSetting: appSetting) {}

  get(): Observable<deliveryRecordModel[]> {
    return this.http.get<deliveryRecordModel[]>(this.url);
  }
  getSingle(id: number): Observable<deliveryRecordModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<deliveryRecordModel>(searchUrl);
  }
  post(data: deliveryRecordModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
      
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
      }
    );
  }
putRider(orderID:number){
  let data=null;
  const searchUrl = `${this.appSetting.apiAddress}/api/deliveryRecordModel/rider?orderID=${orderID}`;
  this.http.put(searchUrl, data, this.httpOptions).subscribe(
    (res) => {
      
      let i = -1;
      const temp: orderTransationModel[] = [
        ...this.appSetting.orderTransationList,
      ];
      temp.forEach((x) => {
        i = i + 1;
        if (x.orderModel.id === orderID) {
          this.appSetting.orderTransationList.splice(i, 1);
        }
      });
      this.appSetting.showSuccess();
    },
    (err) => {
      console.log(err);
      this.appSetting.showError(err);
    }
  );
}

  put(data: deliveryRecordModel): void {
    const searchUrl = `${this.url}/${data.orderID}?ResturantID=${this.appSetting.resturantID}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        
        let i = -1;
        const temp: orderTransationModel[] = [
          ...this.appSetting.orderTransationList,
        ];
        temp.forEach((x) => {
          i = i + 1;
          if (x.orderModel.id === data.orderID) {
            this.appSetting.orderTransationList.splice(i, 1);
          }
        });
        this.appSetting.showSuccess();
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
}
