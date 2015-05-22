/*/     MAIN
 *  This is the main entry point to the application. All one time configuration
 *  should be done here. The main function (run) also resides within this file.
/*/


window.Bugtracker = window.Bugtracker || {};
Bugtracker.Config = Bugtracker.Config || {};


/*/     Routes Config
 *  Map route names to data required to create them
/*/
Bugtracker.Config.resolve = {
    user: {
        findById: function(User, $q, $stateParams) {
            var deferred = $q.defer();
            User.findById($stateParams.userId, function(successData) {
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        logout: function(User, $q, $rootScope) {
            var deferred = $q.defer();
            User.logout(function(successData) {
                $rootScope.currentUser = undefined;
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        confirmEmail: function(User, $q, $stateParams) {
            var deferred = $q.defer();
            User.confirmEmail($stateParams.confirmToken, function(successData) {
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
                deferred.resolve(successData.permissions);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        findById: function(Permission, $q, $stateParams) {
            var deferred = $q.defer();
            Permission.findById($stateParams.permissionId, $stateParams.projectId, function(successData) {
                deferred.resolve(successData.permission);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
};

Bugtracker.Config.routes = {
    //  Home Routes  //
    'home': {
        url: '',
        templateUrl: '/assets/layouts/home.html',
        controller: 'HomeCtrl'
    },
    //  Error Routes  //
    'error': {
        abstract: true,
        templateUrl: '/assets/layouts/errors.html',
        controller: 'ErrorCtrl'
    },
    'error.400': {
        url: '/400',
        templateUrl: '/assets/errors/400.html',
        controller: 'Error400Ctrl'
    },
    'error.401': {
        url: '/401',
        templateUrl: '/assets/errors/401.html',
        controller: 'Error401Ctrl'
    },
    'error.403': {
        url: '/403',
        templateUrl: '/assets/errors/403.html',
        controller: 'Error403Ctrl'
    },
    'error.404': {
        url: '/404',
        templateUrl: '/assets/errors/404.html',
        controller: 'Error404Ctrl'
    },
    //  User Routes  //
    'users': {
        abstract: true,
        url: '/users',
        templateUrl: '/assets/layouts/users.html',
        controller: 'UserCtrl',
        data: {
            breadcrumb: 'Users'
        }
    },
    'users.single': {
        abstract: true,
        url: '/{userId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            user: Bugtracker.Config.resolve.user.findById
        },
        data: {
            breadcrumb: '{{ userId }}',
            breadcrumbRoute: 'user.single.show'
        }
    },
    'users.single.show': {
        url: '',
        templateUrl: '/assets/users/show.html',
        controller: 'UserShowCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    'users.new': {
        url: '/signup',
        templateUrl: '/assets/users/new.html',
        controller: 'UserNewCtrl'
    },
    'users.login': {
        url: '/login',
        templateUrl: '/assets/users/login.html',
        controller: 'UserLoginCtrl'
    },
    'users.logout': {
        url: '/logout',
        controller: 'UserLogoutCtrl',
        resolve: {
            user: Bugtracker.Config.resolve.user.logout
        }
    },
    'users.confirm_email' : {
        url: '/confirm_email/:confirmToken',
        controller: 'UserConfirmEmailCtrl',
        resolve: {
            user: Bugtracker.Config.resolve.user.confirmEmail
        }
    },
    //  Project Routes  //
    'projects': {
        abstract: true,
        url: '/projects',
        templateUrl: '/assets/layouts/projects.html',
        controller: 'ProjectCtrl',
        data: {
            breadcrumb: 'Projects',
            breadcrumbRoute: 'projects.index'
        }
    },
    'projects.single': {
        abstract: true,
        url: '/{projectId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            project: Bugtracker.Config.resolve.project.findById,
            bugs: Bugtracker.Config.resolve.bug.all,
            permissions: Bugtracker.Config.resolve.permission.all
        },
        data: {
            breadcrumb: '{{ projectId }}',
            breadcrumbRoute: 'projects.single.show'
        }
    },
    'projects.index': {
        url: '',
        templateUrl: '/assets/projects/index.html',
        controller: 'ProjectIndexCtrl',
        resolve: {
            projects: Bugtracker.Config.resolve.project.all
        },
        data: {
            breadcrumb: undefined
        }
    },
    'projects.single.show': {
        url: '',
        templateUrl: '/assets/projects/show.html',
        controller: 'ProjectShowCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    'projects.new': {
        url: '/new',
        templateUrl: '/assets/projects/new.html',
        controller: 'ProjectNewCtrl',
        data: {
            breadcrumb: 'New'
        }
    },
    'projects.single.edit': {
        url: '/edit',
        templateUrl: '/assets/projects/edit.html',
        controller: 'ProjectEditCtrl',
        data: {
            breadcrumb: 'Edit'
        }
    },
    //  Bug Routes  //
    'projects.single.bugs': {
        abstract: true,
        url: '/bugs',
        templateUrl: '/assets/layouts/bugs.html',
        controller: 'BugCtrl',
        data: {
            breadcrumb: 'Bugs',
            breadcrumbRoute: 'projects.single.bugs.index'
        }
    },
    'projects.single.bugs.single': {
        abstract: true,
        url: '/{bugId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            bug: Bugtracker.Config.resolve.bug.findById
        },
        data: {
            breadcrumb: '{{ bugId }}',
            breadcrumbRoute: 'projects.single.bugs.single.show'
        }
    },
    'projects.single.bugs.index': {
        url: '',
        templateUrl: '/assets/bugs/index.html',
        controller: 'BugIndexCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    'projects.single.bugs.single.show': {
        url: '',
        templateUrl: '/assets/bugs/show.html',
        controller: 'BugShowCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    'projects.single.bugs.new': {
        url: '/new',
        templateUrl: '/assets/bugs/new.html',
        controller: 'BugNewCtrl',
        data: {
            breadcrumb: 'New'
        }
    },
    'projects.single.bugs.single.edit': {
        url: '/edit',
        templateUrl: '/assets/bugs/edit.html',
        controller: 'BugEditCtrl',
        data: {
            breadcrumb: 'Edit'
        }
    },
    'projects.single.bugs.feed': {
        url: '/feed',
        templateUrl: '/assets/bugs/feed.html',
        controller: 'BugFeedCtrl',
        data: {
            breadcrumb: 'Feed'
        }
    }
};

/*/     Flash Alerts Config
 *  Map flashProvider class name object keys to HTML class names
/*/
Bugtracker.Config.flashAlerts = {
    successClassnames: 'alert-success',
    infoClassnames: 'alert-info',
    warnClassnames: 'alert-warning',
    errorClassnames: 'alert-danger'
};


/*/     Bugtracker Module
 *  Define the bugtracker module. This is the core object of the applicaiton.
/*/
bugtracker = angular.module('bugtracker', ['ngResource', 'ui.router', 'ui.select', 'ngSanitize', 'angular-flash.service', 'angular-flash.flash-alert-directive', 'ngProgressLite']);

/*/     Config
 *  Perform required setup for various providers:
 *  - configure routes
 *  - set csrf-token
 *  - configure flash alerts
/*/
bugtracker.config([
    '$stateProvider',
    '$httpProvider',
    '$locationProvider',
    'flashProvider',
    'ngProgressLiteProvider',

    function($stateProvider, $httpProvider, $locationProvider, flashProvider, ngProgressLiteProvider) {
    // Set the CSRF token on the $httpProvider object by parsing the DOM to find
    // the CSRF token set by Rails. It's found in the content attribute of a
    // meta tag with the name "csrf-token".
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = $("meta[name=\"csrf-token\"]").attr("content");

    // Set flash HTML classnames on the flashProvider object. Class names are
    // mapped in the Bugtracker.Config.flashAlerts object.
    $.each(Bugtracker.Config.flashAlerts, function(type, className) {
        flashProvider[type].push(className);
    });

    // Set the routes on the $stateProvider object. Routes are defined within
    // the Bugtracker.Config.routes object.
    $.each(Bugtracker.Config.routes, function(name, options) {
        $stateProvider.state(name, options);
    });
}]);


/*/     Run
 *  Perform required setup once application begins:
 *  - set session if one is in progress
 *  - define errors
 *  - setup loading indicator
/*/
bugtracker.run([
    '$rootScope',
    '$state',
    'ngProgressLite',
    'User',

    function($rootScope, $state, ngProgressLite, User) {
    // Set the user on the $rootScope object if a session is in progress.
    User.currentUser(function(successData) {
        if (successData.user) {
            $rootScope.currentUser = successData.user;
        }
    }, function(errorData) {});

    // Setup the loading indicator:
    // - state change begins    ->  start the loading indicator
    // - state change completes ->  stop the loading indicator
    // - state change fails     ->  stop the loading indictor and display error
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        ngProgressLite.start();
    });

    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
        ngProgressLite.done();
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
        switch (error.status) {
            case 401:
                $state.transitionTo('users.login');
            default:
                $state.transitionTo('error.' + error.status);
        }

        ngProgressLite.done();
    });
}]);