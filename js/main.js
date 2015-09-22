(function () {
    audiojs.events.ready(function () {
        var as = document.getElementsByClassName('Track-data');
        audiojs.createAll({}, as);

        var voces = document.getElementById('voces');

        var v = audiojs.create(voces, {
            trackEnded: function () {
                var next = $ ( 'ol.VocesList li.playing' ).next ();
                if ( !next.length ) next = $ ( 'ol.VocesList li' ).first ();
                next.addClass ( 'playing' ).siblings ().removeClass ( 'playing' );
                voces.load ( $ ( 'a', next ).attr ( 'data-src' ) );
                voces.play ();
            }
        });
        // Load in the first track

        var voces = v;
        first = $('ol.VocesList a').attr('data-src');
        $('ol.VocesList li').first().addClass('playing');
        voces.load(first);

        // Load in a track on click
        $('ol.VocesList li').click(function(e) {
            e.preventDefault();
            $(this).addClass('playing').siblings().removeClass('playing');
            voces.load($('a', this).attr('data-src'));
            voces.play();
        });
        // Keyboard shortcuts
        $(document).keydown(function(e) {
            var unicode = e.charCode ? e.charCode : e.keyCode;
            // right arrow
            if (unicode == 39) {
                var next = $('li.playing').next();
                if (!next.length) next = $('ol li').first();
                next.click();
                // back arrow
            } else if (unicode == 37) {
                var prev = $('li.playing').prev();
                if (!prev.length) prev = $('ol li').last();
                prev.click();
                // spacebar
            } else if (unicode == 32) {
                voces.playPause();
            }
        })
    })
})();