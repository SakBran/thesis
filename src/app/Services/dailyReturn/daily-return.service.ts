import { appSetting } from "./../../app-setting";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { dailyReturnModel } from 'src/app/Models/dailyReturnModel';

@Injectable({
  providedIn: 'root'
})
export class DailyReturnService {
  private url = `${this.appSetting.apiAddress}/api/dailyReturn`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient, private appSetting: appSetting) {}
  get(riderID: number,date:String): Observable<dailyReturnModel> {
  
    return this.http.get<dailyReturnModel>(
      this.url + `?riderID=${riderID}&date=${date}`
    );
  }
}
