/**
 * Created by r-1 on 04/03/2016.
 */
function City(city) {

    this.city = city || {};
    this.coord = city.coord || {};
    this.country = city.country || null;
    this.sys = city.sys || {};
    this.sunRise = this.sys.sunrise;
    this.sunSet = this.sys.sunset;
    this.weather = city.weather || [];
    this.main = city.main || {};
    this.temp = this.main.temp;
    this.humidity = this.main.humidity;
    this.pressure = this.main.pressure;
    this.min = this.main.temp_min;
    this.max = this.main.temp_max;
    this.wind = city.wind || {};
    this.windSpeed = this.wind.speed;
    this.winDeg = this.wind.deg;
    this.rain = city.rain;
    this.clouds = city.clouds;
    this.dt = city.dt;
    this.id = city.id;
    this.name = city.name;
    this.cod = city.cod;
//    this.icon = this.weather[0].icon||'';
    this.list = city.list || [];
}

/*City.prototype.hydrate = function (data) {
 Object.keys(data).forEach(
 // Execute a function passing param this as obj that return a function
 // (closure)
 (function (obj) {
 return function (key) {
 var method = 'set'+premiere(key);
 //              console.log(method);
 if (typeof method !== 'undefined'){
 console.log(method);
 }
 };
 })(this)
 );
 };*/

City.prototype.setName = function (data) {
    this.name = data.name;
    return this;
};

City.prototype.getName = function () {
    return this.name;
};
City.prototype.setDt = function (data) {
    this.dt = data.dt;
    return this;
};

City.prototype.getDt = function () {
    if (this.dt) {
        var date = new Date(this.dt * 1000);
        this.dt = date.getHours() + 'h' + date.getMinutes() + 'min';
    }
    else {
        this.dt = 'unknown';
    }
    return this.dt;
};
City.prototype.setSunRise = function (data) {
    this.sunRise = data.sys.sunrise;
    return this;
};
City.prototype.getSunRise = function () {
    if (this.sunRise) {
        var date = new Date(this.sunRise * 1000);
        this.sunRise = date.getHours() + 'h' + date.getMinutes() + 'min';
    }
    else {
        this.sunRise = 'unknown';
    }
    return this.sunRise;
};

City.prototype.setSunSet = function (data) {
    this.sunSet = data.sys.sunset;
    return this;
};

City.prototype.getSunSet = function () {
    if (this.sunSet) {
        var date = new Date(this.sunSet * 1000);
        this.sunSet = date.getHours() + 'h' + date.getMinutes() + 'min';
    }
    else {
        this.sunSet = 'unknown';
    }
    return this.sunSet;
};

City.prototype.setHumidity = function (data) {
    this.humidity = data.main.humidity;
    return this.humidity;
};

City.prototype.getHumidity = function () {
    return this.humidity;
};
City.prototype.setPressure = function (data) {
    this.pressure = data.main.pressure;
    return this;
};

City.prototype.getPressure = function () {
    return this.pressure;
};
City.prototype.setWind = function (data) {
    this.windSpeed = data.wind.speed;
    return this;
};

City.prototype.getWind = function () {
    return (this.windSpeed * 3600 / 1000).toFixed(2);
};
City.prototype.setIcon = function (data) {
    this.icon = data.weather[0].icon;
    return this;
};

City.prototype.getIcon = function () {
    return this.icon;
};

City.prototype.setTemp = function (data) {
    this.temp = data.main.temp;
    return this;
};

City.prototype.getTemp = function () {
    return this.temp;
};

City.prototype.getList = function(){
    return this.list;
}


function premiere(chaine) {
    return chaine.substr(0, 1).toUpperCase() + chaine.substr(1, chaine.length);
}
