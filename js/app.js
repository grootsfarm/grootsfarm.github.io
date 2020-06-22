var app=angular.module("grootsApp",["ngRoute"]);

app.config(["$routeProvider",function($routeProvider){
    $routeProvider
    .when("/About",{
        templateUrl: "pages/about.html",
      //  controller: "AdminController"
    }).when("/Admin",{
    	templateUrl: "pages/auth.html",
   //     controller: "AdminController"
    });
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