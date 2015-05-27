var valid_name = function(s) {
    return s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

var build_person = function(data, name) {
    var person = d3.select("div")
        .append("div")
        .attr("class", "six columns offset-by-one");

    person.append("h2").text(name);

    var diventer = person.selectAll("div").data(data)
        .enter().append("div")
        .attr("class", "file")
        .attr("id", function(d) {
            return valid_name(d.title);
        });

    diventer
        .append("h3")
        .text(function(d) {
            if (d.year !== "") {
                return d.title + " (" + d.year + ")";
            } else {
                return d.title;
            }
        });
    diventer
        .filter(function(d) {
            return d.subtitle !== "";
        })
        .append("h4")
        .text(function(d) {
            return d.subtitle;
        });
    diventer
        .filter(function(d) {
            return d.description !== "";
        })
        .append("p")
        .text(function(d) {
            return d.description;
        });
    var filesgroup = diventer
        .append("ul");

    filesgroup.selectAll("ul")
        .data(function(d) {
            return d.files;
        })
        .enter()
        .append("li")
        .append("a")
        .attr("href", function(d) {
            return d.path;
        })
        .attr("target", "_blank")
        .text(function(d) {
            return d.name;
        });
    diventer
        .filter(function(d) {
            return d.quote !== "";
        })
        .append("blockquote")
        .text(function(d) {
            return d.quote;
        });
}

d3.json("joseph_hoppers.json", function(d) {
    var data = d;
    var jh = data["Joseph Hopper"]["files"];
    var jbh = data["Joseph Barron Hopper"]["files"];


    build_person(jh, "Joseph Hopper")
    build_person(jbh, "Joseph Barron Hopper")

    // p = person.selectAll("div")
    //     .data()
    //     .enter()
    //     .append("div").attr("class", "file");
    // // Title
    // p = p.selectAll("div").data(data["Joseph Hopper"]["files"]);
    // p.enter().append("h3")
    //     .text(function(d) { return(d.title); });

    // p.enter().append("h4").text(function(d) { return(d.subtitle); });
});