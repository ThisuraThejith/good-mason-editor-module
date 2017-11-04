/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller("AllContentController", function ($scope, $http) {

    var status = "Approved";
    $scope.contents = [];

    $scope.content_id = '';


    $http.get("http://localhost:8086/contents/status/" + status).then(function (response) {
        $scope.contents = response.data;
    });

    function refreshApprovedContents() {
        $http.get("http://localhost:8086/contents/status/" + status).then(function (response) {
            $scope.contents = response.data;
        });
    }

    $scope.resetPayment = function(){
        $scope.payment_method = '';
        $scope.payment_date = '';
        $scope.payment_amount = '';
        $scope.reference_no = '';
    };

    $scope.deleteContent = function (ID) {
        if (confirm("Are you sure you want to delete this ad content?")) {
            var delContent = ID;

            $http.delete("http://localhost:8086/contents/" + delContent).then(function (response) {
                alert("Ad Content Deleted Successfully!");
                refreshApprovedContents();
            }, function (response) {
                alert("Ad Content Deleting Failed !");
            });
        }
    };

    $scope.promoteContent = function (ID) {
        $scope.content_id = ID;

        var newStatus = {
            Status: "Promoted"

        };


        $http.put("http://localhost:8086/contents/" + $scope.content_id, newStatus).then(function (response) {

            alert("Content has been promoted! Please insert the payment information below");
            refreshApprovedContents();
        }, function (response) {
            alert("Promoting Content Failed!");
        });
    };

    $scope.confirmPayment = function () {

        $scope.payments = [];

        var newPayment = {
            ContentID: $scope.content_id,
            Method: $scope.payment_method,
            Date: $scope.payment_date,
            Amount: $scope.payment_amount,
            ReferenceNo: $scope.reference_no
        };
        console.log(newPayment)
        if (confirm("Are you sure you want to add a payment to content of ID " + $scope.content_id)) {

            if (newPayment.Method != null && newPayment.Date != 'mm/dd/yyyy' && newPayment.Amount != null && newPayment.ReferenceNo != null) {
                $http.post("http://localhost:8086/payments", newPayment).then(function (response) {
                    alert("Payment Added Successfully!");
                    refreshApprovedContents();
                    $scope.resetPayment();
                }, function (response) {
                    alert("Payment Adding Failed !");
                });
            } else {
                alert("Inputs are not valid !");
            }
        }
    };
});