//CONTROLLER for login
loginModule.controller('loginCtrl', ['$scope', 'localStorageService', 'dataService', '$window', function($scope, localStorageService, dataService, $window) {

  //when login button is clicked...
  $scope.login = function(){

      //get values from the login input fields
      var username = $scope.username;
      var password = $scope.password;

      //authenticate user
      dataService.login(username, password)
      .then(
          //http post request succeeded 
          function(data){
             //if username/password found in the database
             if(data['Username'] && data['Password']){

               //saved user id and name to local storage
               localStorageService.set('id', data['userID']);
               localStorageService.set('fname', data['First_Name']);
               localStorageService.set('lname', data['Last_Name']);

               //route to home page according to role
               if(data['Role'] === 'Administrator'){
                $window.location.href = '../app/php/admin-profile.php';
               }else if (data['Role'] === 'Supervisor'){
                $window.location.href = '../app/php/supervisor-profile.php';
               }else{
                $window.location.href = '../app/php/officer-profile.php';
               }
             }else{
                //invalid credentials...notify user
                $scope.message = 'Invalid credentials. Please try again.';
                $scope.errorMessage = true;
              }
            },
          //http post request failed
          function(error){
            console.log('Error: ' + error);
          });          
  };
}]);