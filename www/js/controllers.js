angular.module('starter.controllers', ['ionic', 'uiGmapgoogle-maps'])

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

.controller('EticketsCtrl', function($scope, $http) {

  $scope.flight_tickets = [];
  $scope.hotel_tickets = [];

  var ajax = $http.get('/travis_api/get_tickets');
  ajax.success(function(response){
    $scope.flight_tickets = response.data['flight_tickets'];
    $scope.hotel_tickets = response.data['hotel_tickets'];
  });
  ajax.error(function(response){
    alert('ajax error');
  });

})

.controller('FlightTicketCtrl', function($scope, $http, $stateParams) {

  $scope.flight_ticket = null;

  var ajax = $http.get('/travis_api/get_flight_ticket/' + $stateParams.flight_ticket_id);
  ajax.success(function(response){
    $scope.flight_ticket = response.data[0];
  });
  ajax.error(function(response){
    alert('ajax error');
  });

})

.controller('HotelTicketCtrl', function($scope, $http, $stateParams) {

  $scope.hotel_ticket = null;

  var ajax = $http.get('/travis_api/get_hotel_ticket/' + $stateParams.hotel_ticket_id);
  ajax.success(function(response){
    $scope.hotel_ticket = response.data[0];
  });
  ajax.error(function(response){
    alert('ajax error');
  });

})

