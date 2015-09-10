var margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
}

var w = 960 - margin.left - margin.right
var h = 500 - margin.top - margin.bottom

var xPos = d3.scale.ordinal()
  .rangeRoundBands([0, w], .1);

var yPos = d3.scale.linear()
  .range([h, 0]);

var xAxis = d3.svg.axis()
  .scale(xPos)
  .orient("bottom")

var yAxis = d3.svg.axis()
  .scale(yPos)
  .orient("left")
  .ticks(10, "%")

var canvas = d3.select("body").append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


d3.tsv("chartdata.tsv", type, function(error, data) {

  xPos.domain(data.map(function(d) {
    return d.letter
  }))
  yPos.domain([0, d3.max(data, function(d) {
    return d.frequency
  })])


  canvas.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h + 5) + " )")
    .call(xAxis)

  canvas.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency")


  bars = canvas.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("id", function(d, i) {
      return "rId_" + i
    })
    .attr("fill", "steelblue")
    .attr("x", function(d) {
      return xPos(d.letter)
    })
    .attr("y", function(d) {
      return yPos(d.frequency)
    })
    .attr("height", function(d) {
      return h - yPos(d.frequency)
    })
    .attr("width", xPos.rangeBand())



  bars.on("mouseenter", function() {
    d3.select(this).attr("fill", "brown")
  })

  bars.on("mouseleave", function() {
    d3.select(this).attr("fill", "steelblue")
  })


  bars.on("click", upAndDown)


  function upAndDown() {
    var height = d3.select(this).attr("height")
    var currentId = d3.select(this).attr("id")
    if (currentId.match("up")) {
      d3.select(this).transition().duration(1000)
        .attr("height", height * 20)
        .attr("id", currentId.replace("up", ""))

    } else if (height > 30) {
      d3.select(this).transition().duration(1000)
        .attr("height", height * 0.05)
        .attr("id", currentId + "up")
    }
  }
})



function type(d) {
  d.frequency = +d.frequency;
  return d;
}
