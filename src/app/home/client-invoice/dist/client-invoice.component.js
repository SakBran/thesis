"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ClientInvoiceComponent = void 0;
var core_1 = require("@angular/core");
var orderTransationModel_1 = require("src/app/Models/orderTransationModel");
var util_1 = require("util");
var ClientInvoiceComponent = /** @class */ (function () {
    function ClientInvoiceComponent(appSetting, modalCtrl, modalController, orderService, FoodService, iab, userService) {
        this.appSetting = appSetting;
        this.modalCtrl = modalCtrl;
        this.modalController = modalController;
        this.orderService = orderService;
        this.FoodService = FoodService;
        this.iab = iab;
        this.userService = userService;
        this.invoiceNo = null;
        this.phoneNo = null;
        this.data = new orderTransationModel_1.orderTransationModel();
        this.status = "";
        this.displayTotal = 0;
        this.options = {
            location: "yes",
            hidden: "no",
            zoom: "no",
            hideurlbar: "yes"
        };
        this.loading = 0;
        this.riderID = 0;
        this.ltd = "";
        this.lng = "";
    }
    ClientInvoiceComponent.prototype.ngOnInit = function () { };
    ClientInvoiceComponent.prototype.dismissModal = function () {
        this.data = new orderTransationModel_1.orderTransationModel();
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            dismissed: true
        });
    };
    ClientInvoiceComponent.prototype.checkUndefined = function (obj) {
        return util_1.isUndefined(obj);
    };
    ClientInvoiceComponent.prototype.count = function (id, fun) {
        var _this = this;
        var i = 0;
        var temp = __spreadArrays(this.appSetting.orderDetailViewList);
        temp.forEach(function (x) {
            i = i + 1;
            if (i === id) {
                if (fun === "add") {
                    x.orderDetialModel.itemQty = x.orderDetialModel.itemQty + 1;
                }
                else {
                    x.orderDetialModel.itemQty = x.orderDetialModel.itemQty - 1;
                }
                x.orderDetialModel.itemFinalPrice =
                    _this.calculatePrice(x.orderDetialModel.itemID) *
                        x.orderDetialModel.itemQty;
                x.orderDetialModel.itemOrgPrice = x.orderDetialModel.itemFinalPrice;
            }
        });
    };
    ClientInvoiceComponent.prototype["delete"] = function (id) {
        var _this = this;
        var i = -1;
        var temp = __spreadArrays(this.appSetting.orderDetailViewList);
        temp.forEach(function (x) {
            i = i + 1;
            if (i === id) {
                _this.appSetting.orderDetailViewList.splice(i, 1);
            }
        });
    };
    ClientInvoiceComponent.prototype.calculatePrice = function (id) {
        var temp = __spreadArrays(this.appSetting.menuFoodDataList);
        var res = 0;
        temp.forEach(function (x) {
            if (x.id === id) {
                res = x.price;
            }
        });
        return res;
    };
    ClientInvoiceComponent.prototype.total = function () {
        var total = 0;
        var temp = __spreadArrays(this.data.orderDetailModels);
        temp.forEach(function (x) {
            total = total + x.itemFinalPrice;
        });
        this.status = this.data.orderModel.status;
        this.displayTotal = total;
    };
    ClientInvoiceComponent.prototype.search = function () {
        var _this = this;
        this.loading = 1;
        this.orderService.getInvoice(this.invoiceNo, this.phoneNo).subscribe(function (x) { return (_this.data = x); }, function (err) {
            _this.appSetting.showInvalid();
        }, function () {
            _this.riderID = _this.data.orderModel.riderID;
            _this.food();
            _this.loading = 0;
        });
    };
    ClientInvoiceComponent.prototype.food = function () {
        var _this = this;
        if (this.appSetting.constFoodDataList.length === 0) {
            this.FoodService.getActive().subscribe(function (x) { return (_this.appSetting.menuFoodDataList = x); }, function (err) { return _this.appSetting.showError(err); }, function () {
                _this.appSetting.constFoodDataList = _this.appSetting.menuFoodDataList;
                _this.total();
                _this.loading = 0;
            });
        }
        else {
            this.total();
            this.loading = 0;
        }
    };
    ClientInvoiceComponent.prototype.showMap = function () {
        this.appSetting.showLoading();
        this.getCustomerInfo();
    };
    ClientInvoiceComponent.prototype.googleMap = function (meltd, melng, clientLtd, clientLng) {
        var url = "https://www.google.com/maps/dir/" + meltd + "," + melng + "/" + clientLtd + "," + clientLng + "/@" + clientLtd + "," + clientLng;
        var target = "_blank";
        var browser = this.iab.create(url, target, this.options);
        browser.on("loadstop").subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
    };
    ClientInvoiceComponent.prototype.onClick = function () {
        var userLatitude = this.ltd;
        var userLongitude = this.lng;
        if (userLongitude === "" || userLatitude === "" || userLatitude === null) {
            this.appSetting.showInvalid();
        }
        else {
            this.appSetting.loadingClose();
            this.geolocation(userLatitude, userLongitude);
        }
    };
    ClientInvoiceComponent.prototype.geolocation = function (lat, long) {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude.toString();
                var longitude = position.coords.longitude.toString();
                _this.googleMap(latitude, longitude, lat, long);
            });
        }
    };
    ClientInvoiceComponent.prototype.getCustomerInfo = function () {
        var _this = this;
        this.userService.getSingle(this.riderID).subscribe(function (x) {
            _this.ltd = x.latitude;
            _this.lng = x.longitude;
        }, function (err) { return console.log(err); }, function () {
            _this.onClick();
        });
    };
    ClientInvoiceComponent = __decorate([
        core_1.Component({
            selector: "app-client-invoice",
            templateUrl: "./client-invoice.component.html",
            styleUrls: ["./client-invoice.component.scss"]
        })
    ], ClientInvoiceComponent);
    return ClientInvoiceComponent;
}());
exports.ClientInvoiceComponent = ClientInvoiceComponent;
