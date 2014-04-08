$(document).ready(function() {
    var popoverHandler = new Bugtracker.Classes.CommentPopoverHandler($('.cell-bug-comment'));
});


Bugtracker.Classes.CommentPopoverHandler = function($el, options) {
    defaults = {
        title: 'Add a Comment',
        content: HandlebarsTemplates['bugs/index/comment_popover'](),
        container: 'body',
        placement: 'left',
        trigger: 'click',
        html: true,
    };
    options = _.defaults(options || {}, defaults);

    this.initialize($el, options);
};

Bugtracker.Classes.CommentPopoverHandler.prototype.initialize = function($el, options) {
    this.$el = $el;

    $el.popover(options);

    this.bindShowEvent($el);
};

Bugtracker.Classes.CommentPopoverHandler.prototype.bindShowEvent = function() {
    var that = this;

    this.$el.on('show.bs.popover', function(e) {
        that.$el.not($(this)).popover('hide');
    });
    this.$el.on('click', function(e) {
        return false;
    });
};