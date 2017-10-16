/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("PharmacyModule", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
            .when("/stock", {
                templateUrl: "views/MainStockTable.html",
                controller: "StockController"
            })
            .when("/pending_content", {
                templateUrl: "views/PendingContent.html",
                controller: "ContentController"
            })
            .when("/all_content", {
                templateUrl: "views/AllContent.html",
                controller: "ContentController"
            })
            .when("/all_users", {
                templateUrl: "views/AllUsers.html",
                controller: "UserController"
            })
            .when("/pending_users", {
                templateUrl: "views/PendingUsers.html",
                controller: "UserController"
            })
            .when("/editors", {
                templateUrl: "views/Editors.html",
                controller: "EditorController"
            })
            .when("/responses", {
                templateUrl: "views/Responses.html",
                controller: "ResponsesController"
            });
});
