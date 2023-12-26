// Api link 
let geoJson="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(geoJson).then (function (data){
    console.log(data);
    let earthquakeData= data;

    

    


    
});

function createMap(earthquake){


    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
    //create base layer
    let baseMaps={
        "Street Maps": streetmap
    }

    // Create overlay layer
    let overlayMaps= {
        "Earthquakes": earthquake
    }


    // Create a map object
    let myMap=l.map("map",{
        center:[37.09, -99.71],
        zoom: 7
    })


};





