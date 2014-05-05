Bugtracker.Views.Bugs.Index = function() {
    var filterHandler = new Bugtracker.Classes.BugsFilterHandler($('#bug-sidebar-container'));
    var sortHandler = new Bugtracker.Classes.BugsSortHandler($('#bugs-list-table-header'));
    var renderer = new Bugtracker.Classes.BugsRenderer($('#bug-list-table-body'), {
        filterHandler: filterHandler,
        sortHandler: sortHandler,
    });
};



/*/     BUGSRENDERER     /*/

Bugtracker.Classes.BugsRenderer = function($el, options) {
    this.$el = $el;
    this.template = HandlebarsTemplates['bugs/index/bug_row'];
    this.modelData = [];
    this.filterHandler = options.filterHandler;
    this.sortHandler = options.sortHandler;

    this.initialize(options);
};

Bugtracker.Classes.BugsRenderer.prototype.initialize = function(options) {
    this.filterHandler.addSuccessListener(this.render, this);
    this.sortHandler.addChangeListener(this.sort, this);

    this.filterHandler.refreshFilter();
    this.sortHandler.refreshSort();
};

Bugtracker.Classes.BugsRenderer.prototype.defaults = {
    sortMapping: {
        priority: {
            high: 2,
            normal: 1,
            low: 0,
        },
        status: {
            assigned: 2,
            investigate: 1,
            resolved: 0,
        },
    },
};

Bugtracker.Classes.BugsRenderer.prototype.render = function(modelData) {
    var that = this;
    var html = "";
    this.modelData = modelData;

    $.each(modelData, function(i, model) {
        model.show_link = window.location.href + '/' + model.id;
        model.edit_link = model.show_link + '/edit';
        html += that.template(model);
    });

    this.$el.empty();
    this.$el.append(html);
    $('#bug-list-container').toggleClass('no-content', !html);
    $('.visible-bug-count').text(modelData.length);

    this.sortHandler.refreshSort();
};

Bugtracker.Classes.BugsRenderer.prototype.sort = function(sortBy) {
    this.modelData = this.sortModels(this.modelData, sortBy);
    var that = this;
    var modelDataReverse = this.modelData.reverse();

    $.each(modelDataReverse, function(i, model) {
        var $el = $('#bug-row-' + model.id, that.$el).detach();
        that.$el.prepend($el);
    });
};

Bugtracker.Classes.BugsRenderer.prototype.sortModels = function(modelData, sortBy) {
    var that = this;
    var compare = function(i, modelA, modelB, mapping) {
        if (i > sortBy.length-1) { return 0; }
        var sField = sortBy[i].field;
        var sOrder = sortBy[i].order;
        var asc = sOrder === 'ascending';
        var fieldMapping = mapping[sField];
        var valA = fieldMapping ? fieldMapping[modelA[sField]] : modelA[sField];
        var valB = fieldMapping ? fieldMapping[modelB[sField]] : modelB[sField];

        if (valA > valB) {
            return asc ? 1 : -1;
        }
        else if (valA < valB) {
            return asc ? -1 : 1;
        }
        else {
            return compare(i+1, modelA, modelB, mapping);
        }
    };

    return modelData.sort(function(a, b) {
        return compare(0, a, b, that.defaults.sortMapping);
    });
};



/*/     BUGSSORTHANDLER     /*/

Bugtracker.Classes.BugsSortHandler = function($el, options) {
    this.$el = $el;
    this.callbacks = [];
    this.sortStates = [];

    this.defaults = _.defaults(options || {}, this.defaults);

    this.initialize();
};

Bugtracker.Classes.BugsSortHandler.prototype.defaults = {
    className: 'bugs-header-cell',
    toggleOrder: ['', 'ascending', 'descending'],
    sortClasses: ['fa-sort', 'fa-sort-asc', 'fa-sort-desc'],
    sortOrder: {field: 'id', order: 'descending'},
};

Bugtracker.Classes.BugsSortHandler.prototype.initialize = function() {
    this.bindSortListener();
};

Bugtracker.Classes.BugsSortHandler.prototype.addChangeListener = function(callback, context) {
    this.callbacks.push({
        callback: callback,
        context: context,
    });
};

Bugtracker.Classes.BugsSortHandler.prototype.bindSortListener = function() {
    var that = this;
    var $sortEls = $('.' + this.defaults.className, this.$el);

    $sortEls.on('click', function(e) {
        that.toggleSort($(this));
    });
};

