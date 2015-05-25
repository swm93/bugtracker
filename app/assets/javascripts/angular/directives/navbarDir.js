var navbar = function($interval, $q, User) {
    return {
        restrict: 'E', // only activate on element attribute
        templateUrl: 'navbar.html',
        link: function(scope, element) {
            var formats = [formatPercentResolvedBugs, formatNumberProjects];
            var currentFormat;
            var $statisticLabel = $('.label-statistic', element);

            function getStatistics() {
                var deferred = $q.defer();
                User.statistics(function(successData) {
                    deferred.resolve(successData);
                }, function(errorData) {
                    deferred.reject(errorData);
                });
                return deferred.promise;
            }

            function formatPercentResolvedBugs(data) {
                var percent = Math.round((data.number_resolved_bugs / data.number_bugs) * 100);
                return "You have resolved " + percent + "% the bugs across all projects.";
            }

            function formatNumberProjects(data) {
                return "You are currently working on " + data.number_projects + " projects.";
            }

            getStatistics().then(function(data) {
                scope.statistics = [
                    formatPercentResolvedBugs(data),
                    formatNumberProjects(data)
                ];
            });

            $statisticLabel.textillate({
                minDisplayTime: 15000,
                initialDelay: 0,
                loop: true,
                autoStart: true,
                in: {
                    effect: 'fadeInUp',
                    sync: true
                },
                out: {
                    effect: 'fadeOutUp',
                    sync: true
                }
            });
        }
    };
};

bugtracker.directive('navbar', ['$interval', '$q', 'User', navbar]);