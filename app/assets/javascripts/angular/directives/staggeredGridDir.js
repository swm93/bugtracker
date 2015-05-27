bugtracker.directive('staggeredgrid', function($compile, $timeout) {
    return {
        restrict: 'E', // only activate on element attribute
        scope: {
            cells: "=cells"
        },
        link: function(scope, $element, attrs) {
            var $window = $(window);
            var $wrapper = $('<div class="grid-cell"></div>');
            var cellTemplate = $wrapper.append($element.children().remove());
            var columnTemplate = $('<div class="grid-column"></div>');

            var widths = [768, 992, 1200];

            var numColumns = 0;
            var nextColumn = 0;

            var childScopes = [];


            columnTemplate.css({
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top'
            });

            $window.on('resize', _.throttle(function() {
                var newNumColumns = getNumColumns($window.width());

                if (newNumColumns !== numColumns) {
                    redraw(newNumColumns);
                }
            }, 100));

            redraw(getNumColumns($window.width()));


            function redraw(newNumColumns) {
                var i;
                var width = (100 / newNumColumns) + '%';

                numColumns = newNumColumns;
                nextColumn = 0;

                for (i = 0; i < childScopes.length; i++) {
                    childScopes[i].$el.detach();
                }

                $element.empty();

                for (i = 0; i < numColumns; i++) {
                    var $column = columnTemplate.clone();
                    $column.css({
                        width: width
                    });

                    $element.append($column);
                }

                for (i = 0; i < scope.cells.length; i++) {
                    addCell(i);
                }
            }

            function addCell(index) {
                var childScope;
                var $column = $('.grid-column:eq('+nextColumn+')', $element);

                if (childScopes[index]) {
                    childScope = childScopes[index];
                }
                else {
                    childScope = scope.$new();
                    childScope.cell = scope.cells[index];
                    childScope.$el = cellTemplate.clone();

                    childScope.$el.css({
                        position: 'relative',
                        display: 'block',
                        width: '100%'
                    });

                    $compile(childScope.$el.contents())(childScope);

                    childScopes.push(childScope);
                }

                $column.append(childScope.$el);

                nextColumn = (nextColumn + 1) % numColumns;
            }

            function getNumColumns(newWidth) {
                var i;

                for (i = 0; i < widths.length; i++) {
                    var width = widths[i];

                    if (newWidth < width) {
                        break;
                    }
                }

                return i + 1;
            }
        }
    };
});