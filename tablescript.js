
//Create the AngularJS module named StorageService
//Create getLocalStorage service to access UpdateEmployees and getEmployees method  
var storageService = angular.module('storageService', []);  
storageService.factory('getLocalStorage', function () {                  
  var userList = {};  
  return {  
      list: userList,  
      updateUser: function (UserArr) {  
          if (window.localStorage && UserArr) {  
              //Local Storage to add Data  
              localStorage.setItem("user", angular.toJson(UserArr));  
          }  
          userList = UserArr;  
            
      },  
      getUser: function () {  
          //Get data from Local Storage  
          userList = angular.fromJson(localStorage.getItem("user"));                         
          return userList ? userList : [];  
      }  
  };  
});   

// Create the AngularJS module Employees and Register the storageService with it  
var app = angular.module('User', ['storageService']);    
  
// Create the Controller EmployeeController  
app.controller('UserController', ['$scope', 'getLocalStorage', function ($scope, getLocalStorage) {    
    $scope.appTitle = "LocalStorage Demo";    
    $scope.appHeadline = "AngularJS and HTML5";    
  
    //Read the Employee List from LocalStorage    
    $scope.user = getLocalStorage.getUser();    
  
    //Count the Employee List    
    $scope.count = $scope.user.length;    
  
  
    //Add Employee - using AngularJS push to add Employee in the Employee Object    
    //Call Update Employee to update the locally stored Employee List    
    //Reset the AngularJS Employee scope    
    //Update the Count    
    $scope.addUser = function () {    
        $scope.user.push({ 'firstName': $scope.firstName, 'lastName': $scope.lastName, 'mobile': $scope.mobile, 'email': $scope.email,'password': $scope.password,'dob': $scope.dob,'gender': $scope.gender});    
        getLocalStorage.updateUser($scope.user);    
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.mobile = '';
        $scope.email = '';
        $scope.password = '';    
        $scope.dob = '';    
        $scope.gender = '';    
        $scope.count = $scope.user.length;    
    };    
        
    //Delete Employee - Using AngularJS splice to remove the emp row from the Employee list    
    //All the Update Employee to update the locally stored Employee List    
    //Update the Count    
    $scope.deleteUser = function (usr) {                       
        $scope.user.splice($scope.user.indexOf(usr), 1);    
        getLocalStorage.updateUser($scope.user);    
        $scope.count = $scope.user.length;    
    };    
}]);  