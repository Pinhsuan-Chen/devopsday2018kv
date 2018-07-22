var init = function () {
    // scroll menu
    var $window = $(window);
    var $menu = $('#menu');
    var checkHasElm = function (arrID) {
        var $detect = false;
        for (var i = arrID.length - 1; i >= 0; i--) {
            if ($(arrID[i]).length > 0) {
                $detect = $(arrID[i]);
                break;
            }
        }
        return $detect;
    };

    var $menu_target = (function () {
        return checkHasElm([
            '#kv'
        ]);
    }());

    var $buy_target = (function () {
        return checkHasElm([
            '#speakers',
            '#policy',
            '#sessions'
        ]);
    }());

    var $buy_ticket_btn = $('#buy_ticket');
    var timer;
    $window.scroll(function () {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function () {
            $menu.toggleClass('menu--scroll', $window.scrollTop() >= $menu_target.offset().top);
            $buy_target && $buy_ticket_btn.toggleClass('active', $window.scrollTop() >= $buy_target.offset().top);
        }, 200);
    });

    // mobile
    $(".menu__burger, .menu__mask").on('click', function () {
        $('.menu__burger').toggleClass('on');
        $('.menu__content').toggleClass('on');
        $('.menu').toggleClass('on');
        $('body').toggleClass('is-hidden');
    });

    // scroll
    $('#menu a[href^="#"]:not([href="#"]), #buy_ticket,.agenda-day-switch a').click(function () {
        var target = '#' + $(this).attr('href').split('#')[1];
        goScroll(target);
        return false;
    });

    function goScroll(target) {
        var target_top = $(target).offset().top;
        var header_height = ($('html').width() <= 768) ? 0 : $('#menu').height();
        var sTop = target_top - header_height;

        $('html, body').stop().animate({
            scrollTop: sTop
        }, 1000);
    }

    location.hash && goScroll(location.hash);

    $('#speaker_modal').on('shown.bs.modal', function () {
        if ($('#speaker_modal').hasScrollBar()) {
            $('#speaker_modal').css('padding-right', '0px');
        }
    })

    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }



    // 2017.07.07 = 1499356800647
    // var TimeDiff = (1499356800647 - +new Date());
    // var is201707070000 = TimeDiff > 0 ? TimeDiff : 4;
    // var openTicket = function openTicket() {
    //     $('#ticket_earlyBird').html('<a href="#" class="btn ticket__button disabled">截止購票</a>');
    //     $('#ticket_discount').html('<a href="https://ec.ithome.com.tw/modernweb2017/class?p=20170040" class="btn ticket__button">立即購票</a>');
    //     $('#ticket_peers').html('<a href="http://s.itho.me/modernweb/2017/Modern_Web_2017_group_application_%20form.xlsx" class="btn ticket__button">立即購票</a>');
    // }

    // setTimeout(openTicket, TimeDiff);


};