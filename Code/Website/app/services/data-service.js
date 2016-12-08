//SERVICE for shared controller
sharedModule.factory('sharedService', function($http, $q){
  return {
    getSiteNames: function(){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-site-names.php', {})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },
    getDocuments: function(){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-documents.php', {})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },
    getCategories: function(){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-categories.php', {})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },
    getOfficers: function(){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-officers.php', {})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },
    changePassword: function(id, curr_pass, new_pass){
      return $q(function(resolve, reject){
        $http.post('../app/php/change-password.php', {'id': id, 'current': curr_pass, 'new': new_pass})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    }
  }
});


//SERVICE for login controller
loginModule.factory('dataService', function($http, $q){
	return {
		login: function(username, password){
      return $q(function(resolve, reject){
        $http.post('../app/php/login.php', {'username': username, 'password': password})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    }
  }
});


//SERVICE for supervisor controller
adminModule.factory('dataService', function($http, $q){

  return {
    addUser: function(fname, lname, email, password, role){
      return $q(function(resolve, reject){
        $http.post('../app/php/add-user.php', {'fName': fname, 'lName': lname, 'email': email, 'password': password, 'role': role})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    getUser: function(username){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-user.php', {'username': username})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    updateUser: function(id, fname, lname, username, role){
      return $q(function(resolve, reject){
        $http.post('../app/php/edit-user.php', {'id': id, 'fName': fname, 'lName': lname, 'username': username, 'role': role})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    removeUser: function(id){
      return $q(function(resolve, reject){
        $http.post('../app/php/remove-user.php', {'id': id})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    addCategory: function(new_cat){
      return $q(function(resolve, reject){
        $http.post('../app/php/add-category.php', {'category': new_cat})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    removeCategory: function(id){
      return $q(function(resolve, reject){
        $http.post('../app/php/remove-category.php', {'category_id': id})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    updateCategory: function(cid, cname){
      return $q(function(resolve, reject){
        $http.post('../app/php/update-category.php', {'id': cid, 'name': cname})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    updateAppName: function(name){
      return $q(function(resolve, reject){
        console.log(name);
        $http.post('../app/php/update-app-name.php', {'name': name})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },

    updateDeptName: function(name){
      return $q(function(resolve, reject){
        $http.post('../app/php/update-dept-name.php', {'name': name})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    }
  }
});


//SERVICE for supervisor controller
supervisorModule.factory('dataService', function($http, $q){
  return {
    resetPassword: function(id, reset_pass){
      return $q(function(resolve, reject){
        $http.post('../app/php/reset-password.php', {'id': id, 'reset_pass': reset_pass})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    }
  }
});

//SERVICE for supervisor controller
officerModule.factory('dataService', function($http, $q){
  return {
    viewDocuments: function(){
      return $q(function(resolve, reject){
        $http.post('../app/php/get-documents.php', {})
        .then(
          function(response){
            resolve(response.data);
          },
          function(error){
            reject(error);
          });
      });
    },
  
  downloadDocument: function(upload_name){
      return $q(function(resolve, reject){
        $http.post('../app/php/view-document.php', {'upload_name': upload_name})
        .then(
          function(response){
            resolve(response.statusText);
          },
          function(error){
            reject(error);
          });
      });
    }
  }
});