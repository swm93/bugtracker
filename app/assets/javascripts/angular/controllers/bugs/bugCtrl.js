bugtracker.controller('BugCtrl', ['$scope', '$stateParams', 'Project', function($scope, $stateParams, Project) {
    $scope.project = Project.findById($stateParams.projectId);
}]);