.controller('TravisCtrl', function($scope, $http, $ionicLoading) {

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  var lat = 45;
  var long = -73;

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } 
  }

  function showPosition(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude; 
      

      /////////////////////////////////////////////////////////////
      // This is what happens when Wenqi doesn't sleep.

      $scope.map = { center: { latitude: lat, longitude: long }, zoom: 15 };

      $scope.food_places = [];
      $scope.tourism_places = [];
      $scope.weather_info = [];

      var ajax = $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long);
      ajax.success(function(response){
        $scope.weather_info = response;
        console.log($scope.weather_info);
      });
      ajax.error(function(response){
        alert('ajax error');
      });

      var auth = {
          consumerKey : "-SJUkriYSjh5NJpzKDD-Gw",
          consumerSecret : "pbo3DtegdG-LL7fcHFeUWBr9VT4",
          accessToken : "1_v57ngeu3s3i7RAb3n4pMEqyts_uuOJ",
          accessTokenSecret : "ruTgSK90jImnvL_Trx9Fej4rsU0",
          serviceProvider : {
              signatureMethod : "HMAC-SHA1"
          }
      };

      var terms = 'food';
      // var near = 'San+Francisco';
      var bounds = (lat + 0.1) + ',' + (long + 0.1) + '|' + (lat - 0.1) + ',' + (long - 0.1);

      var accessor = {
          consumerSecret : auth.consumerSecret,
          tokenSecret : auth.accessTokenSecret
      };
      parameters = [];
      parameters.push(['term', terms]);
      // parameters.push(['location', near]);
      parameters.push(['bounds', bounds]);
      parameters.push(['limit', 3]);
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

      var message = {
          'action' : 'http://api.yelp.com/v2/search',
          'method' : 'GET',
          'parameters' : parameters
      };

      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);

      var parameterMap = OAuth.getParameterMap(message.parameters);
      console.log(parameterMap);

      $.ajax({
          'url' : message.action,
          'data' : parameterMap,
          'dataType' : 'jsonp',
          'jsonpCallback' : 'cb',
          'success' : function(data, textStats, XMLHttpRequest) {
              $scope.food_places = data["businesses"];

              var auth = {
                  consumerKey : "-SJUkriYSjh5NJpzKDD-Gw",
                  consumerSecret : "pbo3DtegdG-LL7fcHFeUWBr9VT4",
                  accessToken : "1_v57ngeu3s3i7RAb3n4pMEqyts_uuOJ",
                  accessTokenSecret : "ruTgSK90jImnvL_Trx9Fej4rsU0",
                  serviceProvider : {
                      signatureMethod : "HMAC-SHA1"
                  }
              };

              var terms = 'tourist';
              // var near = 'San+Francisco';
              var bounds = (lat + 0.1) + ',' + (long + 0.1) + '|' + (lat - 0.1) + ',' + (long - 0.1);

              var accessor = {
                  consumerSecret : auth.consumerSecret,
                  tokenSecret : auth.accessTokenSecret
              };
              parameters = [];
              parameters.push(['term', terms]);
              // parameters.push(['location', near]);
              parameters.push(['bounds', bounds]);
              parameters.push(['limit', 3]);
              parameters.push(['callback', 'cb']);
              parameters.push(['oauth_consumer_key', auth.consumerKey]);
              parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
              parameters.push(['oauth_token', auth.accessToken]);
              parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

              var message = {
                  'action' : 'http://api.yelp.com/v2/search',
                  'method' : 'GET',
                  'parameters' : parameters
              };

              OAuth.setTimestampAndNonce(message);
              OAuth.SignatureMethod.sign(message, accessor);

              var parameterMap = OAuth.getParameterMap(message.parameters);
              console.log(parameterMap);

              $.ajax({
                  'url' : message.action,
                  'data' : parameterMap,
                  'dataType' : 'jsonp',
                  'jsonpCallback' : 'cb',
                  'success' : function(data, textStats, XMLHttpRequest) {
                      $scope.tourism_places = data["businesses"];
                      $scope.$apply();

                      // FIN
                      $scope.hide = function(){
                        $ionicLoading.hide();
                      };
                  }
              });

          }
      });

      /////////////////////////////////////////////////////////////


      $scope.$apply();
  }

  getLocation();

  // $scope.map = { center: { latitude: lat, longitude: long }, zoom: 8 };

  // $scope.food_places = [];
  // $scope.tourism_places = [];
  // $scope.weather_info = [];

  // var ajax = $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long);
  // ajax.success(function(response){
  //   $scope.weather_info = response;
  //   console.log($scope.weather_info);
  // });
  // ajax.error(function(response){
  //   alert('ajax error');
  // });

  // var auth = {
  //     consumerKey : "-SJUkriYSjh5NJpzKDD-Gw",
  //     consumerSecret : "pbo3DtegdG-LL7fcHFeUWBr9VT4",
  //     accessToken : "1_v57ngeu3s3i7RAb3n4pMEqyts_uuOJ",
  //     accessTokenSecret : "ruTgSK90jImnvL_Trx9Fej4rsU0",
  //     serviceProvider : {
  //         signatureMethod : "HMAC-SHA1"
  //     }
  // };

  // var terms = 'food';
  // // var near = 'San+Francisco';
  // var bounds = (lat + 0.1) + ',' + (long + 0.1) + '|' + (lat - 0.1) + ',' + (long - 0.1);

  // var accessor = {
  //     consumerSecret : auth.consumerSecret,
  //     tokenSecret : auth.accessTokenSecret
  // };
  // parameters = [];
  // parameters.push(['term', terms]);
  // // parameters.push(['location', near]);
  // parameters.push(['bounds', bounds]);
  // parameters.push(['limit', 3]);
  // parameters.push(['callback', 'cb']);
  // parameters.push(['oauth_consumer_key', auth.consumerKey]);
  // parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  // parameters.push(['oauth_token', auth.accessToken]);
  // parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  // var message = {
  //     'action' : 'http://api.yelp.com/v2/search',
  //     'method' : 'GET',
  //     'parameters' : parameters
  // };

  // OAuth.setTimestampAndNonce(message);
  // OAuth.SignatureMethod.sign(message, accessor);

  // var parameterMap = OAuth.getParameterMap(message.parameters);
  // console.log(parameterMap);

  // $.ajax({
  //     'url' : message.action,
  //     'data' : parameterMap,
  //     'dataType' : 'jsonp',
  //     'jsonpCallback' : 'cb',
  //     'success' : function(data, textStats, XMLHttpRequest) {
  //         $scope.food_places = data["businesses"];

  //         var auth = {
  //             consumerKey : "-SJUkriYSjh5NJpzKDD-Gw",
  //             consumerSecret : "pbo3DtegdG-LL7fcHFeUWBr9VT4",
  //             accessToken : "1_v57ngeu3s3i7RAb3n4pMEqyts_uuOJ",
  //             accessTokenSecret : "ruTgSK90jImnvL_Trx9Fej4rsU0",
  //             serviceProvider : {
  //                 signatureMethod : "HMAC-SHA1"
  //             }
  //         };

  //         var terms = 'tourist';
  //         // var near = 'San+Francisco';
  //         var bounds = (lat + 0.1) + ',' + (long + 0.1) + '|' + (lat - 0.1) + ',' + (long - 0.1);

  //         var accessor = {
  //             consumerSecret : auth.consumerSecret,
  //             tokenSecret : auth.accessTokenSecret
  //         };
  //         parameters = [];
  //         parameters.push(['term', terms]);
  //         // parameters.push(['location', near]);
  //         parameters.push(['bounds', bounds]);
  //         parameters.push(['limit', 3]);
  //         parameters.push(['callback', 'cb']);
  //         parameters.push(['oauth_consumer_key', auth.consumerKey]);
  //         parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  //         parameters.push(['oauth_token', auth.accessToken]);
  //         parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  //         var message = {
  //             'action' : 'http://api.yelp.com/v2/search',
  //             'method' : 'GET',
  //             'parameters' : parameters
  //         };

  //         OAuth.setTimestampAndNonce(message);
  //         OAuth.SignatureMethod.sign(message, accessor);

  //         var parameterMap = OAuth.getParameterMap(message.parameters);
  //         console.log(parameterMap);

  //         $.ajax({
  //             'url' : message.action,
  //             'data' : parameterMap,
  //             'dataType' : 'jsonp',
  //             'jsonpCallback' : 'cb',
  //             'success' : function(data, textStats, XMLHttpRequest) {
  //                 $scope.tourism_places = data["businesses"];
  //                 $scope.$apply();
  //             }
  //         });

  //     }
  // });

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

