var sharedModule = angular.module('shared', ['admin', 'supervisor', 'login']);
var loginModule = angular.module('login', ['ngCookies', 'LocalStorageModule']);
var adminModule = angular.module('admin', ['ngRoute', 'ngCookies', 'LocalStorageModule', 'shared']);
var supervisorModule = angular.module('supervisor', ['ngRoute', 'ngCookies', 'LocalStorageModule','shared']);

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
		controller: 'sharedCtrl'
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
	.when('/upload', {
		templateUrl: '../../views/partials/manage-documents.html',
		controller: 'supervisorCtrl'
	})
	.when('/reset', {
		templateUrl: '../../views/partials/reset-password.html',
		controller: 'supervisorCtrl'
	})
	.when('/password', {
		templateUrl: '../../views/partials/change-password.html',
		controller: 'sharedCtrl'
	})
	.otherwise({
		redirectTo: '/upload'
	});
});
