bugtracker.controller('BugFeedCtrl', ['$scope', '$stateParams', 'bugs', function($scope, $stateParams, bugs) {
    $scope.bugs = bugs;
}]);