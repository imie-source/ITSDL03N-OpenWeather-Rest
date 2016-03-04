/**
 * Created by r-1 on 04/03/2016.
 */

function DataSet(data){
    this.data = data || [];
    this.cities = [];
    for(var i in this.data.list){
        this.cities.push(new City(this.data.list[i]));
    }
}

DataSet.prototype.getCities = function(){
    return this.cities;
};
// Return cities names in array
DataSet.prototype.getCitiesName = function(){
    var names = [];

    for (var i in this.cities){
        names.push(this.cities[i].getName());
    }
    return names;
};
