import { orderAcceptModel } from './../../../Models/orderAccpetModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appSetting } from 'src/app/app-setting';

@Injectable({
  providedIn: 'root'
})
export class OrderAceptService {
  private url = `${this.appSetting.apiAddress}/api/OrderAcceptanceForm`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(
    private http: HttpClient,
    private appSetting: appSetting
  ) {}

  get(start:string,end:string): Observable<orderAcceptModel[]> {
    console.log(this.url + `?start=${start}&end=${end}`);
    return this.http.get<orderAcceptModel[]>(
      this.url + `?start='${start}'&end='${end}'`
    );
    
  }
}
