(function($) {
    var pluginName = 'editableLabel';
    var defaults = {
        success: function(newVal, oldVal) {},
        error: function(newVal, oldVal) {},
        always: function(newVal, oldVal) {},
        validate: function(newVal, oldVal) { return true; },
    };


    //  PUBLIC INTERFACE
    function EditableLabel(element, options) {
        this.el = element;
        this.$el = $(element);
        options = $.extend({}, defaults, options);

        this.initialize(options);
    };

    EditableLabel.prototype.initialize = function(options) {
        this.initialVal = this.$el.text();
        this.callbacks = {
            success: options.success,
            error: options.error,
            always: options.always,
        };
        this.validate = options.validate;

        this.render();
        this.bindEvents();
    };

    EditableLabel.prototype.render = function() {
        this.$el.addClass('editable-label');
        this.$el.html(
            '<div class="value-label" contenteditable="true">' +
                this.initialVal +
            '</div>' +
            '<span class="edit-icon glyphicon glyphicon-pencil"></span>'
        );

        this.$el.css({
            border: '1px dashed lightgrey',
        });

        this.$valueLabel = $('.value-label', this.$el);
        this.$editIcon = $('.edit-icon', this.$el);
    };

    EditableLabel.prototype.bindEvents = function() {
        var that = this;

        this.$el.on('mouseenter mouseleave', function(e) {
            $(this).toggleClass('focus', e.type === 'mouseenter');
        });

        this.$valueLabel.on('focus', function() {
            that.beginEditing();
        });
        this.$valueLabel.on('blur', function() {
            that.finishEditing();
        });
    };

    EditableLabel.prototype.getValue = function() {
        return this.$el.text();
    };

    EditableLabel.prototype.beginEditing = function() {
        this.$el.toggleClass('editing', true);
    };

    EditableLabel.prototype.finishEditing = function() {
        this.finalVal = this.getValue();
        this.$el.toggleClass('editing', false);

        performCallback.call(this);
    };


    //  PRIVATE INTERFACE
    var performCallback = function() {
        var callback = this.validate(this.finalVal, this.initialVal) ? this.callbacks.success : this.callbacks.error;

        callback.call(this.$el, this.finalVal, this.intialVal);
        this.callbacks.always(this.finalVal, this.initialVal);
    }


    $.fn[pluginName] = function(options) {
        return this.each(function(i) {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new EditableLabel(this, options));
            }
        });
    };

}) (jQuery);