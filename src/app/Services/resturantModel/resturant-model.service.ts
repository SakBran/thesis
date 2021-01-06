import { resturantModel } from './../../Models/resturantModel';
import { appSetting } from './../../app-setting';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ResturantModelService {
  private url = `${this.appSetting.apiAddress}/api/resturantModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,private appSetting:appSetting) { }

  get(): Observable<resturantModel[]> {
    return this.http.get<resturantModel[]>(this.url);
  }
  getSingle(id: number): Observable<resturantModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<resturantModel>(searchUrl);
  }
  post(data: resturantModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      res => {
        
        this.appSetting.showSuccess();
      },
      err => {
        console.log(err);
      }
    );
  }

  put(data: resturantModel): void {
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

