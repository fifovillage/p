var h = window.innerHeight * .5
var w = window.innerWidth * .5
var data = [50, 70, 80, 90, 120]
var names = ['sample 1', 'sample 2', 'sample 3', 'sample 4 ', 'sample 5']
var r = h/2
var colorScale = d3.scale.ordinal()
  .range(['rgb(102,102,204)', 'rgb(128,89,179)', 'rgb(153,77,153)', 'rgb(179,64,128)', 'rgb(204,51,102)'])


if(h>w){w=w*2}

var svg = d3.select('.chart')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

function draw() {
  d3.selectAll(".arc").remove();

  var sample1 = document.getElementById('sample1').value;
  var sample2 = document.getElementById('sample2').value;
  var sample3 = document.getElementById('sample3').value;
  var sample4 = document.getElementById('sample4').value;
  var sample5 = document.getElementById('sample5').value;

  var data = [sample1, sample2, sample3, sample4, sample5];

  var group = svg.append('g')
    .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')


  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r)


  var pie = d3.layout.pie()
    .value(function(d) {
      return d
    })


  var arcs = group.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')


  arcs.append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return colorScale(d.data)
    })


  arcs.append('text')
    .attr('transform', function(d) {
      return 'translate(' + arc.centroid(d) + ')'
    }) //arc centroid gives the center of the arc, used here to center text on each piece
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .style('font', '14px')
    .html(function(d, i) {
      return d.data
    })
  }

setTimeout(draw, 800)
