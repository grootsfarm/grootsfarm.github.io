var app=angular.module("grootsApp",["ngRoute", "angularCSS"]);

app.config(["$routeProvider", "$locationProvider",function($routeProvider, $locationProvider){
	$routeProvider
	.when("/",{
		templateUrl: "view/home.html",
		controller: "langCtrl",
		css: "../css/home.css"
    })
    /*.when("/About",{
        templateUrl: "view/about.html",
      //  controller: "AdminController"
    })*/.when("/login",{
    	templateUrl: "view/auth.html",
        controller: "loginController"
	}).when("/admin",{
    	templateUrl: "view/customers_list.html",
        controller: "customerListController"
	}).otherwise({
        redirectTo: "/"
	});
	$locationProvider.html5Mode(true);
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