"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.itemRest = exports.appSetting = void 0;
var sweetalert2_1 = require("sweetalert2");
var appSetting = /** @class */ (function () {
    /**
     *
     */
    function appSetting() {
        this.loginType = "";
        this.displaySetting = "pending";
        this.adminProcess = "";
        this.adminID = "";
        this.adminTab2Process = "";
        this.adminTab2ID = "";
        this.adminTab3Process = "";
        this.adminTab3ID = "";
        this.zone = [];
        this.device = "";
        this.customerSearch = "";
        this.apiAddress = "http://localhost/sidecar";
        //public apiAddress ="https://www.myanmatrishaw.asia";
        this.userTypeData = [];
        this.resturantID = 0;
        this.sessionUserID = 0;
        this.detailID = 0;
        this.mainItemDataList = [];
        this.constmainItemDataList = [];
        this.foodDataList = [];
        this.menuFoodDataList = [];
        this.constFoodDataList = [];
        this.resturandDataList = [];
        this.categoryList = [];
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
            longitude: "",
            latitude: ""
        };
    }
    appSetting.prototype.orderTransationClear = function () {
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
            longitude: "",
            latitude: ""
        };
        this.orderDetailList = [];
        this.orderDetailViewList = [];
    };
    appSetting.prototype.showLoading = function () {
        sweetalert2_1["default"].fire({
            title: "System Message",
            html: "Please wait! System is processing..",
            confirmButtonText: "Done",
            onBeforeOpen: function () {
                sweetalert2_1["default"].showLoading();
            }
        });
    };
    appSetting.prototype.loginSuccess = function () {
        sweetalert2_1["default"].fire("Success", "Login successful", "success");
    };
    appSetting.prototype.loginFail = function () {
        sweetalert2_1["default"].fire("Opps", "Failed to login", "warning");
    };
    appSetting.prototype.showSuccess = function () {
        sweetalert2_1["default"].fire("Success", "Data has been saved successfully", "success");
    };
    appSetting.prototype.showError = function (msg) {
        sweetalert2_1["default"].fire("Error", JSON.stringify(msg), "error");
    };
    appSetting.prototype.showInvalid = function () {
        sweetalert2_1["default"].fire("Invalid Data", "Please fill invalid data!", "info");
    };
    appSetting.prototype.loadingClose = function () {
        sweetalert2_1["default"].close();
    };
    appSetting.prototype.resName = function (id) {
        var res = "null";
        this.resturandDataList.forEach(function (x) {
            if (x.id === id) {
                res = x.shopname;
            }
        });
        return res;
    };
    appSetting.prototype.resZone = function (id) {
        var res = "null";
        this.resturandDataList.forEach(function (x) {
            if (x.id === id) {
                res = x.locationID.toString();
            }
        });
        return res;
    };
    appSetting.prototype.resendBtn = function (orderNo) {
        var result = true;
        var temp = __spreadArrays(this.resendListFromResturant);
        temp.forEach(function (x) {
            if (x.orderNo === orderNo) {
                result = false;
            }
        });
        return result;
    };
    appSetting.prototype.riderEarning = function (amount) {
        return 0;
    };
    appSetting.prototype.itemJoin = function (id) {
        var _this = this;
        var i = {
            itemName: "",
            resturant: ""
        };
        var temp = __spreadArrays(this.constFoodDataList);
        temp.forEach(function (x) {
            if (x.id === id) {
                i.itemName = x.itemName;
                i.resturant = _this.resName(x.resturant_id);
            }
        });
        return i;
    };
    appSetting.prototype.displayFunction = function (x) {
        this.displaySetting = x;
    };
    appSetting.prototype.logout = function () {
        this.loginType = "";
        this.displaySetting = "pending";
        this.adminProcess = "";
        this.adminID = "";
        this.adminTab2Process = "";
        this.adminTab2ID = "";
        this.adminTab3Process = "";
        this.adminTab3ID = "";
        this.userTypeData = [];
        this.resturantID = 0;
        this.sessionUserID = 0;
        this.foodDataList = [];
        this.menuFoodDataList = [];
        this.constFoodDataList = [];
        this.resturandDataList = [];
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
            longitude: "",
            latitude: ""
        };
    };
    appSetting.prototype.distanceCal = function (lat1, lon1, lat2, lon2) {
        var R = 6371e3; // metres
        var φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        var φ2 = (lat2 * Math.PI) / 180;
        var Δφ = ((lat2 - lat1) * Math.PI) / 180;
        var Δλ = ((lon2 - lon1) * Math.PI) / 180;
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // in metres
        var result = d;
        return result;
    };
    return appSetting;
}());
exports.appSetting = appSetting;
var itemRest = /** @class */ (function () {
    function itemRest() {
    }
    return itemRest;
}());
exports.itemRest = itemRest;
