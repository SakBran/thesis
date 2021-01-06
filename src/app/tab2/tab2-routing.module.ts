import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { RiderSelectComponent } from './admin/rider-select/rider-select.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'riderSelect/:id',
    component: RiderSelectComponent,
  },
  {
    path: 'itemEdit/:id',
    component: ItemEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
