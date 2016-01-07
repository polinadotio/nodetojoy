//app redirect users to dashboard by default when they go to '/'
//if api/events/events fails to authenticate, redirects to sign up in the login page

angular.module('httpInterceptorFactory', [])
.factory('httpInterceptor', ['$log', function($log) {  
    $log.debug('$log is here to show you that this is a regular factory with injection');

    var httpInterceptor = {
    };

    return httpInterceptor;
}]);

.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('httpInterceptor');
}]);