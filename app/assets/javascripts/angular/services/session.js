bugtracker.factory('Session', ['$resource', function($resource) {
    function Session() {
        this.service = $resource('/api/users/:userId', {userId: '@id'}, {
            confirm_email: {method: 'GET', url: '/api/users/confirm_email'},
            current_user: {method: 'GET', url: '/api/users/current_user'},
            logout: {method: 'GET', url: '/api/users/logout'},
            login_attempt: {method: 'POST', url: '/api/users/login_attempt'},
        });
    }

    Session.prototype.confirmEmail = function(confirmToken, success, error) {
        return this.service.confirm_email({confirm_token: confirmToken}, success, error);
    };

    Session.prototype.currentUser = function(success, error) {
        return this.service.current_user(success, error);
    };

    Session.prototype.loginAttempt = function(email, password, rememberMe, success, error) {
        return this.service.login_attempt({email: email, password: password, remember_me: rememberMe}, success, error);
    };

    Session.prototype.logout = function(success, error) {
        return this.service.logout(success, error);
    };

    return new Session();
}]);