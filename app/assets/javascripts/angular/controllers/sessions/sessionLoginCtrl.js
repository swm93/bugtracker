bugtracker.controller('SessionLoginCtrl', ['$rootScope', '$scope', '$state', 'flash', 'Session', function($rootScope, $scope, $state, flash, Session) {
    $scope.credentials = {
        email: '',
        password: '',
        rememberMe: false
    };

    $scope.loginAttempt = function() {
        Session.loginAttempt($scope.credentials.email, $scope.credentials.password, $scope.credentials.rememberMe, function(successData) {
            $rootScope.currentUser = successData.user;

            $state.transitionTo('app.projects.index');
        }, function(errorData) {
            flash.error = errorData.data.errors;
        });
    };
}]);