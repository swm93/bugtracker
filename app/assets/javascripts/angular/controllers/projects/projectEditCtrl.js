bugtracker.controller('ProjectEditCtrl', ['$scope', '$stateParams', 'project', 'permissions', 'Project', 'PermissionType', function($scope, $stateParams, project, permissions, Project, PermissionType) {
    var modifiableProperties = ['name', 'description', 'public'];
    $scope.project = project;
    $scope.permissions = permissions;
    $scope.permissionTypes = PermissionType.all();
    $scope.permission = PermissionType.findById(1);
    

    $scope.setPublic = function(val) {
        $scope.project.public = val;
    };
    $scope.getPublic = function() {
        return $scope.project.public ? "public" : "private";
    };

    $scope.setPermission = function(val) {
        $scope.permission = val;
    };

    $scope.$watch('project', function(val, prevVal) {
        var modifiedProperties;
        $.each(modifiableProperties, function(i, prop) {
            if (val[prop] !== prevVal[prop]) {
                if (!modifiedProperties) {
                    modifiedProperties = {};
                }

                modifiedProperties[prop] = val[prop];
            }
        });
        if (modifiedProperties) {
            Project.update($scope.project.id, modifiedProperties);
        }
    }, true);
}]);