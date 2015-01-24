bugtracker.factory('User', ['$resource', function($resource) {
    function User() {
        this.service = $resource('/api/users/:userId', {userId: '@id'}, {
            current_user: {method: 'GET', url: '/api/users/current_user'},
            logout: {method: 'GET', url: '/api/users/logout'},
            login_attempt: {method: 'POST', url: '/api/users/login_attempt'}
        });
    };

    User.prototype.all = function(success, error) {
        return this.service.query(success, error);
    };

    User.prototype.find = function(params, success, error) {
        return this.service.get(params, success, error);
    };

    User.prototype.findById = function(id, success, error) {
        return this.service.get({userId: id}, success, error);
    };

    User.prototype.currentUser = function(success, error) {
        return this.service.current_user(success, error);
    };

    User.prototype.loginAttempt = function(email, password, rememberMe, success, error) {
        return this.service.login_attempt({email: email, password: password, remember_me: rememberMe}, success, error);
    };

    User.prototype.logout = function(success, error) {
        return this.service.logout(success, error);
    };

    return new User;
}]);