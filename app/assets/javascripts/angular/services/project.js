var project = bugtracker.factory('Project', ['$resource', function($resource) {
    function Project() {
        this.service = $resource('/api/projects/:projectId.json', {projectId: '@id'}, {
            update: {method: 'PATCH', url: '/api/projects/:projectId'}
        });
    }

    Project.prototype.all = function(success, error) {
        return this.service.query(success, error);
    };

    Project.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    Project.prototype.findById = function(id, success, error) {
        return this.service.get({projectId: id}, success, error);
    };

    Project.prototype.create = function(params, success, error) {
        return this.service.save(params, success, error);
    };

    Project.prototype.update = function(id, params, success, error) {
        return this.service.update({projectId: id}, params, success, error);
    };

    return new Project();
}]);