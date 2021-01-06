import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { MainPageComponent } from './admin/main-page/main-page.component';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { RiderSelectComponent } from './admin/rider-select/rider-select.component';
import { MainRiderPageComponent } from './rider/main-rider-page/main-rider-page.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [RiderSelectComponent,MainRiderPageComponent,Tab2Page,MainPageComponent,ItemListComponent,ItemEditComponent]
})
export class Tab2PageModule {}
