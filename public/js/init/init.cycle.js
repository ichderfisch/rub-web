$(document).ready(function() {
     $(function() {
        $('#rub-slider_inner').cycle({
            fx:     'fade',
            speed:   2000,
                    timeout: 10000,
            slideExpr: 'div.rub-slider-thema',
            next:   '#next',
            prev:   '#prev',
            after:  onAfter
      });
    });

    function onAfter(curr,next,opts) {
            var caption = (opts.currSlide + 1) + ' / ' + opts.slideCount;
            $('#caption').html(caption);
    }

    $('#play').hide();

    $(function() {
        $('#pause').click(function() {
            $('#pause').hide();
            $('#play').show();
            $('#rub-slider_inner').cycle('pause');
        });
    });

    $(function() {
        $('#play').click(function() {
            $('#play').hide();
            $('#pause').show();
            $('#rub-slider_inner').cycle('resume',true);
        });
    });

});

$(document).ready(function(){
  $('#rub-slider_control').show();
  $('#rub-slider_outer').show();
});
