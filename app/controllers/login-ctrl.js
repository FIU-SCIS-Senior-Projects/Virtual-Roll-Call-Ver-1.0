//CONTROLLER for login app
loginModule.controller('loginCtrl', ['$scope', 'dataService', '$window', function($scope, dataService, $window) {

  //initialize username, password, and loginerror
  var username = '';
  var password = '';

  //when login button is clicked...
  $scope.login = function(){

      //get values from the login input fields
      username = $scope.username;
      password = $scope.password;

      //authenticate user
      dataService.login(username, password)
      .then(

          //http post request succeeded 
          function(data){

            console.log(data["username"]);

              //if username/password found in the database
              if(data['username'] && data['password'] && (data['password'] === password)){

              //start session and route accordingly
              //username and role are passed to session.php in query string
              $window.location.href = '../app/php/session.php?username=' + data['username'] + '&role=' + data['role'];

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

  }]);