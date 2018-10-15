(function($) {
    $.fn.agrandirPoliceAuSurvol = function(param) {
        this.each(function() {
            $(this).mouseover(function() {
                $(this).stop().animate({width: '+=10px'}, 200);
            });
        });
        return this;
    };
})(jQuery);

$(document).ready(function(){

    $('img').agrandirPoliceAuSurvol();

});