Bugtracker.Classes.BugsSortHandler.prototype.triggerEvent = function(response) {
    if (response.length < 1) {
        response.push(this.defaults.sortOrder);
    }
    $.each(this.callbacks, function(i, callback) {
        callback.callback.call(callback.context, Array.prototype.slice.call(response).reverse());
    });
};

Bugtracker.Classes.BugsSortHandler.prototype.toggleSort = function($el) {
    var data = $el.data();
    data.order = this.getNextSortOrder(data.order);

    this.setSortClass($el, data.order);

    if (data.order == "" || _.findWhere(this.sortStates, {field: data.field})) {
        this.sortStates = _.reject(this.sortStates, function(sortState) {
            return sortState.field === data.field;
        });
    }
    if (data.order != "") {
        this.sortStates.push(data);
    }

    this.refreshSort();
};

Bugtracker.Classes.BugsSortHandler.prototype.refreshSort = function() {
    this.triggerEvent(this.sortStates);
};

Bugtracker.Classes.BugsSortHandler.prototype.getNextSortOrder = function(order) {
    var index = this.defaults.toggleOrder.indexOf(order);
    var newIndex = (index + 1 > this.defaults.toggleOrder.length - 1) ? 0 : index + 1;
    return this.defaults.toggleOrder[newIndex];
};

Bugtracker.Classes.BugsSortHandler.prototype.setSortClass = function($el, order) {
    var classIndex = this.defaults.toggleOrder.indexOf(order);
    var $classEl = $('span', $el);

    $.each(this.defaults.sortClasses, function(i, val) {
        $classEl.removeClass(val);
    });

    $classEl.addClass(this.defaults.sortClasses[classIndex]);
};



/*/     BUGSFILTERHANDLER     /*/

Bugtracker.Classes.BugsFilterHandler = function($el, options) {
    this.$el = $el;
    this.currentFilters = {};
    this.callbacks = {
        error: [],
        success: [],
    };

    this.defaults = _.defaults(options || {}, this.defaults);

    this.initialize();
};

Bugtracker.Classes.BugsFilterHandler.prototype.defaults = {
    className: 'bugs-filter-checkbox',
};

Bugtracker.Classes.BugsFilterHandler.prototype.initialize = function() {
    this.bindFilterListener();
};

Bugtracker.Classes.BugsFilterHandler.prototype.addSuccessListener = function(callback, context) {
    this.callbacks.success.push({
        callback: callback,
        context: context,
    });
};

Bugtracker.Classes.BugsFilterHandler.prototype.addErrorListener = function(callback, context) {
    this.callbacks.error.push({
        callback: callback,
        context: context,
    });
};

Bugtracker.Classes.BugsFilterHandler.prototype.bindFilterListener = function() {
    var that = this;
    var $filterEls = $('.' + this.defaults.className, this.$el);

    $filterEls.on('change', function() {
        var $this = $(this);
        that.toggleFilter($this.prop('id'), $this.is(':checked'));
    });
};

Bugtracker.Classes.BugsFilterHandler.prototype.triggerEvent = function(event, response) {
    $.each(this.callbacks[event], function(i, callback) {
        callback.callback.call(callback.context, response);
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
    var that = this;

    $.ajax({
        url: this.getURL(this.currentFilters),
        dataType: 'json',
        success: function(data, status, request) {
            that.triggerEvent('success', data);
        },
        error: function(request, status, error) {
            that.triggerEvent('error', error);
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



// Bugtracker.Classes.CommentPopoverHandler = function(el, options) {
//     this.el = el;
//     this.$el = $(el);

//     this.options = _.defaults(options || {}, this.defaults);
// };

// Bugtracker.Classes.CommentPopoverHandler.prototype.defaults = {
//     title: 'Add a Comment',
//     content: HandlebarsTemplates['bugs/index/comment_popover'](),
//     container: 'body',
//     placement: 'left',
//     trigger: 'click',
//     html: true,
// };

// Bugtracker.Classes.CommentPopoverHandler.prototype.refresh = function() {
//     this.$el = $(this.el);
//     this.$el.popover(options);

//     this.addShowListener();
// };

// Bugtracker.Classes.CommentPopoverHandler.prototype.addShowListener = function() {
//     var that = this;

//     this.$el.on('show.bs.popover', function(e) {
//         that.$el.not($(this)).popover('hide');
//     });
//     this.$el.on('click', function(e) {
//         return false;
//     });
// };