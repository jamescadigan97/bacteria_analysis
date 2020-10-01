//Read Json file
url = "../data/samples.json"
d3.json(url).then(function(data) {
    // Show Data
    console.log("Full Data")
    console.log(data)

    var data_bar = data
    var data_metadata = data
    var data_bubble = data

    //Create the select menu
    //Iterate over data.names
    data.names.forEach(function(d){
    //Append the select options for each Name 
        d3.select("#selDataset").append('option').text(d)
        .attr("values",d) 
        })

    //Create initial bar char
    var bar_samples = Object.values(data_bar.samples)

    //Show sample array
    console.log("Sample Values:")
    console.log(bar_samples)


    //Grab x and y values
    var initx = []
    var bar_labels= bar_samples[0].otu_ids.splice(0,10)
        for (var i = 0; i <bar_labels.length; i++) {
            initx.push(`OTU ${bar_samples[0].otu_ids[i]}`)
        }

    var inity = bar_samples[0].sample_values.splice(0,10)
    
    console.log("Initial Barchart X and Y Values")
    console.log(initx)
    console.log(inity)
    
    var trace1 = {
        x: inity,
        y: initx,
        type: "bar",
        orientation: 'h',
    };
      
    var data_trace = [trace1];
      
    var layout = {
        xaxis: {
            title:"Sample Values",
            ticktext: initx
        },
        yaxis: {
            title: 'OTU IDS',
            }

    };
      
    Plotly.newPlot("bar", data_trace, layout);

//Metadata
    
    var metadata = Object.values(data_metadata.metadata)
    console.log("Metadata array for initial case:")
    console.log(metadata[0])

    //Add data to table
    d3.select("#sample-metadata").append("g")
    .text(`id: ${metadata[0].id}`)
    d3.select("#sample-metadata").append("br")  

    d3.select("#sample-metadata").append("g")
    .text(`ethnicity: ${metadata[0].ethnicity}`) 
    d3.select("#sample-metadata").append("br")  

    d3.select("#sample-metadata").append("g")
    .text(`gender: ${metadata[0].gender}`)
    d3.select("#sample-metadata").append("br")  

    d3.select("#sample-metadata").append("g")
    .text(`age: ${metadata[0].age}`)
    d3.select("#sample-metadata").append("br")  

    d3.select("#sample-metadata").append("g").text(`location: ${metadata[0].location}`)
    d3.select("#sample-metadata").append("br")  

    d3.select("#sample-metadata").append("g")
    .text(`wfreq: ${metadata[0].wfreq}`)
    d3.select("#sample-metadata").append("br")  

    //Create initial bubble chart
    var bubble_samples = Object.values(data_bubble.samples)

    console.log("Sample Array values for Initial Bubble chart:")
    console.log(bubble_samples)
    
    //Create Trace for Bubble Chart
    var trace1 = {
        x: bubble_samples[0].otu_ids,
        y: bubble_samples[0].sample_values,
        text: bubble_samples[0].otu_labels,
        mode: 'markers',
        marker: {
        color: bubble_samples[0].otu_ids,
        colorscale: 'Jet',
        size: bubble_samples[0].sample_values,
        sizeref: 0.1,
        sizemode: 'area'
        }
    };
  
    console.log("Show values for initial bubble chart")
    console.log(bubble_samples[0].otu_ids)
    console.log(bubble_samples[0].sample_values)
    console.log(bubble_samples[0].otu_labels)

    //Create data and layout variables
    var bubble_data = [trace1];
  
    var layout = {
        showlegend: false,
        height: 500,
        width: 500,
        xaxis: {
            title:"OTU IDs"
        },
        yaxis: {
            title: 'Sample Values',
            }
    };
    //Plot
    Plotly.newPlot('bubble', bubble_data, layout);

// Ending for read data function
});

function optionChanged() {
    d3.json(url).then(function(data) {
        // Show Data
        console.log(data)

        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");

        // Assign the value of the dropdown menu option to a variable
        var data_value = dropdownMenu.property("value");
        
        //Show value
        console.log("Input Value")
        console.log(data_value)
        //Find the array of Sample
        var samples = Object.values(data.samples)

        //Find the key of person in question by the index
        var target_sample = samples.findIndex(function(samples) {
            return samples.id == data_value
        })

        //Show index of target sample
        console.log("New Index")
        console.log(target_sample)

        //Create a variable for the array of the sample selected
        var sample_array = samples[target_sample]

        //Show target sample
        console.log("Target Sample")
        console.log(sample_array)

        //Initialize x and y
        var newX = [];
        var newY = [];

        //Grab new x and y values
        var new_labels= sample_array.otu_ids.splice(0,10)
        for (var i = 0; i <new_labels.length; i++) {
            newX.push(`OTU ${new_labels[i]}`)
        }
        var newY = sample_array.sample_values.splice(0,10)

        //Show Updated X and Y values in console
        console.log("Update Bar chart values")
        console.log(newX)
        console.log(newY)

        //Restyle chart
        Plotly.restyle("bar", "x", [newY]);
        Plotly.restyle("bar", "y", [newX]);

        //Start bubble chart
        //Grab new x and y values
        x = [sample_array.otu_ids]
        y = [sample_array.sample_values]

        //Show Updated X and Y values in console
        console.log("Updated Bubble Chart Values")
        console.log(x)
        console.log(y)

        //Restyle chart
        Plotly.restyle("bubble", "x", x);
        Plotly.restyle("bubble", "y", y);
        Plotly.restyle("bubble", "text", x);
        Plotly.restyle("bubble", "color", y);
        Plotly.restyle("bubble", "size", x);
        Plotly.restyle("bubble", "colorscale", 'Jet');


    var metadata = Object.values(data.metadata)
        //Show metadata for target sample
        console.log("Target data metadata")
        console.log(metadata[target_sample])

        //Remove previous data
        d3.select("#sample-metadata").selectAll("g").remove().exit()
        d3.select("#sample-metadata").selectAll("br").remove().exit()

        //Add new data
        d3.select("#sample-metadata").append("g").text(`id: ${metadata[target_sample].id}`)
        d3.select("#sample-metadata").append("br")  

        d3.select("#sample-metadata").append("g").text(`ethnicity: ${metadata[target_sample].ethnicity}`) 
        d3.select("#sample-metadata").append("br")  

        d3.select("#sample-metadata").append("g").text(`gender: ${metadata[target_sample].gender}`)
        d3.select("#sample-metadata").append("br")  

        d3.select("#sample-metadata").append("g").text(`age: ${metadata[target_sample].age}`)
        d3.select("#sample-metadata").append("br")  

        d3.select("#sample-metadata").append("g").text(`location: ${metadata[target_sample].location}`)
        d3.select("#sample-metadata").append("br")  

        d3.select("#sample-metadata").append("g").text(`wfreq: ${metadata[target_sample].wfreq}`)
        d3.select("#sample-metadata").append("br") 

    })
}
