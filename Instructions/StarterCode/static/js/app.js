//Read Json file
    url = "../data/samples.json"
    out_ids_list = []

    d3.json(url).then(function(data) {
        console.log(data)

        console.log(data.names)
    d3.select("#selDataset")
        .data(data.names)
        .enter()
        .append("option")
        .text((function (d) {return d.names})
        .attr("value", function (d) {return d.names})      
//For data function
    });