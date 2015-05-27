bugtracker.controller('ProjectNewCtrl', ['$scope', '$state', '$http', 'Project', function($scope, $state, $http, Project) {
    $scope.project = {};

    $scope.createProject = function() {
        Project.create(
            $scope.project,
            function(successData) {
                Logger.info("successfully created project " + $scope.project.name);

                $state.transitionTo('app.projects.single.show', {projectId: successData.id});
            },
            function(errorData) {
                Logger.error("failed to create project " + $scope.project.name);
            }
        );
    };
}]);