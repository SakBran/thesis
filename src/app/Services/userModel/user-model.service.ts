import { userModel } from './../../Models/userModel';
import { appSetting } from './../../app-setting';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserModelService {
  private url = `${this.appSetting.apiAddress}/api/userModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,private appSetting:appSetting) { }

  get(): Observable<userModel[]> {
    return this.http.get<userModel[]>(this.url);
  }

  getLogin(username:string,password:string): Observable<userModel>{
    return this.http.get<userModel>(this.url+`/login?user=${username}&password=${password}`);
  }
  getAvailableRider(): Observable<userModel[]> {
    return this.http.get<userModel[]>(this.url+`/availableRider`);
  }
  
  getDeliveringRider(): Observable<userModel[]> {
    return this.http.get<userModel[]>(this.url+`/deliveringRider`);
  }
  
  getSingle(id: number): Observable<userModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<userModel>(searchUrl);
  }
  post(data: userModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      res => {
        
        this.appSetting.showSuccess();
      },
      err => {
        console.log(err);
      }
    );
  }

  put(data: userModel): void {
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

  putLocation(data: userModel): void {
    const searchUrl = `${this.url}/${data.id}`;
    this.http.put(searchUrl, data, this.httpOptions).subscribe(
      res => {
        
        
      },
      err => {
        console.log(err);
       
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
