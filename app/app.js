var loginModule = angular.module('login', ['ngCookies', 'LocalStorageModule']);
var adminModule = angular.module('admin', ['ngRoute', 'ngCookies', 'LocalStorageModule']);
var supervisorModule = angular.module('supervisor', ['ngRoute', 'ngCookies', 'LocalStorageModule']);

adminModule.config(function($routeProvider){
	$routeProvider
	.when('/settings', {
		templateUrl: '../../views/partials/site-settings.html',
		controller: 'adminCtrl'
	})
	.when('/user-management', {
		templateUrl: '../../views/partials/user-management.html',
		controller: 'adminCtrl'
	})
	.when('/password', {
		templateUrl: '../../views/partials/change-password.html',
		controller: 'adminCtrl'
	})
	.when('/reporting', {
		templateUrl: '../../views/partials/reporting.html',
		controller: 'adminCtrl'
	})
	.otherwise({
		redirectTo: '/user-management'
	});
});

supervisorModule.config(function($routeProvider){
	$routeProvider
	.when('/reset', {
		templateUrl: '../../views/partials/reset-password.html',
		controller: 'supervisorCtrl'
	})
	.when('/password', {
		templateUrl: '../../views/partials/change-password.html',
		controller: 'supervisorCtrl'
	})
	.otherwise({
		redirectTo: '/reset'
	});
});
