Bugtracker.Views.Bugs.Index = function() {
    var popoverHandler = new Bugtracker.Classes.CommentPopoverHandler($('.cell-bug-comment'));
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