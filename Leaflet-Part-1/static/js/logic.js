// Api link 
let geoJson="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a map object
let myMap=L.map("map",{
    center:[39.09, -112.71],
    zoom: 5,
    fadeAnimation: false,
   
});


// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    className: 'bw',    
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
}).addTo(myMap);


 

d3.json(geoJson).then (function (data){
    console.log(data);
    let Info= data.features;
    
    

    for (let i=0; i<Info.length; i++){
        let coordinates=Info[i].geometry.coordinates;
        let earthquake= L.circle([coordinates[1], coordinates[0]],{
            
            color: "black",
            fillColor: chooseColor(coordinates[2]),
            fillOpacity: 0.75,
            radius: markerSize(Info[i].properties.mag),
            weight: 0.8,
            

        }).addTo(myMap);
        earthquake.bindPopup(`<h1> Place: ${Info[i].properties.place} </h1><hr><h3>Magnitude: ${Info[i].properties.mag}</h3><hr><h3>Time: ${Date(Info[i].properties.time) }`);
        
        
    

    
    }
    
   
});




 // Create legend data with colors and values
const legendData = [
    { color: "green", label: "-10-10" },
    { color: "#ADFF2F", label: "10-30" },
    { color: "yellow", label: "30-50" },
    { color: "orange", label: "50-70" },
    { color: "brown", label: "70-90" },
    { color: "red", label: "90+" }
];

// function addLegend() {
const legend = L.control({ position: 'bottomright' }); // Set legend position

legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'legend');
    let legendContent = '';

    // Loop through the legend data and create HTML elements
    legendData.forEach(item => {
        legendContent += `<div><span class="legend-color" style="background-color:${item.color};"></span> ${item.label}</div>`;
    });

    div.innerHTML = legendContent;
    console.log(div);
    return div;
    
};

legend.addTo(myMap); // Add the legend to your Leaflet map (replace myMap with your map variable)




// A function to determine the marker size based on the depth
function markerSize(mag) {
    // console.log(mag* mag*10) ;
    return (mag *10000) ;
  };




function chooseColor(depth){
    // console.log(depth);
    if (depth > -10 && depth < 10){
        return "green";
    }
    else if (depth >= 10 && depth < 30){
        return "#ADFF2F";
    }
    else if (depth >= 30 && depth < 50){
        return "yellow";
    }
    else if (depth >= 50 && depth < 70){
        return "orange";
    }
    else if (depth >= 70 && depth < 90){
        return "brown";
    }
    else {
        return "red";
    }

    
};






