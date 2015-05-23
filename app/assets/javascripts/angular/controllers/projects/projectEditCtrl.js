bugtracker.controller('ProjectEditCtrl', ['$scope', '$stateParams', 'project', 'permissions', 'Project', 'PermissionType', '$http', function($scope, $stateParams, project, permissions, Project, PermissionType, $http) {
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

    $scope.uploadImage = function(files) {
        var formData = new FormData();
        formData.append("project[image]", files[0]);

        $http.put("/api/projects/" + $scope.project.id, formData, {
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function(data) {
            $scope.project.image_content_type = data.image_content_type;
            $scope.project.image_file_name = data.image_file_name;
            $scope.project.image_file_size = data.image_file_size;
            $scope.project.image_updated_at = data.image_updated_at;
            $scope.project.image_url = data.image_url;
        });
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
            Project.update($scope.project.id, modifiedProperties, undefined, function() {
                $scope.project = prevVal;
            });
        }
    }, true);
}]);