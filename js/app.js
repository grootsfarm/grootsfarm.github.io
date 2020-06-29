var app=angular.module("grootsApp",["ngRoute", "angularCSS", "ngCookies"]);

app.config(["$routeProvider", "$locationProvider",function($routeProvider, $locationProvider){
	$routeProvider
	.when("/",{
		templateUrl: "view/home.html",
		controller: "langCtrl",
		css: "css/home.css"
    })
    /*.when("/About",{
        templateUrl: "view/about.html",
      //  controller: "AdminController"
    })*/.when("/login",{
		url: "/login",
    	templateUrl: "view/auth.html",
		controller: "loginController",
		css: "css/auth.css"
	}).when("/admin",{
    	templateUrl: "view/customers_list.html",
		controller: "customerListController",
		css: "css/list.css"
	}).otherwise({
        redirectTo: "/"
	});
	$locationProvider.hashPrefix('');
	//$locationProvider.html5Mode({
	//	enabled: true,
	//	requireBase: false
	  //});
}]);

app.controller("langCtrl",["$scope","$http",function($scope,$http){
	$scope.lang=null;
	$scope.selectedLang="fr";

	$http.get('./language.json',{header : {'Content-Type' : 'application/json'}})
	.then(function(res){
        $scope.lang=res.data["fr"];
	});
	$scope.changed=function(){
		$http.get("./language.json")
		.then(function(res){
			$scope.lang=res.data[$scope.selectedLang];
		});
	};
}]);