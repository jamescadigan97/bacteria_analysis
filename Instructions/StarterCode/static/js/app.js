//Read Json file
    url = "../data/samples.json"

    d3.json(url).then(function(data) {
        console.log(data);
    });

    const dataPromise = d3.json(url);
