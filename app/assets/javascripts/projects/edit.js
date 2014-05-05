Bugtracker.Views.Projects.Edit = function() {
    var labelHandler = new Bugtracker.Classes.ProjectLabelHandler($('.editable-label'));
    var permissionsTableHandler = new Bugtracker.Classes.ProjectPermissionsTableHandler($('#project-permissions-table'));
    var permissionsInputHandler = new Bugtracker.Classes.ProjectPermissionsInputHandler($('#project-permissions-input'));
};



Bugtracker.Classes.ProjectLabelHandler = function($el, options) {
    this.$el = $el;
    options = options || {};

    this.initialize(options);
};

Bugtracker.Classes.ProjectLabelHandler.prototype.initialize = function(options) {
    this.$el.editableLabel({
        success: this.successCallback,
        validate: this.validateCallback,
    });
};

Bugtracker.Classes.ProjectLabelHandler.prototype.successCallback = function(newVal, oldVal) {
    var data = {_method: 'put', project: {}};
    data.project[this.attr('name')] = newVal;

    $.ajax({
        type: "POST",
        url: '/' + window.location.pathname.match(/(projects\/[\d]+)\/edit/)[1],
        data: data,
        error: function() {
            //TODO: handle error
            alert('Value was not updated.')
        },
    });
};

Bugtracker.Classes.ProjectLabelHandler.prototype.validateCallback = function(newVal, oldVal) {
    return newVal !== oldVal;
};



Bugtracker.Classes.ProjectPermissionsTableHandler = function($el, options) {
    this.$el = $el;
    this.template = HandlebarsTemplates['projects/edit/permission_table_row'];

    options = options || {};

    this.initialize(options);
};

Bugtracker.Classes.ProjectPermissionsTableHandler.prototype.initialize = function(options) {
    var that = this;

    this.fetchProjectData({
        success: function(data, response, header) {
            that.model = data;

            that.render();
            that.bindEvents();
        },
    });
};

Bugtracker.Classes.ProjectPermissionsTableHandler.prototype.render = function() {
    var that = this;
    var html = "";

    $.each(this.model.permissions, function(i, permission) {
        html += that.template(permission);
    });

    $('tbody', this.$el).html(html);
};

Bugtracker.Classes.ProjectPermissionsTableHandler.prototype.renderRow = function(permission) {
    $('tbody', this.$el).prepend(this.template(permission));
};

Bugtracker.Classes.ProjectPermissionsTableHandler.prototype.bindEvents = function() {

};

Bugtracker.Classes.ProjectPermissionsTableHandler.prototype.fetchProjectData = function(options) {
    var getUrl = '/' + window.location.pathname.match(/(projects\/[\d]+)\/edit/)[1];

    $.ajax({
        type: "GET",
        url: getUrl,
        dataType: 'json',
        success: options.success || function() {},
        error: options.error || function() {},
    });
};



Bugtracker.Classes.ProjectPermissionsInputHandler = function($el, options) {
    this.$el = $el;
    this.template = HandlebarsTemplates['projects/edit/permission_dropdown_row'];

    options = options || {};

    this.initialize(options);
};

Bugtracker.Classes.ProjectPermissionsInputHandler.prototype.initialize = function(options) {
    this.dropdownHandler = new Bugtracker.Classes.ProjectPermissionsDropdownHandler($('#project-permissions-dropdown', this.$el));

    this.bindEvents();
};

Bugtracker.Classes.ProjectPermissionsInputHandler.prototype.bindEvents = function() {
    var that = this;

    $('#button-add-project-permission', this.$el).on('click', function() {
        var data = that.getData();
        that.createPermission(data);
    });
};

Bugtracker.Classes.ProjectPermissionsInputHandler.prototype.createPermission = function(data) {
    $.ajax({
        type: "POST",
        url: '/' + window.location.pathname.match(/(projects\/[\d]+)\/edit/)[1] + '/permissions',
        data: data,
        error: function() {
            //TODO: handle error
            alert('Value was not updated.')
        },
    });
};

Bugtracker.Classes.ProjectPermissionsInputHandler.prototype.getData = function() {
    return {
        permission: {
            email: $('input', this.$el).val(),
            permission_type_id: this.dropdownHandler.selectedModelId,
        },
    };
};



Bugtracker.Classes.ProjectPermissionsDropdownHandler = function($el, options) {
    this.$el = $el;
    this.template = HandlebarsTemplates['projects/edit/permission_dropdown_row'];

    options = options || {};

    this.initialize(options);
};

Bugtracker.Classes.ProjectPermissionsDropdownHandler.prototype.initialize = function(options) {
    var that = this;

    this.fetchPermissionTypeData({
        success: function(data, response, header) {
            that.collection = data;
            that.selectedModelId = that.collection[0].id;

            that.render();
            that.bindEvents();
        },
    });
};

Bugtracker.Classes.ProjectPermissionsDropdownHandler.prototype.render = function() {
    var that = this;
    var html = "";

    $.each(this.collection, function(i, permissionType) {
        html += that.template(permissionType);
    });

    this.$el.html(html);
};

Bugtracker.Classes.ProjectPermissionsDropdownHandler.prototype.bindEvents = function() {
    var that = this;

    //TODO: replace this with bootstrap dropdown change event
    $('li', this.$el).on('click', function() {
        that.selectedModelId = $(this).data('permission-type-id');
    });
};

Bugtracker.Classes.ProjectPermissionsDropdownHandler.prototype.fetchPermissionTypeData = function(options) {
    $.ajax({
        type: "GET",
        url: '/permission_types',
        dataType: 'json',
        success: options.success || function() {},
        error: options.error || function() {},
    });
};
