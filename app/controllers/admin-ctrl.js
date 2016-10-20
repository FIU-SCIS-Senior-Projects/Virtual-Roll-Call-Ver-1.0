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


/*******************
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

// $scope.updateTable = function(username){
//   dataService.getUser(username)
//   .then(
//     function(data){
//       if(data['Username'] === null){
//         $scope.officers = $filter('filter')($scope.officers, {username: data['Username']});
//       }else{
//         //add user to the list of officers in the view
//         var tmp = new Object();
//         tmp.id = data['userID'];
//         tmp.firstName = data['First_Name'];
//         tmp.lastName = data['Last_Name'];
//         tmp.username = data['Username'];
//         tmp.role = data['Role'];
//         $scope.officers.push(tmp);
//       }
//     }, 
//     function(error){
//       console.log('Error: ' + error);
//     });
// };

