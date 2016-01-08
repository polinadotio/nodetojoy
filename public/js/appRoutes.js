
angular.module('dibs', [
  'ngAnimate', 
  'ui.bootstrap', 
  'ui.router', 
  'dibs.events',
  'dibs.googlecal',
  'eventsInfoFactory', 
  'userInfo', 
  'userFactory', 
  'loginInfo', 
  'userloginFactory'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //if there is no current user, will redirect to signup
    $urlRouterProvider.otherwise('dashboard');
    $httpProvider.interceptors.push('AttachToken');

    $stateProvider
      .state('signupPage', {
        url: '/signup',
        views: {
          'indexPage': {
            templateUrl: 'views/signup.html',
            controller: 'userSignUp'
          }
        },
        data: {
          authenticate: false
        }
      })
      .state('dashboardPage', {
        url: '/dashboard',
        views: {
          'indexPage': {
            templateUrl: 'views/dashboard.html',
            controller: 'eventsController'
          }
        },
        data: {
          authenticate: true
        }
      })
      .state('dashboardPage.events', {
        url: '/events',
        templateUrl: 'views/eventListEmbedded.html',
        controller: 'eventsController',
        data: {
          authenticate: true
        }
      })
      .state('dashboardPage.eventsChart', {
        url: '/eventsChart',
        templateUrl: 'views/eventChart.html',
        controller: 'eventsController',
        data: {
          authenticate: true
        }
      })
      .state('loginupPage', {
        url: '/login',
        views: {
          'indexPage': {
            templateUrl: 'views/login.html',
            controller: 'userLogin'
          }
        },
        data: {
          authenticate: false
        }
      });
  })

.factory('AttachToken', function($window) {
  return {
    request: function(http) {
      var token = $window.localStorage.getItem('dibsToken');
      if (token) {
        http.headers["x-access-token"] = token;
      }
      http.headers["Allow-Control-Allow-Origin"] = "*";
      return http;
    }
  };
})

.run(function($state, $rootScope, SignUpFactory) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.data.authenticate === true && !SignUpFactory.validToken) {
      $state.go('signupPage');
      event.preventDefault();
    }
  });
});