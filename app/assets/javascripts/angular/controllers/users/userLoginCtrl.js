bugtracker.controller('UserLoginCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
    $scope.credentials = {
        email: '',
        password: '',
        rememberMe: false
    };

    $scope.loginAttempt = function() {
        User.loginAttempt($scope.credentials.email, $scope.credentials.password, $scope.credentials.rememberMe, function(successData) {
            User.currentUser(function(successData) {
                $rootScope.currentUser = successData;
                $state.transitionTo('projects.index');
            }, function(errorData) {
                $state.transitionTo('error.401');
            });
        }, function(errorData) {
            $state.transitionTo('error.401');
        });
    };
}]);