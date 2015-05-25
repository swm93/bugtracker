bugtracker.controller('ProjectNewCtrl', ['$scope', '$state', '$http', 'Project', function($scope, $state, $http, Project) {
    $scope.project = {};

    $scope.createProject = function() {
        Project.create(
            $scope.project,
            function() {
                Logger.info("successfully created project " + $scope.project.name);

                $state.transitionTo('app.projects.single.show', {projectId: $scope.project.id});
            },
            function(errorData) {
                Logger.error("failed to create project " + $scope.project.name);
            }
        );
    };
}]);