import { userTypeModel } from './../../Models/usertypeModel';
import { appSetting } from './../../app-setting';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private url = `${this.appSetting.apiAddress}/api/userTypeModels`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,private appSetting:appSetting) { }

  get(): Observable<userTypeModel[]> {
    return this.http.get<userTypeModel[]>(this.url);
  }
  getSingle(id: number): Observable<userTypeModel> {
    const searchUrl = `${this.url}/${id}`;
    return this.http.get<userTypeModel>(searchUrl);
  }
  post(data: userTypeModel): void {
    this.http.post(this.url, data, this.httpOptions).subscribe(
      res => {
        
      },
      err => {
        console.log(err);
      }
    );
  }

  put(data: userTypeModel): void {
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
