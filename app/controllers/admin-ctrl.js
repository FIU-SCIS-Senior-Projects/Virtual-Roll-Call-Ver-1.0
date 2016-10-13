//CONTROLLER for admin app
adminModule.controller('adminCtrl', ['$scope', 'dataService', 'localStorageService', function($scope, dataService, localStorageService){

  //globals
  //get name from local storage for user profile customization
  var fname = localStorageService.get('fname');
  var lname = localStorageService.get('lname');
  $scope.name = fname + ' ' + lname;

  //add user to the database
  $scope.addUser = function(){

    var first_name = $scope.fName;
    var last_name = $scope.lName;
    var username = $scope.username;
    var password = $scope.password;
    var role = $scope.role;

    dataService.addUser(first_name, last_name, username, password, role)

    //http post request succeeded
    .then(
      function(data){

        //check for successful add and notify user accordingly
        if(data['Added'] === true){
          $scope.message = 'User successfully added!';
          $scope.errorMessage = false;
          $scope.successMessage = true;
        }
        else{
          $scope.message = 'Could not add user!';
          $scope.successMessage = false;
          $scope.errorMessage = true;  
        }
      },
      //http post request failed
      function(error){
        console.log('Error: ' + error);
      });
  };
  
  //retrieve all the officers in the database
  $scope.getOfficers = function(){

        //call get officers function in data service 
        dataService.getOfficers()

        //http post request succeeded
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

        //http post request failed
        function(error){
          console.log('Error: ' + error);
        });
      };

	//when change password button is clicked...
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
          });          
      }
    };


  }]);