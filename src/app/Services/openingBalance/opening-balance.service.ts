import { appSetting } from './../../app-setting';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { OpeningBalanceModel } from 'src/app/Models/openingBalanceModel';

@Injectable({
  providedIn: 'root'
})
export class OpeningBalanceService {
  private url = `${this.appSetting.apiAddress}/api/OpeningBalanceModels`;
  private date_url = `${this.appSetting.apiAddress}/api/OpeningBalanceModels/today`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,private appSetting:appSetting) { }

  get(): Observable<OpeningBalanceModel[]> {
    return this.http.get<OpeningBalanceModel[]>(this.url);
  }

  getLogin(username:string,password:string): Observable<OpeningBalanceModel>{
    console.log(this.url+`/login?user=${username}&password=${password}`);
    return this.http.get<OpeningBalanceModel>(this.url+`/login?user=${username}&password=${password}`);
  }
  getAvailableRider(): Observable<OpeningBalanceModel[]> {
    return this.http.get<OpeningBalanceModel[]>(this.url+`/availableRider`);
  }
  
  getDeliveringRider(): Observable<OpeningBalanceModel[]> {
    return this.http.get<OpeningBalanceModel[]>(this.url+`/deliveringRider`);
  }
  
  getSingle(id: number): Observable<OpeningBalanceModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<OpeningBalanceModel>(searchUrl);
  }

  getDate(date: Date): Observable<OpeningBalanceModel[]> {
    const tempDate=date.toString().substring(0,10);
    const searchUrl = `${this.date_url}/?date=${tempDate}`;
    return this.http.get<OpeningBalanceModel[]>(searchUrl);
  }

  post(data: OpeningBalanceModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      res => {
        
        this.appSetting.showSuccess();
      },
      err => {
        console.log(err);
      }
    );
  }

  put(data: OpeningBalanceModel): void {
    const searchUrl = `${this.url}/${data.id}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      res => {
        
        this.appSetting.showSuccess();
      },
      err => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  delete(id: number): void {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
       
      }
    });

    xhr.open('DELETE', this.url + '/' + id);

    xhr.send(data);
  }
}
