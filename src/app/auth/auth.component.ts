
import { appSetting } from 'src/app/app-setting';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent  {


  constructor(public router: Router,private appSetting:appSetting) {}
  // ...
  public isAuthenticated(): boolean {
    let token='no';
    let result=false;
    //const token = localStorage.getItem('token');
    if(this.appSetting.loginType===''){
      token='no';
      result=false;
    }else{
      token='yes';
      result=true;
    }
    
    
    if(token==='' || token===null || token===undefined){
      result=false;
    }

    // Check whether the token is expired and return
    // true or false
    return result;
  }

  

}
