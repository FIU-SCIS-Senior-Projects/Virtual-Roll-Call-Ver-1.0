var sharedModule = angular.module('shared', ['admin', 'supervisor', 'officer', 'login']);
var loginModule = angular.module('login', ['LocalStorageModule']);
var adminModule = angular.module('admin', ['ngRoute', 'LocalStorageModule', 'shared', 'flow', 'ui.bootstrap']);
var supervisorModule = angular.module('supervisor', ['ngRoute', 'LocalStorageModule', 'shared', 'ui.bootstrap']);
var officerModule = angular.module('officer', ['ngRoute', 'LocalStorageModule', 'shared', 'ui.bootstrap']);

adminModule.config(function($routeProvider){
	$routeProvider
	.when('/categories', {
		templateUrl: '../../views/partials/category-management.html',
		controller: 'adminCtrl'
	})
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

officerModule.config(function($routeProvider){
	$routeProvider
	.when('/categories', {
		templateUrl: '../../views/partials/view-categories.html',
		controller: 'officerCtrl'
	})
	.when('/documents', {
		templateUrl: '../../views/partials/view-documents.html'
	})
	.otherwise({
		redirectTo: '/categories'
	});
});
