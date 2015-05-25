bugtracker.controller('SessionConfirmEmailCtrl', ['$scope', '$state', function($scope, $state) {
    $state.transitionTo('session.login');
}]);