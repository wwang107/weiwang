$(document).ready(function() {

    // Variables
    var $nav = $('.navbar'),
        $body = $('body'),
        $window = $(window),
        $flask = $('#flask'),
        navOffsetTop = $nav.offset().top;

    function init() {
        $window.on('scroll', onScroll);
        $window.on('resize', resize);
        $('a[href^="#"]').on('click', smoothScroll);
    }

    function smoothScroll(e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash,
            menu = target;
        var $target = $(target);

        // log nav click
        $.ajax({
            type: "GET",
            url: "/nav?n=" + target.substring(1, target.length)
        });

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 10, 'swing', function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    }

    function resize() {
        $body.removeClass('has-docked-nav');
        navOffsetTop = $nav.offset().top;
        onScroll();
    }

    function onScroll() {
        // Navbar docking
        if(navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
            $body.addClass('has-docked-nav');
        }
        if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
            $body.removeClass('has-docked-nav');
        }
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }
    
    init();

});