var navbar = function($interval, $q, User) {
    return {
        restrict: 'E', // only activate on element attribute
        templateUrl: 'navbar.html',
        link: function(scope, element) {
            var formats = [formatPercentResolvedBugs, formatNumberProjects];
            var currentFormat;
            var $container = $('.navbar', element);
            var $brand = $('.navbar-brand', element);
            var $toggleButton = $('.navbar-toggle', element);
            var $rightContainer = $('.navbar-nav.navbar-right', element);
            var $statisticsContainer = $('.navbar-statistics', element);
            var $statisticLabel = $('.label-statistic', element);

            var containerPadding = $container.outerWidth() - $container.width();
            var brandWidth = $brand.outerWidth();

            function updateStatisticsContainerWidth() {
                var left = containerPadding / 2 + brandWidth;
                var right = containerPadding / 2;

                if ($rightContainer.is(':visible')) {
                    right += $rightContainer.outerWidth();
                }
                if ($toggleButton.is(':visible')) {
                    right += $toggleButton.outerWidth();
                }

                $statisticsContainer.css({
                    left: left,
                    right: right
                });
            }

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
                if (_.isNaN(percent)) {
                    percent = 100;
                }

                return percent + "% of the bugs across all your projects are resolved.";
            }

            function formatNumberProjects(data) {
                return "You are currently working on " + data.number_projects + " projects.";
            }

            getStatistics().then(function(data) {
                scope.statistics = [
                    formatPercentResolvedBugs(data),
                    formatNumberProjects(data)
                ];

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
            });

            $(window).on('resize', updateStatisticsContainerWidth);
            updateStatisticsContainerWidth();
        }
    };
};

bugtracker.directive('navbar', ['$interval', '$q', 'User', navbar]);