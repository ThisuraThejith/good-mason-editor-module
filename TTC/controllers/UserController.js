
app.controller("UserController", function ($scope, $http) {

    var status = "Active";
    $scope.users = [];

    $http.get("http://localhost:8086/users/status/" +status).then(function (response) {
        $scope.users = response.data;
    });

    function refreshUsers() {
        $http.get("http://localhost:8086/users/status/" +status).then(function (response) {
            $scope.users = response.data;
        });
    }

    //Disable an user
    $scope.disableUser = function (Username) {
        if (confirm("Are you sure you want to disable this user?")) {
            var username = Username;
            var newStatus = {
                Status: "Disabled"

            };


            $http.put("http://localhost:8086/users/" + username, newStatus).then(function (response) {

                alert("User has been disabled successfully!");
                refreshUsers();
            }, function (response) {
                alert("Disabling User Failed!");
            });
        }
    };


        
});