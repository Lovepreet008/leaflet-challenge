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
    // let earthquakeArray=[];
    

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
        
        // earthquakeArray.push(earthquake);
    

    
    }
    // createMap(L.layerGroup(earthquakeArray));
   
});
// //  Create a legend to display information about our map.
// let info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend".
// info.onAdd = function() {

//     let div = L.DomUtil.create("div", "legend");
//     categories=["-10-10", "10-30", "30-50", "50-70" , "70-90", "90+" ];
//     colors=["green", "#ADFF2F", "yellow", "orange", "brown", "red"  ];
//     div.innerHTML = legendInfo;
//     div.innerHTML = colors.join('<br');
//     // const legendContainer = document.querySelector('.legend');

//     // // Create legend data with colors and values
//     // const legendData = [
//     //     { color: "green", value: "-10-10" },
//     //     { color: "#ADFF2F", value: "10-30" },
//     //     { color: "yellow", value: "30-50" },
//     //     { color: "orange", value: "50-70" },
//     //     { color: "brown", value: "70-90" },
//     //     { color: "red", value: "90+" },
//     // ];

//     // legendData.forEach(item => {
//     //     const listItem = document.createElement('div');
//     //     listItem.classList.add('legend-item');

//     //     const colorBox = document.createElement('span');
//     //     colorBox.classList.add('legend-color');
//     //     colorBox.style.backgroundColor = item.color;

//     //     const valueText = document.createElement('span');
//     //     valueText.textContent = item.value;

//     //     listItem.appendChild(colorBox);
//     //     listItem.appendChild(valueText);

//     //     legendContainer.appendChild(listItem);
//     // });
//     return div;
// };
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


// Call the function to add the legend when the map is ready
// myMap.on('load', addLegend);




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
function createMap(earthquake){


    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    //create base layer
    let baseMaps={
        "Street Maps": streetmap
    };

    // Create overlay layer
    let overlayMaps= {
        "Earthquakes": earthquake
    };


    // Create a map object
    let myMap=L.map("map",{
        center:[39.09, -112.71],
        zoom: 5,
        layers:[streetmap, earthquake]
    });
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);




};





