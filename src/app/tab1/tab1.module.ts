import { DeliveryPendingComponent } from "./admin/delivery-pending/delivery-pending.component";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { ItemListComponent } from "./admin/item-list/item-list.component";
import { AddToInvoiceComponent } from "./admin/add-to-invoice/add-to-invoice.component";
import { MainPageComponent } from "./admin/main-page/main-page.component";
import { ResturantMainComponent } from "./resturant/resturant-main/resturant-main.component";
import { ResturantIndividualOrderComponent } from "./resturant/resturant-individual-order/resturant-individual-order.component";
import { ResturantCardComponent } from "./resturant/resturant-card/resturant-card.component";
import { PendingItemEditComponent } from "./admin/pending-item-edit/pending-item-edit.component";
import { RiderMainPageComponent } from "./rider/rider-main-page/rider-main-page.component";
import { CustomerInfoComponent } from "./rider/customer-info/customer-info.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [
    Tab1Page,
    CustomerInfoComponent,
    RiderMainPageComponent,
    PendingItemEditComponent,
    DeliveryPendingComponent,
    ResturantCardComponent,
    ResturantIndividualOrderComponent,
    ItemListComponent,
    MainPageComponent,
    ResturantMainComponent,
    AddToInvoiceComponent,
  ],
})
export class Tab1PageModule {}
