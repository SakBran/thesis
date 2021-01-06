import { OrderManagementCreateComponent } from './admin/order-management-create/order-management-create.component';
import { OpeningCreateComponent } from './admin/opening-create/opening-create.component';
import { OpeningListComponent } from './admin/opening-list/opening-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab3Page } from "./tab3.page";
import { UserListComponent } from "./admin/user-list/user-list.component";
import { UserCreateComponent } from "./admin/user-create/user-create.component";
import { ResturantListComponent } from "./admin/resturant-list/resturant-list.component";
import { ResturantCreateComponent } from "./admin/resturant-create/resturant-create.component";
import { ItemConfirmComponent } from "./admin/item-confirm/item-confirm.component";
import { ItemConfirmDetailComponent } from "./admin/item-confirm-detail/item-confirm-detail.component";
import { LocationListComponent } from "./admin/location-list/location-list.component";
import { LocationCreateComponent } from "./admin/location-create/location-create.component";
import { FoodListComponent } from "./resturant/food-list/food-list.component";
import { FoodCreateComponent } from "./resturant/food-create/food-create.component";
import { RiderEarningCreateComponent } from './admin/rider-earning-create/rider-earning-create.component';
import { RiderEarningListComponent } from './admin/rider-earning-list/rider-earning-list.component';
import { OrderManagementListComponent } from './admin/order-management-list/order-management-list.component';
import { MainItemCreateComponent } from './admin/main-item-create/main-item-create.component';
import { MainItemListComponent } from './admin/main-item-list/main-item-list.component';
import { OrderAcceptFormComponent } from './admin/report/order-accept-form/order-accept-form.component';

const routes: Routes = [
  {
    path: "",
    component: Tab3Page,
  },
  {
    path: "userList",
    component: UserListComponent,
  },
  {
    path: "userCreate",
    component: UserCreateComponent,
  },
  {
    path: "userEdit/:id",
    component: UserCreateComponent,
  },
  {
    path: "resturantList",
    component: ResturantListComponent,
  },
  {
    path: "resturantEdit/:id",
    component: ResturantCreateComponent,
  },
  {
    path: "resturantCreate",
    component: ResturantCreateComponent,
  },
  {
    path: "locationList",
    component: LocationListComponent,
  },
  {
    path: "locationEdit/:id",
    component: LocationCreateComponent,
  },
  {
    path: "locationCreate",
    component: LocationCreateComponent,
  },
  {
    path: "foodList",
    component: FoodListComponent,
  },
  {
    path: "foodList/:id",
    component: FoodListComponent,
  },
  {
    path: "foodEdit/:id",
    component: FoodCreateComponent,
  },
  {
    path: "foodCreate",
    component: FoodCreateComponent,
  },
  {
    path: "itemConfirm",
    component: ItemConfirmComponent,
  },
  {
    path: "itemConfirmDetail",
    component: ItemConfirmDetailComponent,
  },
  {
    path: "riderEarning",
    component: RiderEarningListComponent,
  },
  {
    path: "riderEarningCreate",
    component: RiderEarningCreateComponent,
  },
  {
    path: "riderEarningEdit/:id",
    component: RiderEarningCreateComponent,
  },
  {
    path: "openingBalance",
    component: OpeningListComponent,
  },
  {
    path: "openingBalanceCreate",
    component: OpeningCreateComponent,
  },
  {
    path: "openingBalanceEdit/:id",
    component: OpeningCreateComponent,
  },
  {
    path: "orderManagement",
    component: OrderManagementListComponent,
  },
  {
    path: "orderManagementCreate",
    component: OrderManagementCreateComponent,
  },
  {
    path: "orderManagementEdit/:id",
    component: OrderManagementCreateComponent,
  },
  {
    path: "mainItem",
    component: MainItemListComponent,
  },
  {
    path: "mainItemCreate",
    component: MainItemCreateComponent,
  },
  {
    path: "mainItemEdit/:id",
    component: MainItemCreateComponent,
  },
  {
    path: "report/orderAccept",
    component: OrderAcceptFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
