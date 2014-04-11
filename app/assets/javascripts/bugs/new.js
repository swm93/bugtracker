Bugtracker.Views.Bugs.New = function() {
    var assigneeDropdown = new Bugtracker.Classes.AssigneeSelect2Dropdown($('#field-bug-assignee'));
};


Bugtracker.Classes.AssigneeSelect2Dropdown = function($el, options) {
    this.$el = $el;
    this.template = HandlebarsTemplates['bugs/new/assignee_dropdown'];

    this.initialize(options);
};

Bugtracker.Classes.AssigneeSelect2Dropdown.prototype.initialize = function(options) {
    this.$el.select2({
        placeholder: "Assignee",
        minimumInputLength: 3,
        allowClear: true,
        openOnEnter: false,
        ajax: {
            url: window.location.origin + "/users.json",
            dataType: 'json',
            quietMillis: 100,
            data: function(term, page, context) { // page is the one-based page number tracked by Select2
                return {
                    name: term, //search term
                    page_limit: 10, // page size
                    page: page, // page number
                };
            },
            results: function(data, page, context) {
                return {
                    results: data,
                    text: 'name',
                    more: (page * 10) < data.total, // whether or not there are more results available
                };
            }
        },
        formatResult: this.template, // omitted for brevity, see the source of this page
        formatSelection: this.template, // omitted for brevity, see the source of this page
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function(m) {
            return m;
        } // we do not want to escape markup since we are displaying html in results
    });
};