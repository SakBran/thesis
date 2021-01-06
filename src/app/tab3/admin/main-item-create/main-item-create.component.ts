import { MainModelService } from './../../../Services/mainModel/main-model.service';
import { CategoryService } from './../../../Services/category/category.service';
import { Component, OnInit } from "@angular/core";
import { appSetting } from "src/app/app-setting";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { mainModel } from 'src/app/Models/mainModel';

@Component({
  selector: 'app-main-item-create',
  templateUrl: './main-item-create.component.html',
  styleUrls: ['./main-item-create.component.scss'],
})
export class MainItemCreateComponent implements OnInit {
  id = +this.Router.snapshot.paramMap.get("id");
  constructor(
    public location: Location,
    public appSetting: appSetting,
    private FoodService: MainModelService,
    private route: Router,
    private Router: ActivatedRoute,
    private categoryService:CategoryService
  ) {
    this.getCategory();
  }

  ngOnInit() {
    if (this.id !== null || this.id !== undefined || this.id !== 0) {
      this.editLoad(this.id);
    }
  }

  getCategory(){
    this.categoryService.get().subscribe(x=>{
      this.appSetting.categoryList=x;
    });
  }
  back() {
    this.location.back();
  }

  foodData: mainModel = {
    id: 0,
    name: "",
    description: "",
    resturant: "",
    resturant_id: 0,
    category_id: 0,
    mainitem_id:0,
    imageURI: "",
    status: "active"
  };
  editLoad(id) {
    this.appSetting.showLoading();
    if (id !== 0) {
      this.FoodService.getSingle(id).subscribe(
        (x) => (this.foodData = x),
        (err) => this.appSetting.showError(err),
        () => {
         
          this.appSetting.loadingClose();
        }
      );
    } else {
      this.appSetting.loadingClose();
    }
  }
  formValidation(): boolean {
    if (this.foodData.name === "" || this.foodData.resturant_id === 0) {
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
      this.FoodService.put(this.foodData,this.croppedImage);
      // this.route.navigateByUrl('tabs/tab3/resturantList');
    } else {
      this.appSetting.showInvalid();
    }
  }
  croppedImage:any='';
  //Image
 


imageChangedEvent: any = '';


fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
  //Image
}
