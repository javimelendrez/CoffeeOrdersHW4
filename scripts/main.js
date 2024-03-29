(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var PAYMENT_SELECTOR = '[data-payment-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'https://co.audstanley.com/coffeeorders'; // if running on the shared server
  // var SERVER_URL = 'http://localhost:3000/coffeeorders';          // if running locally
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  var formHandler = new FormHandler(FORM_SELECTOR);
  // var paymentFormHandler = new FormHandler(PAYMENT_SELECTOR);
  // paymentFormHandler.addSubmitHandler();
  // paymentFormHandler.addSubmitHandler(function(data){
  //   paymentFormHandler.addSubmitHandler()
  // });
  // console.log(paymentFormHandler);

  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);