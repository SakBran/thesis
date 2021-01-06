import { PendingItemEditComponent } from "./admin/pending-item-edit/pending-item-edit.component";
import { DeliveryPendingComponent } from "./admin/delivery-pending/delivery-pending.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab1Page } from "./tab1.page";
import { AddToInvoiceComponent } from "./admin/add-to-invoice/add-to-invoice.component";
import { CustomerInfoComponent } from "./rider/customer-info/customer-info.component";

const routes: Routes = [
  {
    path: "",
    component: Tab1Page,
  },
  {
    path: "add/:id",
    component: AddToInvoiceComponent,
  },
  {
    path: "deliveryPending",
    component: DeliveryPendingComponent,
  },
  {
    path: "pendingEdit/:id",
    component: PendingItemEditComponent,
  },
  {
    path: "customerInfo/:id",
    component: CustomerInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
