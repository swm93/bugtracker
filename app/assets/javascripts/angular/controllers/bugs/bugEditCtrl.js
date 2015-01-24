bugtracker.controller('BugEditCtrl', ['$scope', '$stateParams', 'bug', function($scope, $stateParams, bug) {
    $scope.bug = bug;
}]);