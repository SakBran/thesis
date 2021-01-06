import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { mainModel } from "src/app/Models/mainModel";
import { UploadService } from "../upload/upload.service";

@Injectable({
  providedIn: "root",
})
export class MainModelService {
  private url = `${this.appSetting.apiAddress}/api/mainModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(
    private uploadService: UploadService,
    private http: HttpClient,
    private appSetting: appSetting
  ) {}

  get(): Observable<mainModel[]> {
    return this.http.get<mainModel[]>(`${this.url}`);
  }
  getSingle(id: number): Observable<mainModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<mainModel>(searchUrl);
  }
  post(data: mainModel, imageData): void {
    let temp: mainModel = new mainModel();
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
        temp = Object.assign(res);
        this.appSetting.mainItemDataList.push(temp);
        this.uploadService.post(imageData, "MainImage" + temp.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  put(data: mainModel, imageData): void {
    const searchUrl = `${this.url}/${data.id}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      (res) => {
        const temp=[...this.appSetting.mainItemDataList.filter(x=>x.id!==data.id)];
        temp.push(data);
        this.appSetting.mainItemDataList=[...temp];
        
        this.uploadService.post(imageData, "MainImage" + data.id);
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
    const temp=[...this.appSetting.mainItemDataList.filter(x=>x.id!==data.id)];  
    this.appSetting.mainItemDataList=[...temp];
  }
}
