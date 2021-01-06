import { CategoryService } from './../../../Services/category/category.service';
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { FoodService } from 'src/app/Services/food/food.service';
import { ResturantModelService } from 'src/app/Services/resturantModel/resturant-model.service';
import { foodModel } from 'src/app/Models/foodModel';

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  constructor(public appSetting: appSetting,
    private FoodService: FoodService,
    private ResturantModelService: ResturantModelService) {}

  ngOnInit() {}
  refresh(e){
  this.loadData(e);
  }

  
  
  loadData(e) {

      this.FoodService.getActive().subscribe(
        (x) => (this.appSetting.menuFoodDataList = x),
        (err) => this.appSetting.showError(err),
        () => {
          this.appSetting.constFoodDataList = this.appSetting.menuFoodDataList;
          e.target.complete();
        }
      );
    
    
  }
 
}
