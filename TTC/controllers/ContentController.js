//var app = angular.module("PharmacyModule",[]);

app.controller("ContentController", function ($scope, $http) {

    var status = "Pending";
    $scope.contents = [];

    $http.get("http://localhost:8086/contents/status/"+status).then(function (response) {
        $scope.contents = response.data;
    });

    function refreshContents() {
        $http.get("http://localhost:8086/contents/status/"+status).then(function (response) {
            $scope.contents = response.data;
        });
    }

    //Approve an ad content
    $scope.approveContent = function (contentID) {
        var contID = contentID;
        var newStatus = {
            Status:"Approved"

        };


        $http.put("http://localhost:8086/contents/" + contID,newStatus).then(function (response) {

            alert("Ad content has been approved successfully!");
            refreshContents();
        }, function (response) {
            alert("Content Approving Failed!")
        });

    };

    //Reject an ad content
    $scope.rejectContent = function (contentID) {
        var contID = contentID;
        var newStatus = {
            Status:"Rejected"

        };

        $http.put("http://localhost:8086/contents/" + contID,newStatus).then(function (response) {

            alert("Ad content has been rejected successfully!");
            refreshContents();
        }, function (response) {
            alert("Content Rejecting Failed !")
        });

    };


});