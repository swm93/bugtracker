bugtracker.controller('UserLoginCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
    $scope.credentials = {
        email: '',
        password: '',
        rememberMe: false
    };

    $scope.loginAttempt = function() {
        User.loginAttempt($scope.credentials.email, $scope.credentials.password, $scope.credentials.rememberMe, function(successData) {
            $rootScope.currentUser = successData.user;

            $state.transitionTo('projects.index');
        }, function(errorData) {
            //TODO: change this to flash error
            $state.transitionTo('error.401');
        });
    };
}]);