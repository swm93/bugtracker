$(document).ready(function() {
    var $commentButtons = $('.cell-bug-comment');

    $commentButtons.popover({
        container: 'body',
        title: 'Comment',
        placement: 'left',
        trigger: 'click',
    });

    $commentButtons.on('shown.bs.popover', function() {
        $($commentButtons.not($(this))).popover('hide');
    });
});