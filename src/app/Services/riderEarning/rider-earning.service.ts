import { riderEarningModel } from './../../Models/riderEarningModel';
import { appSetting } from './../../app-setting';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RiderEarningService {
  private url = `${this.appSetting.apiAddress}/api/riderEarningModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,private appSetting:appSetting) { }

  get(): Observable<riderEarningModel[]> {
    return this.http.get<riderEarningModel[]>(this.url);
  }
  getSingle(id: number): Observable<riderEarningModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<riderEarningModel>(searchUrl);
  }
  post(data: riderEarningModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      res => {
        
        this.appSetting.showSuccess();
      },
      err => {
        console.log(err);
        this.appSetting.showError(err);
      }
    );
  }

  put(data: riderEarningModel): void {
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

