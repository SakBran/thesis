import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { categoryModel } from "src/app/Models/categoryModel";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${this.appSetting.apiAddress}/api/apicategoryModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient, private appSetting: appSetting) {}

  get(): Observable<categoryModel[]> {
    return this.http.get<categoryModel[]>(this.url);
  }
  getSingle(id: number): Observable<categoryModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<categoryModel>(searchUrl);
  }
  post(data: categoryModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      (res) => {
      
        this.appSetting.showSuccess();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  put(data: categoryModel): void {
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
