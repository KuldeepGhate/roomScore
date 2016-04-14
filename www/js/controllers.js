angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal) {
    $scope.userData = {};
    $ionicModal.fromTemplateUrl('templates/roomInfo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    //Completely close the app.
    $scope.$closeApp = function () {
        $scope.modal.hide();
    };
    $scope.openApp = function () {
        $scope.modal.show();
    };
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    })
})
.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.data = {};
    $scope.doLogin = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            $state.go('app.roomInfo');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
//  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
//
//    // Simulate a login delay. Remove this and replace with your login
//    // code if using a login system
//    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
//  };
})

.controller('roomInfoCtrl', function($scope) {
    $scope.playlists = [
        { title: 'La Pappilon', id: 1 },
        { title: 'Casterly Rock', id: 2 },
    ];
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
