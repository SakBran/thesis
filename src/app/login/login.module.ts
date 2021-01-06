import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFromComponent } from './login-from/login-from.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginFromComponent],
  imports: [IonicModule,
    CommonModule,FormsModule,
    LoginRoutingModule
  ],
 
})
export class LoginModule { }
