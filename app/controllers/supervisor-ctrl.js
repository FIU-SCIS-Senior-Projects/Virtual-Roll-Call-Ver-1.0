//CONTROLLER for supervisor app
supervisorModule.controller('supervisorCtrl', ['$scope', 'localStorageService', 'dataService', '$controller', function($scope, localStorageService, dataService, $controller){
  
  //TO DO: SAVE AS GLOBALS OR IN SHAREDCTRL
  /***** GLOBALS *****/
  //get name from local storage for user profile customization
  var fname = localStorageService.get('fname');
  var lname = localStorageService.get('lname');
  $scope.name = fname + ' ' + lname;
  $scope.password_pattern = '^[a-zA-Z0-9]{8,}$';
  $scope.pattern_descr = 'Must contain at least 8 or more characters. Only alphanumeric characters allowed.';

  /***** SHARED FUNCTIONS *****/
  var sharedCtrl = $controller('sharedCtrl', {$scope: $scope});

  $scope.getOfficers = function(){
    sharedCtrl.getOfficers();
  };

  $scope.getCategories = function(){
    sharedCtrl.getCategories();
  }

  $scope.getDocuments = function(){
    sharedCtrl.getDocuments();
  }
  
  /***** ALERT FUNCTIONS *****/
  //alert functions (displays accordingly in views)
  $scope.alert = sharedCtrl.alert;

  /***** SUPERVISOR FUNCTIONS *****/
  /***** GET SELECTED USER DATA *****/
  //TO DO: ENCAPSULATE THIS FUNCTIONALITY & UPDATE VIEW
  $scope.selected = {};

  $scope.select= function(index){
    $scope.pick = index;
  };
  
  //helper for ng-class
  $scope.is_selected = function(index){
    if($scope.pick === index){
      return true;
    }else{
      return false;
    }
  }
  
  //resets selection when value in search bar is entered 
  $scope.$watch('search', function() {
     $scope.selected = {};
     $scope.pick = null;
  });

  /***** RESET USER PASSWORD *****/
  $scope.resetPassword = function(reset_password, reset_password_conf){

  //get the id of the selected user 
  var id = $scope.selected.id;

  //new password and confirmation must match
  if(reset_password !== reset_password_conf){
    $scope.alert.closeAll();
    $scope.alert.addAlert('danger', "The new passwords don\'t match!");
    this.reset_pass = this.reset_pass_conf = '';
  }else{
  //call reset password function in data service
  dataService.resetPassword(id, reset_password, reset_password_conf)
    .then(
      function(data){
      if(data['Updated'] === true){
        $scope.alert.closeAll();
        $scope.alert.addAlert('success', 'Officer password was successfully updated!');
        this.reset_pass = this.reset_pass_conf = '';
      }
    },
      function(error){
        console.log('Error: ' + error);
      });
  }};

  /***** SORT TABLE HEADERS *****/
  $scope.sortTable = function(order){
    $scope.orderBy = order; 
  };

}]);