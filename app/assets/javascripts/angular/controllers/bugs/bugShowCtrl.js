bugtracker.controller('BugShowCtrl', ['$scope', '$stateParams', 'bug', function($scope, $stateParams, bug) {
    $scope.bug = bug;
}]);