import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { locationDBModel } from "src/app/Models/locationDBModel";

@Injectable({
  providedIn: 'root'
})
export class LocationDBService {

  private url = `${this.appSetting.apiAddress}/api/locationDatabaseModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient, private appSetting: appSetting) {}

  get(): Observable<locationDBModel[]> {
    return this.http.get<locationDBModel[]>(this.url);
  }
  getSingle(flatNo: number,township_id): Observable<locationDBModel> {
    const searchUrl = `${this.url}/?township_id=${township_id}&flatNo=${flatNo}`;
    return this.http.get<locationDBModel>(searchUrl);
  }
  post(data: locationDBModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
        
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  put(data: locationDBModel): void {
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
