/*/     BUGTRACKER
 *  This file is always loaded on all pages regardless of whether or not they
 *  include page specific JavaScript. It should add as little overhead to page
 *  changes as possible. It should be used only for initializing page specific
 *  JavaScript and handling any tasks that need to be done on EVERY page change.
/*/


window.Bugtracker = {
    Classes: {},
    Views: {
        Bugs: {},
        Projects: {},
        Users: {},
        Sessions: {},
    },

    initialize: function() {
        this.addPageChangeListeners();
    },

    addPageChangeListeners: function() {
        var that = this;

        $(document).on('ready page:before-change', function() {
            that.pageWillChange();
        });
        $(window).on('load page:load', function() {
            that.pageDidChange();
        });
    },

    pageWillChange: function() {
        
    },

    pageDidChange: function() {
        this.loadView();
    },

    loadView: function() {
        var classes = $('body').prop('class').split(" ");
        var view = Bugtracker.Views[classes[0].capitalize()][classes[1].capitalize()];
        if (view) {
            new view();
        }
    },
};


$(function() {
    Bugtracker.initialize();
});