import { ClientInvoiceComponent } from "./../client-invoice/client-invoice.component";
import { FoodService } from "./../../Services/food/food.service";
import { CategoryService } from "./../../Services/category/category.service";
import { Router } from "@angular/router";
import { ClientShopcartComponent } from "./../client-shopcart/client-shopcart.component";
import { appSetting } from "src/app/app-setting";
import { Component, OnInit } from "@angular/core";
import { Platform, ModalController } from "@ionic/angular";
import { ResturantModelService } from "src/app/Services/resturantModel/resturant-model.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  loading = 1;
  constructor(
    public plt: Platform,
    private ResturantModelService: ResturantModelService,
    private router: Router,
    private foodService: FoodService,
    public modalController: ModalController,
    private CategoryService: CategoryService,
    public appSetting: appSetting
    
  ) {
    this.resturantLoaddata();
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.appSetting.orderData.latitude = position.coords.latitude.toString();
        this.appSetting.orderData.longitude = position.coords.longitude.toString();
      });
    }
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  resturantLoaddata() {
    this.foodService.getActive().subscribe(
      (x) => (this.appSetting.menuFoodDataList = x),
      (err) => console.log(err),
      () => {
        this.ResturantModelService.get().subscribe(
          (x) => (this.appSetting.resturandDataList = x),
          (err) => this.appSetting.showError(err),
          () => {
            this.appSetting.constantResturandDataList=[...this.appSetting.resturandDataList];
            this.appSetting.constFoodDataList=[...this.appSetting.menuFoodDataList];
            this.loadCategory();
          }
        );
      }
    );
  }

  loadCategory() {
    this.CategoryService.get().subscribe((y) => {
      (this.appSetting.categoryList = y),
        (err) => this.appSetting.showError(err),
        () => {
          console.log("Complete");
        };
    });
  }

  async shopCart() {
    const modal = await this.modalController.create({
      component: ClientShopcartComponent,
      //,cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async invoice() {
    const modal = await this.modalController.create({
      component: ClientInvoiceComponent,
      //,cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
