/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller("ResponsesController", function($scope, $http) {

    var status = "Under Inspection";
    $scope.responses = [];

    $http.get("http://localhost:8086/responses/status/" +status).then(function (response) {
        $scope.responses = response.data;
    });

    function refreshResponses() {
        $http.get("http://localhost:8086/responses/status/" +status).then(function (response) {
            $scope.responses = response.data;
        });
    }

    //Add as success story
    $scope.successStory = function (Username) {
        var username = Username;
        var newStatus = {
            Status:"Success"
        };

        $http.put("http://localhost:8086/responses/" + username,newStatus).then(function (response) {

            alert("Response has been added as a success story successfully!");
            refreshResponses();
        }, function (response) {
            alert("Adding response as a success story Failed!");
        });

    };

    //Delete an user response
    $scope.deleteResponse = function (Username) {
        if (confirm("Are you sure you want to delete this user query?")) {
            var delResponse = Username;

            $http.delete("http://localhost:8086/responses/" + delResponse).then(function (response) {
                alert("Response Deleted Successfully!");
                refreshResponses();
            }, function (response) {
                alert("Response Deleting Failed !");
            });
        }
    };

});