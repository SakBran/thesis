import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFromComponent } from './login-from/login-from.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../auth/authGuard';


const routes: Routes = [
  {
    path: '',component:LoginFromComponent
  }
  ,
  {
    path: 'managmenet',
    loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService] 
  }
];

@NgModule({
  imports: [FormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
