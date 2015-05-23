var bug = bugtracker.factory('Bug', ['$resource', function($resource) {
    function Bug() {
        this.service = $resource('/api/projects/:projectId/bugs/:bugId.json', {projectId: '@id', bugId: '@id'});
    }

    Bug.prototype.all = function(projectId, success, error) {
        return this.service.query({projectId: projectId}, success, error);
    };

    Bug.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    Bug.prototype.findById = function(bugId, projectId, success, error) {
        return this.service.get({bugId: bugId, projectId: projectId}, success, error);
    };

    Bug.prototype.create = function(bugId, projectId, params, success, error) {
        return this.service.save({bugId: bugId, projectId: projectId}, params, success, error);
    };

    return new Bug();
}]);