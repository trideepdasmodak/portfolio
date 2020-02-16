jQuery(function($) {
    'use strict';
    $(window).ready(function() {
        $('#pre-status').fadeOut();
        $('#tt-preloader').delay(350).fadeOut('slow');
    });
    (function() {
        $('a[href*=#]').bind("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
    }());
    (function() {
        $(".tt-fullHeight").height($(window).height());
        $(window).resize(function() {
            $(".tt-fullHeight").height($(window).height());
        });
    }());
    (function() {
        $('.header').sticky({
            topSpacing: 0
        });
        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 70
        })
    }());
    (function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());
    $('.count-wrap').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function() {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    $('.skill-progress').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function() {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });
    $('.more-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                easing: 'easeOut',
                delay: 3000,
                barColor: '#68c3a3',
                trackColor: 'rgba(255,255,255,0.2)',
                scaleColor: false,
                lineWidth: 8,
                size: 140,
                animate: 2000,
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }
            });
            $(this).unbind('inview');
        }
    });
    (function() {
        var $grid = $('#grid');
        $grid.shuffle({
            itemSelector: '.portfolio-item'
        });
        $('#filter a').click(function(e) {
            e.preventDefault();
            $('#filter a').removeClass('active');
            $(this).addClass('active');
            var groupName = $(this).attr('data-group');
            $grid.shuffle('shuffle', groupName);
        });
    }());
    (function() {
        $('.image-link').magnificPopup({
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            type: 'image'
        });
    }());
    (function() {
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-with-zoom',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    }());
    (function() {
        $(".video-container").fitVids();
    }());
    $(window).load(function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }
    });
    (function() {
        new WOW({
            mobile: false
        }).init();
    }());
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var $action = $(this).prop('action');
        var $data = $(this).serialize();
        var $this = $(this);
        $this.prevAll('.alert').remove();
        $.post($action, $data, function(data) {
            if (data.response == 'error') {
                $this.before('<div class="alert alert-danger">' + data.message + '</div>');
            }
            if (data.response == 'success') {
                $this.before('<div class="alert alert-success">' + data.message + '</div>');
                $this.find('input, textarea').val('');
            }
        }, "json");
    });
    (function() {
        var myLatlng = new google.maps.LatLng(22.5913, 88.4234);
        var styles = [{
            featureType: "landscape",
            stylers: [{
                color: '#f7f7f7'
            }]
        }, {
            featureType: "natural",
            stylers: [{
                hue: '#00ffe6'
            }]
        }, {
            featureType: "road",
            stylers: [{
                hue: '#fff'
            }, {
                saturation: -70
            }]
        }, {
            featureType: "building",
            elementType: "labels",
            stylers: [{
                hue: ''
            }]
        }, {
            featureType: "poi",
            stylers: [{
                hue: ''
            }]
        }];
        var mapOptions = {
            zoom: 15,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: styles
        }
        var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });
        var contentString = '' +
            '' +
            '';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }());
});