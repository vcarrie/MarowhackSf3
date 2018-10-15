$(document).ready(function () {
    $('#start-race').on('click', function () {
        timer();
    });

    function myMove() {
        var elem = $("#animation");
        var elem1 = $("#animation1");
        var elem2 = $("#animation2");
        var pos = 900;
        var pos1 = 900;
        var pos2 = 900;
        var id = setInterval(frame, 10);

        function frame() {
            if (pos < 0) {
                elem.css({
                    left: 900 + "px"
                });
                pos = 900;
            } else {
                pos -= 3;
                elem.css({
                    left: pos + "px"
                });
            }
            if (pos1 < 0) {
                elem1.css({
                    left: 900 + "px"
                });
                pos1 = 900;
            } else {
                pos1 -= 2;
                elem1.css({
                    left: pos1 + "px"
                });;
            }
            if (pos2 < 0) {
                elem2.css({
                    left: 900 + "px"
                });;
                pos2 = 900;
            } else {
                pos2 -= 1;
                elem2.css({
                    left: pos2 + "px"
                });;
            }
        }
    }

    var seconds_left = 4;

    function timer() {
        var interval = setInterval(function () {
            document.getElementById('timer_div').innerHTML = --seconds_left;

            if (seconds_left <= 0) {
                document.getElementById('timer_div').innerHTML = "Gooooo!";
                clearInterval(interval);
                myMove()
            }
        }, 1000);
    }
});