bugtracker.controller('BugNewCtrl', ['$scope', '$state', '$stateParams', 'Bug', function($scope, $state, $stateParams, Bug) {
    $scope.bug;

    $scope.createBug = function() {
        Bug.create($stateParams.bugId, $stateParams.projectId, $scope.bug, function() {
            $state.transitionTo('projects.single.bugs.index', {projectId: $stateParams.projectId});
        }, function() {
            //TODO: flash error message here
        });
    };
}]);