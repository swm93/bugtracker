bugtracker.controller('BugIndexCtrl', ['$scope', '$stateParams', '$filter', 'bugs', function($scope, $stateParams, $filter, bugs) {
    $scope.bugs = bugs;
    $scope.filter = {
        assignee: [],
        priority: [],
        status: []
    };
    $scope.sort = ['id'];


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
}]);