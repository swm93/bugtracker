bugtracker.controller('BugNewCtrl', ['$scope', '$state', '$stateParams', 'Bug', 'permissions', function($scope, $state, $stateParams, Bug, permissions) {
    $scope.bug = {};
    $scope.permission = {};
    $scope.permissions = permissions;

    $scope.createBug = function() {
        if ($scope.permission.selected) {
            $scope.bug.assignee_id = $scope.permission.selected.user.id;
        }

        Bug.create($stateParams.bugId, $stateParams.projectId, $scope.bug, function() {
            $state.transitionTo('app.projects.single.bugs.index', {projectId: $stateParams.projectId});
        }, function() {
            //TODO: flash error message here
        });
    };

    $scope.$watch('permission', function(val, prevVal) {
        console.log($scope.permission);
    }, true);
}]);