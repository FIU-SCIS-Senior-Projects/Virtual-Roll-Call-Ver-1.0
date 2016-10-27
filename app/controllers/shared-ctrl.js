sharedModule.controller('sharedCtrl', ['$scope', 'sharedService', 'localStorageService', '$window', function($scope, sharedService, localStorageService, $window){

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
      sharedService.changePassword(id, current_password, new_password)
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