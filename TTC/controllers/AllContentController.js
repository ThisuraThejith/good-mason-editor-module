/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller("AllContentController", function ($scope, $http) {

    var status = "Approved";
    $scope.contents = [];

    $http.get("http://localhost:8086/contents/status/"+status).then(function (response) {
        $scope.contents = response.data;
    });

    function refreshApprovedContents() {
        $http.get("http://localhost:8086/contents/status/"+status).then(function (response) {
            $scope.contents = response.data;
        });
    }

    $scope.deleteContent = function (ID) {

        var delContent = ID;

        $http.delete("http://localhost:8086/contents/" + delContent).then(function (response) {
            alert("Ad Content Deleted Successfully!");
            refreshApprovedContents();
        }, function (response) {
            alert("Ad Content Deleting Failed !");
        });

    };
});