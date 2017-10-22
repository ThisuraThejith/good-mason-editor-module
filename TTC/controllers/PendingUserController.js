/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller("PendingUserController", function ($scope, $http) {

    var status = "Pending";
    $scope.users = [];

    $http.get("http://localhost:8086/users/status/" +status).then(function (response) {
        $scope.users = response.data;
    });

    function refreshPendingUsers() {
        $http.get("http://localhost:8086/users/status/" +status).then(function (response) {
            $scope.users = response.data;
        });
    }

    //Approve an user account
    $scope.activateUser = function (Username) {
        var username = Username;
        var newStatus = {
            Status:"Active",
            Likes : 0,
            Dislikes : 0
        };

        $http.put("http://localhost:8086/accounts/" + username,newStatus).then(function (response) {

            alert("User has been activated successfully!");
            refreshPendingUsers();
        }, function (response) {
            alert("Activating User Failed!");
        });

    };

    //Reject an user account
    $scope.rejectUser = function (Username) {
        var username = Username;
        var newStatus = {
            Status:"Rejected"

        };


        $http.put("http://localhost:8086/users/" + username,newStatus).then(function (response) {

            alert("User has been rejected successfully!");
            refreshPendingUsers();
        }, function (response) {
            alert("Rejecting User Failed!");
        });

    };
   
});

