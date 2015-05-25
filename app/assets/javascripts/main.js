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
        statistics: function(User, $q) {
            var deferred = $q.defer();
            User.statistics(function(successData) {
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        }
    },
    session: {
        logout: function(Session, $q, $rootScope) {
            var deferred = $q.defer();
            Session.logout(function(successData) {
                $rootScope.currentUser = undefined;
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
        confirmEmail: function(Session, $q, $stateParams) {
            var deferred = $q.defer();
            Session.confirmEmail($stateParams.confirmToken, function(successData) {
                deferred.resolve(successData);
            }, function(errorData) {
                deferred.reject(errorData);
            });
            return deferred.promise;
        },
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
        templateUrl: 'layouts/home.html',
        controller: 'HomeCtrl'
    },

    //  Error Routes  //
    'error': {
        abstract: true,
        templateUrl: 'layouts/errors.html',
        controller: 'ErrorCtrl'
    },
    'error.400': {
        url: '/400',
        templateUrl: 'errors/400.html',
        controller: 'Error400Ctrl'
    },
    'error.401': {
        url: '/401',
        templateUrl: 'errors/401.html',
        controller: 'Error401Ctrl'
    },
    'error.403': {
        url: '/403',
        templateUrl: 'errors/403.html',
        controller: 'Error403Ctrl'
    },
    'error.404': {
        url: '/404',
        templateUrl: 'errors/404.html',
        controller: 'Error404Ctrl'
    },

    //  Session Routes  //
    'session': {
        abstract: true,
        templateUrl: 'layouts/session.html',
        controller: 'SessionCtrl'
    },
    'session.signup': {
        url: '/signup',
        templateUrl: 'sessions/signup.html',
        controller: 'SessionSignupCtrl'
    },
    'session.login': {
        url: '/login',
        templateUrl: 'sessions/login.html',
        controller: 'SessionLoginCtrl'
    },
    'session.logout': {
        url: '/logout',
        controller: 'SessionLogoutCtrl',
        resolve: {
            user: Bugtracker.Config.resolve.session.logout
        }
    },
    'session.confirm_email': {
        url: '/confirm_email/:confirmToken',
        controller: 'SessionConfirmEmailCtrl',
        resolve: {
            user: Bugtracker.Config.resolve.session.confirmEmail
        }
    },

    //  App Routes  //
    'app': {
        abstract: true,
        templateUrl: 'layouts/app.html',
        data: {
            breadcrumb: undefined
        }
    },
    //  User Routes  //
    'app.users': {
        abstract: true,
        url: '/users',
        template: '<div ui-view />',
        controller: 'UserCtrl',
        data: {
            breadcrumb: 'Users',
            breadcrumbRoute: null
        }
    },
    'app.users.single': {
        abstract: true,
        url: '/{userId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            user: Bugtracker.Config.resolve.user.findById
        },
        data: {
            breadcrumb: '{{ userId }}',
            breadcrumbRoute: 'app.user.single.show'
        }
    },
    'app.users.single.show': {
        url: '',
        templateUrl: 'users/show.html',
        controller: 'UserShowCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    //  Project Routes  //
    'app.projects': {
        abstract: true,
        url: '/projects',
        template: '<div ui-view />',
        controller: 'ProjectCtrl',
        data: {
            breadcrumb: 'Projects',
            breadcrumbRoute: 'app.projects.index'
        }
    },
    'app.projects.single': {
        abstract: true,
        url: '/{projectId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            project: Bugtracker.Config.resolve.project.findById
        },
        data: {
            breadcrumb: '{{ projectId }}',
            breadcrumbRoute: 'app.projects.single.show'
        }
    },
    'app.projects.index': {
        url: '',
        templateUrl: 'projects/index.html',
        controller: 'ProjectIndexCtrl',
        resolve: {
            projects: Bugtracker.Config.resolve.project.all
        },
        data: {
            breadcrumb: undefined
        }
    },
    'app.projects.single.show': {
        url: '',
        templateUrl: 'projects/show.html',
        controller: 'ProjectShowCtrl',
        resolve: {
            bugs: Bugtracker.Config.resolve.bug.all,
            permissions: Bugtracker.Config.resolve.permission.all
        },
        data: {
            breadcrumb: undefined
        }
    },
    'app.projects.new': {
        url: '/new',
        templateUrl: 'projects/new.html',
        controller: 'ProjectNewCtrl',
        data: {
            breadcrumb: 'New'
        }
    },
    'app.projects.single.edit': {
        url: '/edit',
        templateUrl: 'projects/edit.html',
        controller: 'ProjectEditCtrl',
        resolve: {
            permissions: Bugtracker.Config.resolve.permission.all
        },
        data: {
            breadcrumb: 'Edit'
        }
    },
    //  Bug Routes  //
    'app.projects.single.bugs': {
        abstract: true,
        url: '/bugs',
        templateUrl: 'layouts/bugs.html',
        controller: 'BugCtrl',
        data: {
            breadcrumb: 'Bugs',
            breadcrumbRoute: 'app.projects.single.bugs.index'
        }
    },
    'app.projects.single.bugs.single': {
        abstract: true,
        url: '/{bugId:[0-9]{1,8}}',
        template: '<div ui-view />',
        resolve: {
            bug: Bugtracker.Config.resolve.bug.findById
        },
        data: {
            breadcrumb: '{{ bugId }}',
            breadcrumbRoute: 'app.projects.single.bugs.single.show'
        }
    },
    'app.projects.single.bugs.index': {
        url: '',
        templateUrl: 'bugs/index.html',
        controller: 'BugIndexCtrl',
        resolve: {
            bugs: Bugtracker.Config.resolve.bug.all
        },
        data: {
            breadcrumb: undefined
        }
    },
    'app.projects.single.bugs.single.show': {
        url: '',
        templateUrl: 'bugs/show.html',
        controller: 'BugShowCtrl',
        data: {
            breadcrumb: undefined
        }
    },
    'app.projects.single.bugs.new': {
        url: '/new',
        templateUrl: 'bugs/new.html',
        controller: 'BugNewCtrl',
        resolve: {
            permissions: Bugtracker.Config.resolve.permission.all
        },
        data: {
            breadcrumb: 'New'
        }
    },
    'app.projects.single.bugs.single.edit': {
        url: '/edit',
        templateUrl: 'bugs/edit.html',
        controller: 'BugEditCtrl',
        data: {
            breadcrumb: 'Edit'
        }
    },
    'app.projects.single.bugs.feed': {
        url: '/feed',
        templateUrl: 'bugs/feed.html',
        controller: 'BugFeedCtrl',
        resolve: {
            bugs: Bugtracker.Config.resolve.bug.all
        },
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
bugtracker = angular.module('bugtracker', ['ngResource', 'ui.router', 'ui.select', 'templates', 'ngSanitize', 'angular-flash.service', 'angular-flash.flash-alert-directive', 'ngProgressLite']);

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
    'Session',

    function($rootScope, $state, ngProgressLite, Session) {
    // Set the user on the $rootScope object if a session is in progress.
    Session.currentUser(function(successData) {
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
        Logger.error(error);
        switch (error.status) {
            case 401:
                $state.transitionTo('session.login');
                break;
            default:
                $state.transitionTo('error.' + error.status);
        }

        ngProgressLite.done();
    });
}]);