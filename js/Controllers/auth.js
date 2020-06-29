//var app = angular.module("grootsModule", []);
//var uri = "https://groots-7f64d.firebaseio.com/"

var accountsRef = firebase.database().ref('accounts');

app.controller("loginController", ["$scope", "$cookies", function($scope, $cookies){   
        var accountsList = [];

        accountsRef.on('value', function(accounts){
            accountsList = [];
            Object.keys(accounts.val()).forEach(function (key) {
                accountsList.push({"key": key, "info": accounts.val()[key]});
            });
        }, function(error){
            console.log("error (accounts): " + error.code);
        });
        $scope.logIn = function(){
            console.log(accountsList);
            var username = document.getElementById('username');
            var password = document.getElementById('password');
            var logged = false;
            if (username.value == null || username.value == "" || password.value == null || password.value == ""){
                $scope.message = "must fill both fields";
                return;
            }
            if (accountsList.length > 0){
                for(i=0;i<accountsList.length;i++){
                    if (accountsList[i].info.username == username.value && accountsList[i].info.password == password.value){
                        logged = true;
                        $cookies.put("idUser", accountsList[i].key);
                        window.location.href = "#/admin";
                        return;
                    }
                }
            }
            $scope.message = "username or password is incorrect";
            password.value = "";
        }
}]);