bugtracker.controller('UserLoginCtrl', ['$rootScope', '$scope', '$state', 'flash', 'User', function($rootScope, $scope, $state, flash, User) {
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
            flash.error = "The email or password entered was incorrect, please try again.";
        });
    };
}]);