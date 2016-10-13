//CONTROLLER for login
loginModule.controller('loginCtrl', ['$scope', '$cookies', 'localStorageService', 'dataService', '$window', function($scope, $cookies, localStorageService, dataService, $window) {

  //when login button is clicked...
  $scope.login = function(){

      //get values from the login input fields
      var username = $scope.username;
      var password = $scope.password;

      if(username != null && password != null) {

        //authenticate user
        dataService.login(username, password)
        .then(

          //http post request succeeded 
          function(data){

              //if username/password found in the database
              if(data['Username'] && data['Password']){
                localStorageService.set('id', data['userID']);
                localStorageService.set('fname', data['First_Name']);
                localStorageService.set('lname', data['Last_Name']);
              //start session and route accordingly
              //username and role are passed to session.php in query string
              $window.location.href = '../app/php/session.php?id=' + data['userID'] + '&name=' + data['First_Name'] + '&role=' + data['Role'];

            }
            else{
                //invalid credentials...notify user
                $scope.message = 'Invalid credentials. Please try again.';
                $scope.loginError = true;
              }
            },

          //http post request failed
          function(error){
            console.log('Error: ' + error);
          }
        );          
      };
    }
}]);