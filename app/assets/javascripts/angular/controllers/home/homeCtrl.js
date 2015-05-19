bugtracker.controller('HomeCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

    $scope.clickGetStarted = function() {
        var stateName = $rootScope.currentUser ? 'projects.index' : 'users.login';

        return $state.transitionTo(stateName);
    }
}]);