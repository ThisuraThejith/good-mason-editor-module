

app.controller("EditorController",function ($scope,$http){

    $scope.editors = [];

    $http.get("http://localhost:8086/editors").then(function (response) {
        $scope.editors = response.data;
    });

    function refreshEditors() {
        $http.get("http://localhost:8086/editors").then(function (response) {
            $scope.editors = response.data;
        });
    }

    $scope.deleteEditor = function (Username) {

        var delEditor = Username;

        $http.delete("http://localhost:8086/editors/" + delEditor).then(function (response) {
            alert("Editor Deleted Successfully!");
            refreshEditors();
        }, function (response) {
            alert("Editor Deleting Failed !")
        });

    };

    $scope.addEditor = function () {
        var newEditor = {
            Username:$scope.username,
            Name: $scope.full_name,
            Email:$scope.email
        };

        if (newEditor.Username != null && newEditor.Name != null && newEditor.Email != null) {
            $http.post("http://localhost:8086/editors", newEditor).then(function (response) {
                alert("New Editor Added Successfully!");
                refreshEditors();
            }, function (response) {
                alert("New Editor Adding Failed !")
            });
        } else {
            alert("Inputs are not valid !");
        }
    };

});