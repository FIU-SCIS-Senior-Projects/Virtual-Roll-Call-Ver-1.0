//SERVICE for login controller
loginModule.factory('dataService', function($http, $q){
	
	//return a service object; functions here are available to login controller
	return {

		//promise that returns an http response object
		login: function(username, password){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../app/php/login.php', {'username': username, 'password': password})
        .then(

          //return response data if it succeeds
          function(response){
            console.log(response.data);
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    }
  }
});