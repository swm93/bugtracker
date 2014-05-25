bugtracker.controller('ProjectEditCtrl', ['$scope', '$stateParams', 'project', 'permissions', 'PermissionType', function($scope, $stateParams, project, permissions, PermissionType) {
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
}]);