//CONTROLLER for admin app
adminModule.controller('adminCtrl', ['$scope', 'dataService', 'localStorageService', '$window', function($scope, dataService, localStorageService, $window){

/***************
 * GLOBALS *
 ***************/

//get name from local storage for user profile customization
var fname = localStorageService.get('fname');
var lname = localStorageService.get('lname');
$scope.name = fname + ' ' + lname;

 /***************
 * ADD NEW USER *
 ***************/ 
 $scope.addUser = function(){

  //get values from input fields
  var first_name = $scope.fName;
  var last_name = $scope.lName;
  var username = $scope.username;
  var password = $scope.password;
  var role = $scope.role;

  dataService.addUser(first_name, last_name, username, password, role)
  .then(
    function(data){
      //check for successful add and notify user accordingly
      if(data['Added'] === true){

        $scope.message = 'User successfully added!';
        $scope.errorMessage = false;
        $scope.successMessage = true;
        
        //clear input fields
        $scope.fName = $scope.lName = $scope.username = $scope.password = $scope.role= '';
        
        //update edit users table to reflect the addition of new user (this can be improved; only get new users instead of all)
        $scope.getOfficers();
      }
      else{
        //the add was unsucessful
        $scope.message = 'Could not add user!';
        $scope.successMessage = false;
        $scope.errorMessage = true;  
      }
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

/*******************
 * EDIT USER MODAL *
 ******************/
 $scope.editUser = function(update_id, update_first, update_last, update_username, update_role){
  $scope.updateID = update_id; 
  $scope.updateFirst = update_first;
  $scope.updateLast = update_last;
  $scope.updateUsername = update_username; 
  $scope.updateRole = update_role;  
  $('#editModal').modal();
};


/***************
 * REMOVE USER *
 **************/
 $scope.removeUser = function(){

  //when delete button selected, prompt user for confirmation
  var deleteUser = $window.confirm('Are you sure you want to delete this user?');

  //if confirmed...
  if(deleteUser){

    var id = $scope.updateID;

    dataService.removeUser(id)
    .then(
      function(data){
        if(data['Removed'] === true){
          $scope.updateMessage = 'User successfully deleted!';
          $scope.updateErrorMessage = false;
          $scope.updateSuccessMessage = true;
          $scope.getOfficers();
        }else{
          $scope.updateMessage = 'Could not delete user!';
          $scope.updateSuccessMessage = false;
          $scope.updateErrorMessage = true;  
        }
      },
      function(error){
        console.log('Error: ' + error);
      });}};

/******************
 * EDIT USER DATA *
 *****************/
 $scope.updateUser = function(){

  var id = $scope.updateID; 
  var first_name = $scope.updateFirst;
  var last_name = $scope.updateLast;
  var username =$scope.updateUsername; 
  var role = $scope.updateRole; 

  dataService.updateUser(id, first_name, last_name, username, role)
  .then(
    function(data){

      if(data['Updated'] === true){
        $scope.updateMessage = 'User successfully updated!';
        $scope.updateErrorMessage = false;
        $scope.updateSuccessMessage = true;
        $scope.getOfficers();
      }
      else{
        $scope.updateMessage = 'Could not update user!';
        $scope.updateSuccessMessage = false;
        $scope.updateErrorMessage = true;  
      }
    },
    function(error){
      console.log('Error: ' + error);
    });};


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

  /******************
 * ADD NEW CATEGORY *
 *******************/ 
 $scope.addCategory = function(new_cat){

  //get values from input fields
  var category = new_cat;

  dataService.addCategory(category)
  .then(
    function(data){
      //check for successful add and notify user accordingly
      if(data['Added'] === true){

        $scope.message = 'Category successfully added!';
        $scope.errorMessage = false;
        $scope.successMessage = true;
        
        //clear input fields
        $scope.new_category = '';
        
        //update edit users table to reflect the addition of new user (this can be improved; only get new users instead of all)
        $scope.getCategories();
      }
      else{
        //the add was unsucessful
        $scope.message = 'Could not add category!';
        $scope.successMessage = false;
        $scope.errorMessage = true;  
      }
    },
    function(error){
      console.log('Error: ' + error);
    });};

  /*******************
 * EDIT CATEGORY MODAL *
 ******************/
 $scope.editCategory = function(update_id, update_name){
  $scope.updateID = update_id; 
  $scope.updateName = update_name; 
  $('#editModal').modal();
 };

 /******************
 * DELETE CATEGORY *
 ******************/
 $scope.deleteCategory = function(){};

/************************
 * UPDATE CATEGORY DATA *
 ***********************/
 $scope.updateCategory = function(){

  var id = $scope.updateID; 
  var name = $scope.updateName;

  dataService.updateCategory(id, name)
  .then(
    function(data){

      if(data['Updated'] === true){
        $scope.updateMessage = 'Category successfully updated!';
        $scope.updateErrorMessage = false;
        $scope.updateSuccessMessage = true;
        $scope.getCategories();
      }
      else{
        $scope.updateMessage = 'Could not update category!';
        $scope.updateSuccessMessage = false;
        $scope.updateErrorMessage = true;  
      }
    },
    function(error){
      console.log('Error: ' + error);
    });
};

}]);