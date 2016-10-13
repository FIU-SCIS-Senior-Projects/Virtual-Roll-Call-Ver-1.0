//CONTROLLER for supervisor app
supervisorModule.controller('supervisorCtrl', ['$scope', '$cookies', 'localStorageService', 'dataService', function($scope, $cookies, localStorageService, dataService){

  //globals
  //get name from local storage for user profile navigation
  var fname = localStorageService.get('fname');
  var lname = localStorageService.get('lname');
  $scope.name = fname + ' ' + lname;

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
          }
        );          
      }
    };

	//runs when user views reset.html...
	$scope.getOfficers = function(){

        //call get officers function in data service 
        dataService.getOfficers()

		//http post request succeeded
		.then(function(data){

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
		}
   );
	};

	//populates with asoociated data for a selected row
	$scope.edit = {};

	$scope.resetPassword = function(reset_password) {

		//Need to add validation when radio button not selected
		//$scope.message = 'Please select an officer from the list!';
		//$scope.updateMessage = true;

		//get the user id for the selected row
		var id = $scope.edit.officer.id;

        //call reset password function in data service
        dataService.resetPassword(id, reset_password)

        //http post request succeeded
        .then(function(data){

			//check for successful update and notify user accordingly
			if(data['Updated'] === true){
        $scope.message = 'Officer password was successfully updated!';
        $scope.successMessage = true;
      }
    },

        //http post request failed
        function(error){
        	console.log('Error: ' + error);
        }
        );
      };
    }]);