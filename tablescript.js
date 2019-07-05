
//Create the AngularJS module named StorageService
//Create getLocalStorage service to access UpdateUser and getUser method  
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

// Create the AngularJS module User and Register the storageService with it  
var app = angular.module('User', ['storageService']);    
  
// Create the Controller UserController  
app.controller('UserController', ['$scope','$window', 'getLocalStorage', function ($scope, $window,getLocalStorage) {    
    $scope.appTitle = "LocalStorage Demo";    
    $scope.appHeadline = "AngularJS and HTML5";    
  
    //Read the User List from LocalStorage    
    $scope.user = getLocalStorage.getUser();    
  
    //Count the User List    
    $scope.count = $scope.user.length;    
  
  
    //Add User - using AngularJS push to add Employee in the User Object    
    //Call Update User to update the locally stored User List    
    //Reset the AngularJS User scope    
    //Update the Count    
    $scope.addUser = function () {    
        $scope.user.push({ 'firstName': $scope.firstName, 'lastName': $scope.lastName, 'mobile': $scope.mobile, 'email': $scope.email,'password': $scope.password,'dob': $scope.dob,'gender': $scope.gender});    
        getLocalStorage.updateUser($scope.user);    
        
        $window.location.href= 'login.html';
        
    };    


    $scope.checkUser = function () {

        var data = JSON.parse(localStorage.getItem("user"));

        var loggedIn = 0;
          
        var findUser = data.filter(function(obj) {
            return obj.email === $scope.email && obj.password === $scope.password;
        });        

        if(findUser.length == 0){
            $window.location.href= 'login.html';

        }else{
            loggedIn = 1;
            $window.location.href= 'profile.html';
        }
    };

        
    //Delete User - Using AngularJS splice to remove the emp row from the User list    
    //All the Update User to update the locally stored User List    
    //Update the Count    
    $scope.deleteUser = function (usr) {  
        var del =  confirm("Are you sure you want to delete this entry ?");

        if(del == true){      
            $scope.user.splice($scope.user.indexOf(usr), 1);    
            getLocalStorage.updateUser($scope.user);    
            $scope.count = $scope.user.length;    
        }
    };   
                    
     
}]);  




