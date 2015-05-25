bugtracker.controller('HomeCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

    $scope.clickGetStarted = function() {
        var stateName = $rootScope.currentUser ? 'app.projects.index' : 'session.login';

        return $state.transitionTo(stateName);
    };
}]);