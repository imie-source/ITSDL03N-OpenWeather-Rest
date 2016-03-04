$(function () {


    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        var city = $('#textSearch').val();
        var weather = 'weather';
        var forecast = 'forecast/daily';
        var url = 'http://api.openweathermap.org/data/2.5/';
        var dataWeather = {
            q: city,
            appid: '44db6a862fba0b067b1930da0d769e98',
            units: 'metric'
        };
        var dataForecast = {
            q: city,
            appid: '44db6a862fba0b067b1930da0d769e98',
            units: 'metric',
            cnt:5
        };
        $.ajax({
            type: 'GET',
            url: url+weather,
            data: dataWeather,
            dataType: 'json',
            success: weatherSuccess,
            error: function () {
                alert('impossible de se connecter')
            }
        });
        $.ajax({
            type: 'GET',
            url: url+forecast,
            data: dataForecast,
            dataType: 'json',
            success: prevSuccess,
            fail: function () {
                alert('Impossible de se connecter au serveur.')
            }
        });

        function weatherSuccess(data) {
            if (data.cod != 403 || data.cod != 404) {
                var city = new City(data);
                $('#dt').text(city.getDt());
                $('#sunset').text(city.getSunSet());
                $('#sunrise').text(city.getSunRise());
                $('#temp').text(city.getTemp());
                $('#pressure').text(city.getPressure());
                $('#humidity').text(city.getHumidity());
                $('#windSpeed').text(city.getWind());
                $('#cityTitle').text(city.getName());

                //image
                $('#map').attr('src','https://maps.googleapis.com/maps/api/staticmap?center='+city.coord.lat+','+city.coord.lon+'&zoom=13&size=320x200&path=weight:3%7Ccolor:blue%7Cenc:aofcFz_bhVJ[n@ZpAp@t@b@uA`FuAzEoCdJiDpLs@VM@y@s@oBcBkAw@cCoAuBu@eEaAiAa@iAi@w@a@o@g@g@k@e@u@uAaCc@i@w@y@eAo@i@UaBc@kAGo@@]JyKA}EC{G?q@?IGKCeGA{CAyCAyEAwEBaFAkJ?yGEyAIiLAiB?{@BcBJ}@@aBGwBEo@A@j@BjBFTHjEl@fOD`C?|@RARAJERWPL@FE^S`AI`A&key=AIzaSyA4rAT0fdTZLNkJ5o0uaAwZ89vVPQpr_Kc')
                $('#imgWeather').attr(
                    'src', './public/images/' + city.weather[0].icon + '.png',
                    'alt', city.weather[0].description);

                $('#result').show();
            }
            else {
                $('#result').show();
                alert('Pas de ville');
                //               $('#alert').show().text('Aucune ville avec le nom : ' + $('#inputSearch').val());
            }
        }

        function prevSuccess(data) {
            if(data.cod != 404){

                // prevision container
                var dayInfo = $('<div>')
                    .addClass('thumbnail')
                    .append($('<div>').addClass('caption').append($('<h3>')))
                    .append('<img>');

                var dayContainer = $('<div>')
                    .addClass('col-md-2')
                    .append(dayInfo);

                var previsionInfo = $('#forecastInfo');
                previsionInfo.empty().append(dayContainer);

                var city = new City(data);

                var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

                var d = new Date();
                var today = d.getDay();

                $.each(city.getList(), function(ii){

                    if(ii){
                        var next = dayContainer.clone();
                        previsionInfo.append(next);
                        dayContainer = next;
                    }

                    dayContainer.find('img').attr('src', './public/images/' + this.weather[0].icon + '.png');
                    dayContainer.find('.caption').children().text(days[(today+1+ii)%7]);
                });
                $('#forecast').show();
            }
            else{
                $('#forecast').hide();

            }
        }
    });
// keyPress event - Autocompletion
    $('#textSearch').keyup( function(){
        var search = $('#textSearch').val();
        if(search.length >= 3){
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/find?q='+ search +'&appid=44db6a862fba0b067b1930da0d769e98&type=like&cnt=100',
                type: 'GET',
                datatype: 'json',
                success: function(res){
                    console.log(res);
                    var data = new DataSet(res);
                    autocompletion = data.getCitiesName() || [];
                    $('#textSearch').autocomplete({
                        source: autocompletion
                    });
                },
                error: function () {
                    alert('impossible autocomplet')
                }
            });
        }/*
        else if (search.length >= 4){
            autocompletion.filter(function(city){
                // regexp to filter
                var reg = new RegExp('^' + search + '\\w*');

                return city.match(reg);
            });
        }*/
    });

});