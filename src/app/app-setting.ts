import { categoryModel } from './Models/categoryModel';
import { orderModel } from "./Models/orderModel";
import { orderDetialViewmodel } from "./Models/orderDetailViewmodel";
import { orderDetialModel } from "./Models/orderDetailModel";
import { userTypeModel } from "./Models/usertypeModel";
import Swal from "sweetalert2";
import { foodModel } from "src/app/Models/foodModel";
import { resturantModel } from "./Models/resturantModel";
import { locationModel } from "./Models/locationModel";
import { orderTransationModel } from "./Models/orderTransationModel";
import { resendModel } from "./Models/resendModel";
import { mainModel } from './Models/mainModel';

export class appSetting {
  /**
   *
   */
  constructor() {}
  public searchResturant=0;
  public loginType = "";

  public displaySetting = "pending";

  public adminProcess = "";
  public adminID = "";

  public adminTab2Process = "";
  public adminTab2ID = "";

  public adminTab3Process = "";
  public adminTab3ID = "";

  public zone:String[]=[];
  public customerSearch="";
  // public apiAddress = "http://localhost/sidecar";
  public apiAddress ='https://www.myanmatrishaw.asia';

  public userTypeData: userTypeModel[] = [];

  public resturantID = 0;
  public sessionUserID = 0;

  public detailID=0;
  public mainItemDataList: mainModel[] = [];
  public constmainItemDataList: mainModel[] = [];

  public foodDataList: foodModel[] = [];
  public menuFoodDataList: foodModel[] = [];
  public constFoodDataList: foodModel[] = [];

  public constantResturandDataList: resturantModel[] = [];
  public resturandDataList: resturantModel[] = [];
 

  public categoryList:categoryModel[]=[];

  public locationDataList: locationModel[] = [];

  public orderDetailList: orderDetialModel[] = [];
  public orderDetailViewList: orderDetialViewmodel[] = [];

  public orderTransationList: orderTransationModel[] = [];
  public resendListFromResturant: resendModel[] = [];
  public orderData: orderModel = {
    id: 0,
    orderDate: new Date(Date.now()),
    deliveryDate: new Date(Date.now()),
    pickupDate: new Date(Date.now()),
    clientName: "",
    clitentPhone: "09-",
    clitentFlatNo: "",
    clientAddress: "",
    deliveryCharegs: 0,
    riderID: 0,
    Township_id: 0,
    riderEarning: 0,
    operatorID: this.sessionUserID,
    status: "pending",
    riderTakeOption: "all",
    longitude:"",
    latitude:""
  };

  public orderTransationClear() {
    this.orderData = {
      id: 0,
      orderDate: new Date(Date.now()),
      deliveryDate: new Date(Date.now()),
      pickupDate: new Date(Date.now()),
      clientName: "",
      clitentPhone: "09-",
      clitentFlatNo: "",
      clientAddress: "",
      deliveryCharegs: 0,
      riderID: 0,
      Township_id: 0,
      riderEarning: 0,
      operatorID: this.sessionUserID,
      status: "pending",
      riderTakeOption: "all",
      longitude:"",
      latitude:""
    };
    this.orderDetailList = [];
    this.orderDetailViewList = [];
  }
  public showLoading() {
    Swal.fire({
      title: "System Message",
      html: "Please wait! System is processing..",
      confirmButtonText: "Done",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  }

  public loginSuccess() {
    Swal.fire("Success", "Login successful", "success");
  }

  public loginFail() {
    Swal.fire("Opps", "Failed to login", "warning");
  }

  public showSuccess() {
    Swal.fire("Success", "Data has been saved successfully", "success");
  }

  public showError(msg: JSON) {
    Swal.fire("Error", JSON.stringify(msg), "error");
  }
  public showInvalid() {
    Swal.fire("Invalid Data", "Please fill valid data!", "info");
  }

  
  public loadingClose() {
    Swal.close();
  }

  public resName(id): string {
    let res = "null";
    this.resturandDataList.forEach((x) => {
      if (x.id === id) {
        res = x.shopname;
      }
    });
    return res;
  }

  public resZone(id): string {
    let res = "null";
    this.resturandDataList.forEach((x) => {
      if (x.id === id) {
        res = x.locationID.toString();
      }
    });
    return res;
  }
  public mainItemName(id):string{
    let result="";
    const temp = [...this.constmainItemDataList];
    temp.forEach((x) => {
      if (x.id === +id) {
        result= x.name;
      }
    });
    return result;
  }
  public resendBtn(orderNo): boolean {
    let result: boolean = true;
    const temp = [...this.resendListFromResturant];
    temp.forEach((x) => {
      if (x.orderNo === orderNo) {
        result = false;
      }
    });
    return result;
  }

  public riderEarning(amount): number {
    return 0;
  }
  public itemJoin(id): itemRest {
    let i: itemRest = {
      itemName: "",
      resturant: "",
    };
    const temp = [...this.constFoodDataList];
    temp.forEach((x) => {
      if (x.id === id) {
        i.itemName = x.itemName;
        i.resturant = this.resName(x.resturant_id);
      }
    });
    return i;
  }

  public displayFunction(x: string) {
    this.displaySetting = x;
  }

  public logout() {
    this.loginType = "";

    this.displaySetting = "pending";

    this.adminProcess = "";
    this.adminID = "";

    this.adminTab2Process = "";
    this.adminTab2ID = "";

    this.adminTab3Process = "";
    this.adminTab3ID = "";

   // this.userTypeData = [];

    this.resturantID = 0;
    this.sessionUserID = 0;
/*

    this.foodDataList = [];
    this.menuFoodDataList = [];
    this.constFoodDataList = [];
  

    this.locationDataList = [];

    this.orderDetailList = [];
    this.orderDetailViewList = [];

    this.orderTransationList = [];
    this.resendListFromResturant = [];
    this.orderData = {
      id: 0,
      orderDate: new Date(Date.now()),
      deliveryDate: new Date(Date.now()),
      pickupDate: new Date(Date.now()),
      clientName: "",
      clitentPhone: "09-",
      clitentFlatNo: "",
      clientAddress: "",
      deliveryCharegs: 0,
      riderID: 0,
      Township_id: 0,
      riderEarning: 0,
      operatorID: this.sessionUserID,
      status: "pending",
      riderTakeOption: "all",
      longitude:"",
      latitude:""
    };
    */
  }

  rad(x) {
    return x * Math.PI / 180;
  };

   public distanceCal(lat1, lon1, lat2, lon2) {
    
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(lat2 - lat1);
    var dLong = this.rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d/1000; // returns the distance in meter
  };
/*
  public distanceCal(lat1, lon1, lat2, lon2): number {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    let result = d;

    return result;
  }
  */
}


export class itemRest {
  itemName: string;
  resturant: string;
}
