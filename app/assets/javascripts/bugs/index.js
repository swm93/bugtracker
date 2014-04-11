Bugtracker.Views.Bugs.Index = function() {
    var popoverHandler = new Bugtracker.Classes.CommentPopoverHandler($('.cell-bug-comment'));
    var filterHandler = new Bugtracker.Classes.BugsFilterHandler($('#bug-sidebar-container'));
};

Bugtracker.Classes.BugsFilterHandler = function($el, options) {
    this.$el = $el;
    this.currentFilters = {};

    var defaults = {
        className: 'bugs-filter-checkbox'
    };
    options = _.defaults(options || {}, defaults);

    this.initialize(options);
};

Bugtracker.Classes.BugsFilterHandler.prototype.initialize = function(options) {
    this.addFilterListener(options.className);
};

Bugtracker.Classes.BugsFilterHandler.prototype.addFilterListener = function(className) {
    var that = this;
    var $filterEls = $('.' + className, this.$el);

    $filterEls.on('change', function() {
        var $this = $(this);
        that.toggleFilter($this.prop('id'), $this.is(':checked'));
    });
};

Bugtracker.Classes.BugsFilterHandler.prototype.toggleFilter = function(id, val) {
    if (val) {
        this.currentFilters[id] = this.getFilterForId(id);
    } else {
        delete this.currentFilters[id];
    }

    this.refreshFilter();
};

Bugtracker.Classes.BugsFilterHandler.prototype.refreshFilter = function() {
    $.ajax({
        url: this.getURL(this.currentFilters),
        dataType: 'json',
        success: function(data, status, request) {

        },
        error: function(request, status, error) {

        },
    });
};

Bugtracker.Classes.BugsFilterHandler.prototype.getFilterForId = function(id) {
    return $('#' + id, this.$el).data();
};

Bugtracker.Classes.BugsFilterHandler.prototype.getURL = function(filters) {
    var url = window.location.href + '.json?';
    $.each(filters, function(id, filter) {
        url += filter.filterType + "=" + filter.filterValue + "&";
    });
    url = url.slice(0, -1);
    return url;
};


Bugtracker.Classes.CommentPopoverHandler = function($el, options) {
    this.$el = $el;

    var defaults = {
        title: 'Add a Comment',
        content: HandlebarsTemplates['bugs/index/comment_popover'](),
        container: 'body',
        placement: 'left',
        trigger: 'click',
        html: true,
    };
    options = _.defaults(options || {}, defaults);

    this.initialize(options);
};

Bugtracker.Classes.CommentPopoverHandler.prototype.initialize = function(options) {
    this.$el.popover(options);

    this.addShowListener();
};

Bugtracker.Classes.CommentPopoverHandler.prototype.addShowListener = function() {
    var that = this;

    this.$el.on('show.bs.popover', function(e) {
        that.$el.not($(this)).popover('hide');
    });
    this.$el.on('click', function(e) {
        return false;
    });
};