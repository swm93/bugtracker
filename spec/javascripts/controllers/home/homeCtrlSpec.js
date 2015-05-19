// Unused for the moment because I could not get the transitionTo tests to work
// correctly.

/*
describe('bugtracker', function() {
    beforeEach(function() {
        module('bugtracker');
    });

    describe('HomeCtrl', function() {
        var scope;
        var state;
        var controller;
        var http;

        beforeEach(inject(function($controller, $rootScope, $state, $httpBackend) {
            scope = $rootScope.$new();
            state = $state;
            controller = $controller('HomeCtrl', {
                $scope: scope
            });
            http = $httpBackend;
        }));

        it('transitions to correct page based on whether or not user is logged in', function() {
            // var then = function() {
            //     debugger
            //     expect(state.current).toBe('users.login')
            // };
            // var p = scope.clickGetStarted()
            //     .then(then)
            //     .catch(then)
            //     .finally(then)
            // debugger
            http.expectGET('/api/users/current_user').respond(200, {
                user: {
                    id: 1,
                    email: "scott_mielcarski@me.com",
                    name: "Scott Mielcarski",
                    created_at: "2014-05-17T03:44:04.596Z",
                    updated_at: "2015-01-16T02:15:47.398Z"
                }
            });
            http.expectGET('/assets/layouts/users.html').respond(200, '');
            http.expectGET('/assets/users/login.html').respond(200, '');
            http.expectGET('/assets/layouts/home.html').respond(200, '');
            // expect(scope.clickGetStarted).toHaveBeenCalled();
            // scope.clickGetStarted().then(then);
            state.transitionTo('users.login');
            scope.$apply();
            expect(state.current.name).toBe('users.login');
        });
    });
});
*/