var h = window.innerHeight * .6
var w = window.innerWidth * .5



var svg = d3.select('body').append('svg')
  .attr('width', w)
  .attr('height', h)
  .style('background','rgba(150,150,150,.1)')
  .style('border', '1px solid black')
  .append('g')
  .attr('transform', 'translate(' + w/5 + ', 0) scale(.8,.8)')


var tree = d3.layout.tree()
  .size([600,500])

d3.json('treeData.json', function(data) {

  var nodes = tree.nodes(data)
  console.log(nodes)

  var links = tree.links(nodes)
  console.log(links)

  var diagonal = d3.svg.diagonal()
    .projection(function(d) {
      return [d.y, d.x]
    })

    svg.append("g").attr("id", "links")

  var node = svg.selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })


  node.append('circle')
    .attr('r', 4)
    .attr('fill', 'rgba(100,100,100,.5)')

    .selectAll(".node")

  svg.select("#links").selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0,100,150, .4)')
    .attr('stroke-width', 3)
    .attr('d', diagonal)

  node.append('text')
    .attr('fill', 'black')
    .style('font-size', '16px')
    .text(function(d) {
      return d.name
    })

})
