bugtracker.controller('HomeCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

    $scope.clickGetStarted = function() {
        if ($rootScope.currentUser) {
            $state.transitionTo('projects.index');
        }
        else {
            $state.transitionTo('users.login');
        }
    }
}]);