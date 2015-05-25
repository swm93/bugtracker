var breadcrumbs = function($interpolate, $state) {
    return {
        restrict: 'E',
        templateUrl: 'breadcrumbs.html',
        scope: {
            displaynameProperty: '@',
            routeProperty: '@'
        },
        link: function(scope) {
            scope.breadcrumbs = [];
            scope.currentUser = scope.$root.currentUser;

            if ($state.$current.name !== '') {
                updateBreadcrumbsArray();
            }
            scope.$on('$stateChangeSuccess', function() {
                updateBreadcrumbsArray();
            });

            /*
             * Start with the current state and traverse up the path to build
             * the array of breadcrumbs that can be used in an ng-repeat in
             * the template.
             */
            function updateBreadcrumbsArray() {
                var breadcrumbs = [];
                var currentState = $state.$current;

                while (currentState && currentState.name !== '') {
                    addBreadcrumb(currentState, breadcrumbs);

                    currentState = currentState.parent;
                }
                breadcrumbs.reverse();
                scope.breadcrumbs = breadcrumbs;
            }

            function addBreadcrumb(state, breadcrumbs) {
                var displayName = getDisplayName(state);
                var route = getRoute(state);

                if (displayName === false || route === false) {
                    return;
                }

                for (var i = 0; i < breadcrumbs.length; i++) {
                    if (breadcrumbs[i].route === state.name) {
                        breadcrumbs[i] = {
                            displayName: displayName,
                            route: route
                        };
                    }
                }

                breadcrumbs.push({
                    displayName: displayName,
                    route: route
                });
            }

            /*
             * Resolve the displayName of the specified state. Take the
             * property specified by the `displayname-property` attribute and
             * look up the corresponding property on the state's config
             * object. The specified string can be interpolated against any
             * resolved properties on the state config object, by using the
             * usual {{ }} syntax.
             * @param currentState
             * @returns {*}
             */
            function getDisplayName(currentState) {
                var interpolationContext;
                var propertyReference;
                var displayName;

                if (!scope.displaynameProperty) {
                    // if the displayname-property attribute was not specified, default to the state's name
                    return currentState.name;
                }
                propertyReference = getObjectValue(scope.displaynameProperty, currentState);

                if (propertyReference === false || typeof propertyReference === 'undefined') {
                    return false;
                }
                else {
                    // use the $interpolate service to handle any bindings in the propertyReference string.
                    interpolationContext =  (typeof currentState.locals !== 'undefined') ? currentState.locals.globals : currentState;
                    displayName = $interpolate(propertyReference)(interpolationContext.$stateParams);
                    return displayName;
                }
            }

            function getRoute(currentState) {
                var route;

                if (!scope.routeProperty) {
                    return currentState.name;
                }
                route = getObjectValue(scope.routeProperty, currentState);

                if (route === false || typeof route === 'undefined') {
                    return false;
                }
                else {
                    return route;
                }
            }

            /**
             * Given a string of the type 'object.property.property', traverse
             * the given context (eg the current $state object) and return the
             * value found at that path.
             *
             * @param objectPath
             * @param context
             * @returns {*}
             */
            function getObjectValue(objectPath, context) {
                var i;
                var propertyArray = objectPath.split('.');
                var propertyReference = context;

                for (i = 0; i < propertyArray.length; i ++) {
                    if (angular.isDefined(propertyReference.data[propertyArray[i]])) {
                        propertyReference = propertyReference.data[propertyArray[i]];
                    } else {
                        // if the specified property was not found, default to the state's name
                        return undefined;
                    }
                }
                return propertyReference;
            }
        }
        // controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
        //     var setNavigationState = function () {
        //         $scope.$navigationState = {
        //             currentState: $state.$current,
        //             params: $stateParams
        //         }
        //     };

        //     $scope.$on('$stateChangeSuccess', function () {
        //         setNavigationState();
        //     });

        //     $scope.show = function(state) {
        //         return angular.isDefined(state.data) && angular.isDefined(state.data.breadcrumb);
        //     };

        //     $scope.evaluateExpression = function(expression) {
        //         $parse(expression);
        //     };
        //     debugger

        //     setNavigationState();
        // }]
    };
};

bugtracker.directive('breadcrumbs', ['$interpolate', '$state', breadcrumbs]);