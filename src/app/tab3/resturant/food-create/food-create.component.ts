import { CategoryService } from "./../../../Services/category/category.service";
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FoodService } from "src/app/Services/food/food.service";
import { foodModel } from "src/app/Models/foodModel";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { MainModelService } from "src/app/Services/mainModel/main-model.service";
import { mainModel } from 'src/app/Models/mainModel';

@Component({
  selector: "app-food-create",
  templateUrl: "./food-create.component.html",
  styleUrls: ["./food-create.component.scss"],
})
export class FoodCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  menuMain:mainModel[]=[]
  selectRes:number=0;
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private FoodService: FoodService,
    private route: Router,
    private Router: ActivatedRoute,
    private mainModelService: MainModelService,
    private categoryService: CategoryService
  ) {
    this.appSetting.showLoading();
    this.getCategory();
  }

  ngOnInit() {
    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }

  getMainModel() {
    this.mainModelService.get().subscribe(
      (x) => {
        this.appSetting.mainItemDataList = x;
      },
      (err) => console.log(err),
      () => {
        this.appSetting.loadingClose();
      }
    );
  }
  
  dataChangeRes(e){
  let temp:mainModel[]=[...this.appSetting.mainItemDataList];
  this.menuMain=[...temp.filter(x=>x.resturant_id===e)];
  this.foodData.resturant_id=e;
  }
  dataChange(e) {
    this.foodData.mainitem_id=e;
    
    this.appSetting.mainItemDataList.forEach((x) => {
      if (x.id === e) {
        this.foodData.resturant_id = x.resturant_id;
      }
    });
  }
  getCategory() {
    this.categoryService.get().subscribe(
      (x) => {
        this.appSetting.categoryList = x;
      },
      (err) => console.log(err),
      () => {
        this.getMainModel();
      }
    );
  }

  back() {
    this.location.back();
  }

  foodData: foodModel = {
    id: 0,
    itemName: "",
    itemNameTemp: "",
    resturant_id: 0,
    mainitem_id: 0,
    price: 0,
    priceTemp: 0,
    //change it to status: 'pending' if Resturant want to Confirm
    status: "active",
    categoryType_ID: 0,
    imageURI: "",
    Descriptions: "",
  };

  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.FoodService.getSingle(id).subscribe(
        (x) => (this.foodData = x),
        (err) => this.appSetting.showError(err),
        () => {
          this.foodData.itemNameTemp = this.foodData.itemName;
          this.foodData.priceTemp = this.foodData.price;
          this.appSetting.loadingClose();
        }
      );
    } else {
      this.appSetting.loadingClose();
    }
  }

  formValidation(): boolean {
    if (this.foodData.itemName === "" || this.foodData.price === 0 || this.foodData.resturant_id===0) {
      console.log(this.foodData);
      return false;
    }
    return true;
  }

  create() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.FoodService.post(this.foodData, this.croppedImage);
    } else {
      this.appSetting.showInvalid();
    }
  }

  update() {
    this.appSetting.showLoading();
    if (this.formValidation() === true) {
      this.foodData.status = "active";
      this.FoodService.put(this.foodData);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
  croppedImage: any = "";
  //Image

  imageChangedEvent: any = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  //Image
}
