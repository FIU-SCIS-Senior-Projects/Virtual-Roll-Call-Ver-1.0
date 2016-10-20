//CONTROLLER for supervisor app
supervisorModule.controller('supervisorCtrl', ['$scope', '$cookies', 'localStorageService', 'dataService', function($scope, $cookies, localStorageService, dataService){

/**********
* GLOBALS *
**********/

//get name from local storage for user profile customization
var fname = localStorageService.get('fname');
var lname = localStorageService.get('lname');
$scope.name = fname + ' ' + lname;

/****************
* GET ALL USERS *
*****************/
$scope.getOfficers = function(){
  dataService.getOfficers()
  .then(
    function(data){

    //initialize an empty array to store results from the database
    var officers = [];

    //for each officer in the result
    for (var x in data){

    //create an object and set object properties (i.e. officer data)
    var tmp = new Object();

    tmp.id = data[x].id;
    tmp.firstName = data[x].firstName;
    tmp.lastName = data[x].lastName;
    tmp.username = data[x].username;
    tmp.role = data[x].role;

    //store results in officers
    officers.push(tmp);
    }

    //update value in view for use in ng-repeat (to populate)
    $scope.officers = officers;

    },
    function(error){
      console.log('Error: ' + error);
    });};

/*************************
* GET SELECTED USER DATA *
*************************/
$scope.selected = {};

$scope.select= function(index){
  $scope.pick = index;
};

/**********************
* RESET USER PASSWORD *
**********************/
$scope.resetPassword = function(reset_password, reset_password_conf){

//get the id of the selected user 
var id = $scope.selected.id;

//new password and confirmation must match
if(reset_password !== reset_password_conf){
  $scope.message = 'The new passwords don\'t match!';
  $scope.successMessage = false;
  $scope.errorMessage = true;
}else{

//call reset password function in data service
dataService.resetPassword(id, reset_password, reset_password_conf)

  //http post request succeeded
  .then(
    function(data){

    //check for successful update and notify user accordingly
    if(data['Updated'] === true){
      $scope.message = 'Officer password was successfully updated!';
      $scope.successMessage = true;
      $scope.errorMessage = false;

    //clear input fields
    //TO DO: Not clearing, need to investigate 
    $scope.reset_pass = $scope.reset_pass_conf = null;

    }
    },
    //http post request failed
    function(error){
      console.log('Error: ' + error);
    });}};

/******************
* CHANGE PASSWORD *
******************/
$scope.changePassword = function(){

//get values from the change password input fields
var id = localStorageService.get('id');
var current_password = $scope.curr_pass;
var new_password = $scope.new_pass;
var conf_new_password = $scope.conf_new_pass;

//check for new password/confirmation mismatch
if(new_password !== conf_new_password){
  $scope.message = 'The new passwords don\'t match!';
  $scope.successMessage = false;
  $scope.errorMessage = true;
}

//otherwise send request to backend
else{

//calling change function in data service
dataService.changePassword(id, current_password, new_password)
.then(

//http post request succeeded 
function(data){

//check for successful update and notify user accordingly
if(data['Updated'] === true){
  $scope.message = 'Your password was successfully updated!';
  $scope.errorMessage = false;
  $scope.successMessage = true;
}
else{
//current password was incorrect
$scope.message = 'Invalid credentials. Please try again.';
$scope.successMessage = false;
$scope.errorMessage = true;
}
},
//http post request failed
function(error){
  console.log('Error: ' + error);
});}};
}]);