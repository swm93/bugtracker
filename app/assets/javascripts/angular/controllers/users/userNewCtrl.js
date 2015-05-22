bugtracker.controller('UserNewCtrl', ['$scope', '$http', 'flash', 'User', function($scope, $http, flash, User) {
    $scope.user = {};

    $scope.createUser = function() {
        User.create($scope.user, function() {
            Logger.info("successfully created user " + $scope.user.email);
            //TODO: do something here
        }, function(errorData) {
            Logger.error("failed to create user " + $scope.user.email);
            if (errorData.data.email) {
                flash.error = "Email " + errorData.data.email[0];
            }
            else {
                flash.error = "Unexpected error";
            }
        });
    };
}]);