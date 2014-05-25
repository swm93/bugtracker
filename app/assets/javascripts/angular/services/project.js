var project = bugtracker.factory('Project', ['$resource', function($resource) {
    function Project() {
        this.service = $resource('/api/projects/:projectId.json', {projectId: '@id'});
    };

    Project.prototype.all = function(success, error) {
        return this.service.query(success, error);
    };

    Project.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    Project.prototype.findById = function(id, success, error) {
        return this.service.get({projectId: id}, success, error);
    };

    return new Project;
}]);