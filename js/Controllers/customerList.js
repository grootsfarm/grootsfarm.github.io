//var app = angular.module("customerModule", []);

var restaurantsRef = firebase.database().ref('restaurants');

app.controller("customerListController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    var listRestaurants = [];
    $scope.restaurants = [];
    $scope.newRest = {name: null, phone: null, email:null, website: null, city: null, lang: null, stars: 1, isInterviewed: false};
    $scope.selectedValue = null;
    $scope.selectedKey = null;
    $scope.listPages = [];
    $scope.page = 1;
    var Npage=0;
    var first=true;
    $scope.isInterviewed = false;
    Usualquestions = [
        {
            "question":"What's the hardest part about your vegetables supply chain ?",
            "answer":""
        },
        {
            "question":"Tell us more about the last time you encountered such problems.",
            "answer":""
        },
        {
            "question":"Why in their opinion was this hard ?",
            "answer":""
        },
        {
            "question":"What , if anything, have you done to try to solve the problem ?",
            "answer":""
        },
        {
            "question":" What don't you like about the solutions you've tried ?",
            "answer":""
        },
    ];

    if ($cookies.get("idUser") != null){
      firebase.database().ref("/accounts/" + $cookies.get("idUser")).once('value').then(function(data){
        if (data.val() == null){
            location.href = "#/";
        }
      }, function(err){
          console.log(err);
      });
      getdData();
    }
    else{
        location.href = "#/";
    }
    
    function getdData(){
        restaurantsRef.on('value', function(rests){
            listRestaurants = [];
            Object.keys(rests.val()).forEach(function (key) {
                listRestaurants.push({"key":key, info:rests.val()[key]});
            });
            if (first){
                first = false;
                $scope.$apply(loadData()); 
            }
            else{
                loadData();
            }
        
        }, function(err){
            console.log("Error: ", err.code);
        });
    }

    function loadData(){
        $scope.restaurants = [...listRestaurants];
        loadListPages($scope.restaurants);
    }
    function GetInterviewed(){
        $scope.restaurants = [];
        for(i = 0;i < listRestaurants.length;i++) {
            if (listRestaurants[i].info.isInterviewed == true){
                $scope.restaurants.push(listRestaurants[i]);
            }
        }
    }
    function loadListPages(data){
        $scope.page = 1;
        $scope.listPages = [];
        var len = data.length;
        if(len > 0){
            Npage = len / 5;
            if(Npage % 1 != 0){//(len % 5 != 0) {
                Npage = Npage + 1;
            }
            for(i=1;i<=Npage;i++){
                    $scope.listPages.push(i);
            }
        }
    }
    $scope.newRestaurant = function(){
        var newRestaurantRef = restaurantsRef.push();
        newRestaurantRef.set($scope.newRest);
    }
    $scope.UpdateRest = function(rest){
        $scope.selectedKey = rest.key;
        $scope.selectedValue = {...rest.info};
        document.getElementById("info-rest").style.display = "block";
    }
    $scope.addInterview = function(){
        if ($scope.selectedValue.isInterviewed == false){
            var elem = { questions : [...Usualquestions]};
            $scope.selectedValue.interview = elem;
            $scope.selectedValue.isInterviewed= true;
        }
    }
    $scope.addQuestion = function(){
        $scope.selectedValue.interview.questions.push({"question":"","answer":""});
    }
    $scope.editRestaurant = function(){
        $http.put("https://groots-7f64d.firebaseio.com/restaurants/" + $scope.selectedKey + ".json", $scope.selectedValue, {header : {'Content-Type' : 'application/json'}})
        .then(function(res){
            document.getElementById("info-rest").style.display = "none";
            $scope.selectedValue = null;
            document.getElementById("success").style.display = "block";

        });
    }

    $scope.cancelEdit = function(){
        document.getElementById("info-rest").style.display = "none";
        $scope.selectedValue = null;
    }
    $scope.deleteQuest = function(index){
        if (index >= 0){
            $scope.selectedValue.interview.questions.splice(index, 1);
            if ($scope.selectedValue.interview.questions.length == 0){
                $scope.selectedValue.isInterviewed = false;
            }

        }
    }
    $scope.Interviewed = function(){
        if ($scope.isInterviewed == false){
            GetInterviewed();
        }else{
            $scope.restaurants = listRestaurants;
        }
        loadListPages($scope.restaurants);
    }
    $scope.changePage=function(k){
    	$scope.page=k;
    };
    $scope.previous=function(){
    	if($scope.page>1)
    		$scope.page-=1;
    };
    $scope.next=function(){
    	if($scope.page<parseInt(Npage))
    		$scope.page+=1;
    };
}]);