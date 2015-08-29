angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

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
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContactsCtrl', function($scope, $http) {
  // $scope.contacts = Contacts.all();

  $scope.contacts = [];
  var ajax = $http.get('/travis_api/get_contacts');
  ajax.success(function(response){
    $scope.contacts = response.data;
  });
  ajax.error(function(response){
    alert('ajax error');
  });
})

.controller('ContactCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
})

.controller('EventsCtrl', function($scope, $http) {
  $scope.events = [];
  var ajax = $http.get('/travis_api/get_events');
  ajax.success(function(response){
    $scope.events = response.data;
  });
  ajax.error(function(response){
    alert('ajax error');
  });
});
