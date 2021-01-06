import { MainItemCreateComponent } from './admin/main-item-create/main-item-create.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OpeningListComponent } from './admin/opening-list/opening-list.component';
import { OpeningCreateComponent } from './admin/opening-create/opening-create.component';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab3Page } from "./tab3.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import {NgxPaginationModule} from 'ngx-pagination';
import { Tab3PageRoutingModule } from "./tab3-routing.module";
import { ItemConfirmComponent } from "./admin/item-confirm/item-confirm.component";

import { UserCreateComponent } from "./admin/user-create/user-create.component";
import { UserListComponent } from "./admin/user-list/user-list.component";
import { MainPageComponent } from "./admin/main-page/main-page.component";
import { ResturantCreateComponent } from "./admin/resturant-create/resturant-create.component";
import { ResturantListComponent } from "./admin/resturant-list/resturant-list.component";
import { LocationListComponent } from "./admin/location-list/location-list.component";
import { LocationCreateComponent } from "./admin/location-create/location-create.component";
import { ResMainPageComponent } from "./resturant/res-main-page/res-main-page.component";
import { FoodCreateComponent } from "./resturant/food-create/food-create.component";
import { FoodListComponent } from "./resturant/food-list/food-list.component";
import { RiderEarningListComponent } from './admin/rider-earning-list/rider-earning-list.component';
import { RiderEarningCreateComponent } from './admin/rider-earning-create/rider-earning-create.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MainItemListComponent } from './admin/main-item-list/main-item-list.component';
import { ItemConfirmDetailComponent } from './admin/item-confirm-detail/item-confirm-detail.component';
import { OrderManagementListComponent } from './admin/order-management-list/order-management-list.component';
import { OrderManagementCreateComponent } from './admin/order-management-create/order-management-create.component';
import { OrderAcceptFormComponent } from './admin/report/order-accept-form/order-accept-form.component';
@NgModule({
  imports: [
    IonicModule,
    NgxPaginationModule,
    ImageCropperModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: "", component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [
    Tab3Page,
    OrderAcceptFormComponent,
    ItemConfirmDetailComponent,
    RiderEarningListComponent,
    RiderEarningCreateComponent,
    MainItemCreateComponent,
    MainItemListComponent,
    MainPageComponent,
    UserListComponent,
    UserCreateComponent,
    ResturantListComponent,
    ResturantCreateComponent,
    ItemConfirmComponent,
    LocationListComponent,
    LocationCreateComponent,
    ResMainPageComponent,
    FoodCreateComponent,
    FoodListComponent,
    OpeningCreateComponent,
    OpeningListComponent,
    OrderManagementListComponent,
    OrderManagementCreateComponent
  ],
})
export class Tab3PageModule {}
