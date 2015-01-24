bugtracker.factory('Permission', ['$resource', function($resource) {
    function Permission() {
        this.service = $resource('/api/projects/:projectId/permissions/:permissionId.json', {projectId: '@id', permissionId: '@id'}, {
            query: { method: 'GET', isArray: false }
        });
    };

    Permission.prototype.all = function(projectId, success, error) {
        return this.service.query({projectId: projectId}, success, error);
    };

    Permission.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    Permission.prototype.findById = function(permissionId, projectId, success, error) {
        return this.service.get({permissionId: permissionId, projectId: projectId}, success, error);
    };

    return new Permission;
}]);