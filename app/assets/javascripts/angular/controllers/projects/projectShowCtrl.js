bugtracker.controller('ProjectShowCtrl', ['$scope', '$stateParams', 'project', 'bugs', 'permissions', function($scope, $stateParams, project, bugs, permissions) {
    $scope.project = project;
    $scope.bugs = bugs;
    $scope.permissions = permissions;
}]);