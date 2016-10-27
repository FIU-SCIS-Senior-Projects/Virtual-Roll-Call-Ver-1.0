//CONTROLLER for supervisor app
supervisorModule.controller('supervisorCtrl', ['$scope', '$cookies', 'localStorageService', 'dataService', function($scope, $cookies, localStorageService, dataService){

/**********
* GLOBALS *
**********/

//get name from local storage for user profile customization
var fname = localStorageService.get('fname');
var lname = localStorageService.get('lname');
$scope.name = fname + ' ' + lname;

/********************
 * GET ALL CATEGORIES *
 **********************/
 $scope.getCategories = function(){

  dataService.getCategories()
  .then(
    function(data){

      //initialize an empty array to store results from the database
      var categories = [];

      //for each category in the result
      for (var x in data){

      //create an object and set object properties (i.e. categories data)
      var tmp = new Object();
      tmp.id = data[x].id;
      tmp.name = data[x].name;

      //store results in categories
      categories.push(tmp);
    }

    //update value in view for use in ng-repeat (to populate)
    $scope.categories = categories;
    
  },
  function(error){
    console.log('Error: ' + error);
  });};

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

/********************
 * UPLOAD DOCUMENT *
 ********************/
 $scope.uploadDocument = function(){

  //get values from input fields
  var file_name = $scope.fileName;
  var category = $scope.category;
  
  dataService.uploadDocument(file_name, category)
  .then(
    function(data){
      //check for successful add and notify user accordingly
      if(data['Uploaded'] === true){

        $scope.message = 'Document successfully uploaded!';
        $scope.errorMessage = false;
        $scope.successMessage = true;
        
        //clear input fields
        $scope.file_name = '';
        
      }
      else{
        //the add was unsucessful
        $scope.message = 'Could not upload document!';
        $scope.successMessage = false;
        $scope.errorMessage = true;  
      }
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

}]);