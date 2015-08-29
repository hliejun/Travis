// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.etickets', {
    url: '/etickets',
    views: {
      'menuContent': {
        templateUrl: 'templates/etickets.html',
        controller: 'EticketsCtrl'
      }
    }
  })

  .state('app.flight_ticket', {
    url: '/flight_ticket/:flight_ticket_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/flight_ticket.html',
        controller: 'FlightTicketCtrl'
      }
    }
  })

  .state('app.hotel_ticket', {
    url: '/hotel_ticket/:hotel_ticket_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/hotel_ticket.html',
        controller: 'HotelTicketCtrl'
      }
    }
  })

  .state('app.travis', {
    url: '/travis',
    views: {
      'menuContent': {
        templateUrl: 'templates/travis.html',
        controller: 'TravisCtrl'
      }
    }
  })

  .state('app.browser', {
    url: '/browser',
    views: {
      'menuContent': {
        templateUrl: 'templates/browser.html'
      }
    }
  })

  .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'

          }
      }
    })
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

  .state('app.contact', {
    url: '/contacts/:contactId',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }
    }
  })

  .state('app.event', {
    url: '/events/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/event.html',
        controller: 'EventCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
});
