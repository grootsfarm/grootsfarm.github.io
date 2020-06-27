var app = angular.module("grootsModule", []);
//var uri = "https://groots-7f64d.firebaseio.com/"

var accountsRef = firebase.database().ref('accounts');

app.controller("loginController", function($scope){   
        $scope.logIn = function(){
            var username = document.getElementById('username');
            var password = document.getElementById('password');
            var logged = false;
            if (username.value == null || username.value == "" || password.value == null || password.value == ""){
                $scope.message = "must fill both fields";
                return;
            }
            accountsRef.on('value', function(accounts){
                accounts.forEach(function (elem) {
                    if (elem.val().username == username.value && elem.val().password == password.value){
                        logged = true;
                        window.location.href = "./customers_list.html";
                    }
                });
            }, function(error){
                console.log("error (accounts): " + error.code);
            });
            if (!logged){
                $scope.message = "username or password is incorrect";
                password.value = "";
            }
        }
});