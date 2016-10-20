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

//SERVICE for supervisor controller
adminModule.factory('dataService', function($http, $q){
  
  //return a service object; functions here are available to change password controller
  return {

    //promise that returns an http response object
    changePassword: function(id, curr_pass, new_pass){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/change-password.php', {'id': id, 'current': curr_pass, 'new': new_pass})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    addUser: function(fname, lname, email, password, role){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/add-user.php', {'fName': fname, 'lName': lname, 'email': email, 'password': password, 'role': role})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    getUser: function(username){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/get-user.php', {'username': username})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    updateUser: function(id, fname, lname, username, role){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/edit-user.php', {'id': id, 'fName': fname, 'lName': lname, 'username': username, 'role': role})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    removeUser: function(id){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/remove-user.php', {'id': id})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    getOfficers: function(){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/get-officers.php', {})
        .then(

          //return response data if it succeeds
          function(response){
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

//SERVICE for supervisor controller
supervisorModule.factory('dataService', function($http, $q){
  
  //return a service object; functions here are available to change password controller
  return {

    //promise that returns an http response object
    changePassword: function(id, curr_pass, new_pass){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/change-password.php', {'id': id, 'current': curr_pass, 'new': new_pass})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    getOfficers: function(){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/get-officers.php', {})
        .then(

          //return response data if it succeeds
          function(response){
            resolve(response.data);
          },

          //otherwise return response error
          function(error){
            reject(error);
          });
      });
    },

    //promise that returns an http response object
    resetPassword: function(id, reset_pass){

      //$q helps functions run asynchronously; will return response of http post request when it completes
      return $q(function(resolve, reject){

        $http.post('../php/reset-password.php', {'id': id, 'reset_pass': reset_pass})
        .then(

          //return response data if it succeeds
          function(response){
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