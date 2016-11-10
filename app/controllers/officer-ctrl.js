//CONTROLLER for officer app
officerModule.controller('officerCtrl', ['$scope', 'localStorageService', 'dataService', '$controller', function($scope, localStorageService, dataService, $controller){
  
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

  $scope.getCategories = function(){
    sharedCtrl.getCategories();
  }

  $scope.viewDocuments = function(cat_name){
    var cat = cat_name;
    console.log(cat);
  }

  /***** ALERT FUNCTIONS *****/
  //alert functions (displays accordingly in views)
  $scope.alert = sharedCtrl.alert;

}]);