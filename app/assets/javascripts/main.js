bugtracker = angular.module('bugtracker', ['ngResource', 'ui.router', 'ngProgressLite']);

bugtracker.config(['$stateProvider', '$httpProvider', '$locationProvider', 'ngProgressLiteProvider', function($stateProvider, $httpProvider, $locationProvider, ngProgressLiteProvider) {
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = $("meta[name=\"csrf-token\"]").attr("content");


    $stateProvider.state('home', {
        url: '',
        templateUrl: '/assets/layouts/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('users', {
        abstract: true,
        url: '/users',
        templateUrl: '/assets/layouts/users.html',
        controller: 'UserCtrl'
    });
    $stateProvider.state('users.new', {
        url: '/signup',
        templateUrl: '/assets/users/new.html',
        controller: 'UserNewCtrl'
    });
    $stateProvider.state('users.login', {
        url: '/login',
        templateUrl: '/assets/users/login.html',
        controller: 'UserLoginCtrl'
    });
    $stateProvider.state('users.logout', {
        url: '/logout',
        controller: 'UserLogoutCtrl',
        resolve: {
            user: resolve.user.logout
        }
    });

    $stateProvider.state('projects', {
        abstract: true,
        url: '/projects',
        templateUrl: '/assets/layouts/projects.html',
        controller: 'ProjectCtrl',
        data: {
            breadcrumb: 'Projects',
            breadcrumbRoute: 'projects.index'
        }
    });
    $stateProvider.state('projects.single', {
        abstract: true,
        url: '/{projectId:[0-9]{1,8}}',
        template: '<ui-view />',
        resolve: {
            project: resolve.project.findById,
            bugs: resolve.bug.all,
            permissions: resolve.permission.all
        },
        data: {
            breadcrumb: '{{ projectId }}',
            breadcrumbRoute: 'projects.single.show'
        }
    });
    $stateProvider.state('projects.index', {
        url: '',
        templateUrl: '/assets/projects/index.html',
        controller: 'ProjectIndexCtrl',
        resolve: {
            projects: resolve.project.all
        },
        data: {
            breadcrumb: undefined
        }
    });
    $stateProvider.state('projects.single.show', {
        url: '',
        templateUrl: '/assets/projects/show.html',
        controller: 'ProjectShowCtrl',
        data: {
            breadcrumb: undefined
        }
    });
    $stateProvider.state('projects.new', {
        url: '/new',
        templateUrl: '/assets/projects/new.html',
        controller: 'ProjectNewCtrl',
        data: {
            breadcrumb: 'New'
        }
    });
    $stateProvider.state('projects.single.edit', {
        url: '/edit',
        templateUrl: '/assets/projects/edit.html',
        controller: 'ProjectEditCtrl',
        data: {
            breadcrumb: 'Edit'
        }
    });

    $stateProvider.state('projects.single.bugs', {
        abstract: true,
        url: '/bugs',
        templateUrl: '/assets/layouts/bugs.html',
        controller: 'BugCtrl',
        data: {
            breadcrumb: 'Bugs',
            breadcrumbRoute: 'projects.single.bugs.index'
        }
    });
    $stateProvider.state('projects.single.bugs.single', {
        abstract: true,
        url: '/{bugId:[0-9]{1,8}}',
        template: '<ui-view />',
        resolve: {
            bug: resolve.bug.findById
        },
        data: {
            breadcrumb: '{{ bugId }}',
            breadcrumbRoute: 'projects.single.bugs.single.show'
        },
    });
    $stateProvider.state('projects.single.bugs.index', {
        url: '',
        templateUrl: '/assets/bugs/index.html',
        controller: 'BugIndexCtrl',
        data: {
            breadcrumb: undefined
        }
    });
    $stateProvider.state('projects.single.bugs.single.show', {
        url: '',
        templateUrl: '/assets/bugs/show.html',
        controller: 'BugShowCtrl',
        data: {
            breadcrumb: undefined
        }
    });
    $stateProvider.state('projects.single.bugs.new', {
        url: '/new',
        templateUrl: '/assets/bugs/new.html',
        controller: 'BugNewCtrl',
        data: {
            breadcrumb: 'New'
        }
    });
    $stateProvider.state('projects.single.bugs.single.edit', {
        url: '/edit',
        templateUrl: '/assets/bugs/edit.html',
        controller: 'BugEditCtrl',
        data: {
            breadcrumb: 'Edit'
        }
    });
    $stateProvider.state('projects.single.bugs.feed', {
        url: '/feed',
        templateUrl: '/assets/bugs/feed.html',
        controller: 'BugFeedCtrl',
        data: {
            breadcrumb: 'Feed'
        }
    });

    $stateProvider.state('error', {
        abstract: true,
        templateUrl: '/assets/layouts/errors.html',
        controller: 'ErrorCtrl'
    });
    $stateProvider.state('error.401', {
        url: '/401',
        templateUrl: '/assets/errors/401.html',
        controller: 'Error401Ctrl'
    });
    $stateProvider.state('error.404', {
        url: '/404',
        templateUrl: '/assets/errors/404.html',
        controller: 'Error404Ctrl'
    });
}]);

bugtracker.run(['$rootScope', '$state', 'ngProgressLite', 'User', function($rootScope, $state, ngProgressLite, User) {
    //set the current user if a session is still in progress
    User.currentUser(function(successData) {
        if (successData.user) {
            $rootScope.currentUser = successData.user;
        }
    }, function(errorData) {});

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        ngProgressLite.start();
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgressLite.done();
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error.status === 401) {
            $state.transitionTo('users.login');
        }
        else {
            $state.transitionTo('error.' + error.status);
        }
        
        ngProgressLite.done();
    });
}]);

var resolve = {
    user: {
        logout: function(User, $q, $rootScope) {
            var deferred = $q.defer();
            User.logout(function(successData) {
                $rootScope.currentUser = undefined;
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
    project: {
        all: function(Project, $q) {
            var deferred = $q.defer();
            Project.all(function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        findById: function(Project, $q, $stateParams) {
            var deferred = $q.defer();
            Project.findById($stateParams.projectId, function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
    bug: {
        all: function(Bug, $q, $stateParams) {
            var deferred = $q.defer();
            Bug.all($stateParams.projectId, function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        findById: function(Bug, $q, $stateParams) {
            var deferred = $q.defer();
            Bug.findById($stateParams.bugId, $stateParams.projectId, function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
    permission: {
        all: function(Permission, $q, $stateParams) {
            var deferred = $q.defer();
            Permission.all($stateParams.projectId, function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        findById: function(Permission, $q, $stateParams) {
            var deferred = $q.defer();
            Permission.findById($stateParams.permissionId, $stateParams.projectId, function(successData) {
                deferred.resolve(successData); 
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
};