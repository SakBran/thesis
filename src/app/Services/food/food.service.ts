import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { foodModel } from "src/app/Models/foodModel";
import { UploadService } from "../upload/upload.service";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  private url = `${this.appSetting.apiAddress}/api/foodModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(
    private http: HttpClient,
    private uploadService: UploadService,
    private appSetting: appSetting
  ) {}

  get(id: number): Observable<foodModel[]> {
    return this.http.get<foodModel[]>(
      this.url + `/resturant?ResturantID=${id}`
    );
  }

  getPending(): Observable<foodModel[]> {
    return this.http.get<foodModel[]>(this.url + `/pending`);
  }

  getActive(): Observable<foodModel[]> {
    return this.http.get<foodModel[]>(this.url + `/active`);
  }

  getSingle(id: number): Observable<foodModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<foodModel>(searchUrl);
  }
  post(data: foodModel, imageData): void {
    let temp: foodModel = new foodModel();
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
        temp = Object.assign(res);
      
        this.uploadService.post(imageData, "Image" + temp.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  put(data: foodModel): void {
    let temp: foodModel = new foodModel();
    const searchUrl = `${this.url}/${data.id}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      () => {
        this.refreshArray(data.id, data);
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  putConfirm(id, result): void {
    this.appSetting.showLoading();
    const searchUrl = `${this.url}/confirm?keyID=${id}&result=${result}`;
    let data: foodModel = new foodModel();
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        this.refreshArray(id);
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
    this.refreshArray(id);
  }

  private refreshArray(id: number, data?: foodModel) {
    let i = -1;
    this.appSetting.foodDataList.forEach((x) => {
      i++;
      if (x.id === id) {
        x.status = "delete";
        console.log(data);
        try {
          if (data !== null || data !== undefined) {
            x.itemName = data.itemName;
            x.price = data.price;
            x.itemNameTemp = data.itemNameTemp;
            x.priceTemp = data.priceTemp;
          }
        } catch (ex) {
          console.log(JSON.stringify(ex));
        }
      }
    });
  }
}
