bugtracker.directive('logo', function() {
    return {
        restrict: 'E', // only activate on element attribute
        templateUrl: 'images/isometric-cube.svg',
        link: function(scope, element, attrs) {
            var height = element.height();
            var width = element.height();
            var min = Math.min(height, width);

            element.css({
                width: min,
                height: min
            });
        }
    };
});