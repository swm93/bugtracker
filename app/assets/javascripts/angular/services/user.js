bugtracker.factory('User', ['$resource', function($resource) {
    function User() {
        this.service = $resource('/api/users/:userId', {userId: '@id'}, {
            statistics: {method: 'GET', url: '/api/users/statistics'}
        });
    }

    User.prototype.all = function(success, error) {
        return this.service.query(success, error);
    };

    User.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    User.prototype.findById = function(id, success, error) {
        return this.service.get({userId: id}, success, error);
    };

    User.prototype.create = function(params, success, error) {
        return this.service.save(params, success, error);
    };

    User.prototype.statistics = function(success, error) {
        return this.service.statistics(success, error);
    };

    return new User();
}]);