.controller('ContactCtrl', function($scope, $http, $stateParams) {
  var ajax = $http.get('/travis_api/get_contact/' + $stateParams.contactId);
  ajax.success(function(response){
    $scope.contact = response.data[0];
  });
  ajax.error(function(response){
    alert('ajax error');
  });

  $scope.callnumber = function(number) {
    window.plugins.CallNumber.callNumber(onSuccess, onError, number);
  }
  function onSuccess()
  {
    //alert('onSuccess');
  }
  function onError()
  {
    //alert('onError');
  }
})

.controller('EventCtrl', function($scope, $http, $stateParams) {
    //$scope.event = null;
    var ajax = $http.get('/travis_api/get_event/' + $stateParams.eventId);
    ajax.success(function(response){
      $scope.event = response.data[0];
    });
    ajax.error(function(response){
      alert('ajax error');
    });

    $scope.getImage = function($el) {
      return "img/" + $el + ".png";
    };

})

.controller('NewEventCtrl', function($scope) {
    
})

.controller('EventsCtrl', function($scope, $http) {

  // // Form data for the login modal
  // $scope.eventData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/new_event.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeNewEvent = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.newEvent = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.createEvent = function() {
  //   console.log('Creating event', $scope.eventData);
  //   $timeout(function() {
  //     $scope.closeNewEvent();
  //   }, 1000);
  // };

  ////////////////////////////////////////////////////////////////

  $scope.events = [];
  $scope.firstevent = null;
  var ajax = $http.get('/travis_api/get_events');
  ajax.success(function(response){
    $scope.events = response.data;
    $scope.firstevent = response.data[0];
  });
  ajax.error(function(response){
    alert('ajax error');
  });

  // $scope.getFirstImage = function() {
  //   if ($scope.events !== null && $scope.events.length > 0) {
  //     return "img/" + $scope.events[0].event_category + ".png";
  //   } else {
  //     return null;
  //   }
  // };
  //
  // $scope.getFirstTitle = function() {
  //   if ($scope.events !== null && $scope.events.length > 0) {
  //     return $scope.events[0].event_title;
  //   } else {
  //     return null;
  //   }
  // };
  //
  // $scope.getFirstId = function() {
  //   if ($scope.events !== null && $scope.events.length > 0) {
  //     return $scope.events[0].event_id;
  //   } else {
  //     return null;
  //   }
  // };
  //
  // $scope.getFirstDateTime = function() {
  //   if ($scope.events !== null && $scope.events.length > 0) {
  //     return $scope.events[0].event_start_datetime;
  //   } else {
  //     return null;
  //   }
  // };
  //
  // $scope.animateElementIn = function($el) {
  //   $el.removeClass('hidden');
  //   $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
  // };
  //
  // $scope.animateElementOut = function($el) {
  //   $el.addClass('hidden');
  //   $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
  // };
  //
  $scope.getImage = function($el) {
    return "img/" + $el + ".png";
  };

});
