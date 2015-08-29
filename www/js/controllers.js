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

.controller('ContactCtrl', function($scope, $stateParams) {
  $scope.contact = null;

  $scope.getContact = function() {
    var ajax = $http.get('/travis_api/get_contact/' + $stateParams.contactId);
    ajax.success(function(response){
      $scope.contact = response.data;
    });
    ajax.error(function(response){
      alert('ajax error');
    });
    return $scope.contact;
  };

})

.controller('EventCtrl', function($scope, $stateParams) {
  $scope.event = null;

  $scope.getEvent = function() {
    var ajax = $http.get('/travis_api/get_event/' + $stateParams.contactId);
    ajax.success(function(response){
      $scope.event = response.data;
    });
    ajax.error(function(response){
      alert('ajax error');
    });
    return $scope.event;
  };

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

  $scope.getFirstImage = function() {
    if (!$scope.events !== null && $scope.events.length > 0) {
      return "img/" + $scope.events[0].event_category + ".png";
    } else {
      return null;
    }
  };

  $scope.getFirstTitle = function() {
    if (!$scope.events !== null && $scope.events.length > 0) {
      return $scope.events[0].event_title;
    } else {
      return null;
    }
  };

  $scope.getFirstId = function() {
    if (!$scope.events !== null && $scope.events.length > 0) {
      return "#/app/events/" + $scope.events[0].event_id;
    } else {
      return null;
    }
  };

  $scope.getFirstDateTime = function() {
    if (!$scope.events !== null && $scope.events.length > 0) {
      return $scope.events[0].event_start_datetime;
    } else {
      return null;
    }
  };

  $scope.animateElementIn = function($el) {
    $el.removeClass('hidden');
    $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  $scope.animateElementOut = function($el) {
    $el.addClass('hidden');
    $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  $scope.getImage = function($el) {
    return "img/" + $el + ".png";
  };

});
