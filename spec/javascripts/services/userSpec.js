describe('User', function() {
    var user;
    var scope;
    var http;

    var fixture = [
        {
            id: 1,
            name: "Scott Mielcarski"
        },
        {
            id: 2,
            name: "Bob Law"
        }
    ];

    beforeEach(module('bugtracker'));
    beforeEach(inject(function(User, $rootScope, $httpBackend) {
        user = User;
        scope = $rootScope;
        http = $httpBackend;
    }));
    beforeEach(function() {
        http.whenGET('/assets/layouts/home.html').respond(200, '');
        http.whenGET('/api/users/current_user').respond(200, fixture[0]);
    });

    afterEach(function() {
        http.flush();
    });

    it('gets all users', function() {
        var usersExpected = fixture;

        http.whenGET('/api/users').respond(200, usersExpected);

        user.all().$promise.then(function(usersRetrieved) {
            $.each(usersRetrieved, function(i, userRetrieved) {
                var userExpected = usersExpected[i];

                expect(userRetrieved.id).toBe(userExpected.id);
                expect(userRetrieved.name).toBe(userExpected.name);
            });
        });
    });

    it('gets specific user by parameters', function() {
        var userExpected = _.findWhere(fixture, { name: "Bob Law" });

        http.whenGET('/api/users?name=' + userExpected.name.replace(' ', '+')).respond(200, _.findWhere(fixture, { name: userExpected.name }));

        user.find({ name: userExpected.name }).$promise.then(function(userRetrieved) {
            expect(userRetrieved.id).toBe(userExpected.id);
            expect(userRetrieved.name).toBe(userExpected.name);
        });
    });

    it('gets specific user by id', function() {
        var userExpected = _.findWhere(fixture, { id: 2 });

        http.whenGET('/api/users/' + userExpected.id).respond(200, _.findWhere(fixture, { id: userExpected.id }));

        user.findById(userExpected.id).$promise.then(function(userRetrieved) {
            expect(userRetrieved.id).toBe(userExpected.id);
            expect(userRetrieved.name).toBe(userExpected.name);
        });
    });

    it('gets the currently signed in user', function() {
        var userExpected = fixture[0];

        user.currentUser().$promise.then(function(userRetrieved) {
            expect(userRetrieved.id).toBe(userExpected.id);
            expect(userRetrieved.name).toBe(userExpected.name);
        });
    });

    it('logs a user in', function() {

    });

    it('logs a user out', function() {

    });
});