bugtracker.controller('BugIndexCtrl', ['$scope', '$stateParams', '$filter', 'bugs', function($scope, $stateParams, $filter, bugs) {
    $scope.bugs = bugs;
    $scope.filter = {
        assignee: [],
        priority: [],
        status: []
    };
    $scope.sort = ['id'];

    
    $("[data-toggle='tooltip']").tooltip();

    $scope.hasVisibleBugs = function() {
        return $filter('filterMultiple')($scope.bugs, $scope.filter).length;
    };

    $scope.hasBugs = function() {
        return $scope.bugs.length;
    };

    $scope.toggleFilter = function(type, val) {
        var typeFilters = $scope.filter[type];

        if (angular.isArray(typeFilters)) {
            var index = typeFilters.indexOf(val);
            if (index === -1) {
                typeFilters.push(val);
            }
            else {
                typeFilters.splice(index, 1);
            }
        }

        resizeTable(true);
    };

    $scope.toggleSort = function(sortType) {
        var index = getSortTypeIndex(sortType);
        var sortParam = $scope.sort[getSortTypeIndex(sortType)];
        var nextParam = getNextSortParam(sortParam, sortType);

        if (sortParam) {
            $scope.sort.splice(index, 1);
        }
        if (nextParam) {
            $scope.sort.unshift(nextParam);
        }
    };

    $scope.getSortIconClass = function(sortType) {
        var sortParam = $scope.sort[getSortTypeIndex(sortType)];
        if (!sortParam) {
            return 'fa-sort';
        }
        else if (sortParam[0] === '-') {
            return 'fa-sort-asc';
        }
        else {
            return 'fa-sort-desc';
        }
    };

    $scope.getSortIndex = function(sortType) {
        var index = getSortTypeIndex(sortType);
        if (index === -1) {
            return '';
        }
        return index + 1;
    };

    var getSortTypeIndex = function(sortType) {
        for (var i = 0; i < $scope.sort.length; i++) {
            if ($scope.sort[i].indexOf(sortType) !== -1) {
                return i;
            }
        }
        return -1;
    };

    var getNextSortParam = function(sortParam, sortType) {
        if (!sortParam) {
            return sortType;
        }
        else if (sortParam[0] === '-') {
            return undefined;
        }
        else {
            return '-' + sortType;
        }
    };

    var resizeTable = function() {
        var $tableContainer = $('.table-container');
        var $tableContainerParent = $tableContainer.parent();
        var $tableBody = $('tbody', $tableContainer);
        var tableContainerVerticalExtension = $tableContainer.outerHeight(true) - $tableContainer.height();
        var tableToolbarHeight = $('.table-toolbar', $tableContainer).height();
        var tableHeaderHeight = $('thead', $tableContainer).height();

        var prevHeight = -1;

        var resize = function(forceResize) {
            var newHeight = $tableContainerParent.height();

            if (prevHeight != newHeight || forceResize === true) {
                var maxHeight = newHeight - tableContainerVerticalExtension - tableToolbarHeight - tableHeaderHeight;
                var idealHeight = 0;
                $tableBody.children().each(function() {
                    idealHeight = idealHeight + $(this).outerHeight();
                });
                $tableBody.height(Math.min(maxHeight, idealHeight));

                prevHeight = newHeight;
            }
        };
        return function(forceResize) {
            setTimeout(function() {
                resize(forceResize);
            }, 0);
        };
    }();

    $(window).on('resize', resizeTable);
    resizeTable();
}]);