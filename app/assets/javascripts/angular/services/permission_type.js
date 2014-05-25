bugtracker.factory('PermissionType', ['$resource', function($resource) {
    function PermissionType() {
        this.service = $resource('/api/permission_types/:permissionTypeId.json', {permissionTypeId: '@id'});
    };

    PermissionType.prototype.all = function() {
        return this.service.query();
    };

    PermissionType.prototype.find = function(params) {
        return this.service.get(params);
    };

    PermissionType.prototype.findById = function(id) {
        return this.service.get({permissionTypeId: id});
    };

    return new PermissionType;
}]);