//= require_tree ../templates/bugs/feed

$(document).ready(function() {
    var feedRenderer = new Bugtracker.Classes.FeedRenderer($('.col-sm-9.col-md-10'), {
        sourcePath: '/subscribe/everyone',
    });
});


Bugtracker.Classes.FeedRenderer = function($el, options) {
    this.initialize($el, options);
};

Bugtracker.Classes.FeedRenderer.prototype.initialize = function($el, options) {
    this.$el = $el;
    this.source = new EventSource(options.sourcePath);

    this.bindEvents();
};

Bugtracker.Classes.FeedRenderer.prototype.renderMessage = function(message) {
    this.$el.append(that.template(message));
};

Bugtracker.Classes.FeedRenderer.prototype.bindEvents = function() {
    this.source.addEventListener('message', function(e) {
        var message = JSON.parse(e.data);
        that.renderMessage(message);
    });
};