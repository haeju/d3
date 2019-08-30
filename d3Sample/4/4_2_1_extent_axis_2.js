import * as d3 from 'd3'

var scatterData = [{ day: 1, friends: 5, salary: 3 },
{ day: 2, friends: 3, salary: 4 }, { day: 3, friends: 10, salary: 7 },
{ day: 4, friends: 0, salary: 7 }, { day: 5, friends: 27, salary: 11 },
{ day: 6, friends: 8, salary: 1 }]

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    draw()
}

function draw() {
    const blue = '#5eaec5', green = '#92c463'
    var xScale = d3.scaleLinear().domain([0, 10]).range([0, 500])
    var yScale = d3.scaleLinear().domain([0, 27]).range([0, 500])
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(500)
        .ticks(4)

    d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis)
    var yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(16)
        .tickSize(500)
    d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis)

    d3.select('svg').selectAll('circle.friends')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('class', 'friends')
        .attr('r', 5)
        .attr('cx', d => xScale(d.day))
        .attr('cy', d => yScale(d.friends))
        .style('fill', blue)

    d3.select('svg').selectAll('circle.salary')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('class', 'salary')
        .attr('r', 5)
        .attr('cx', d => xScale(d.day))
        .attr('cy', d => yScale(d.salary))
        .style('fill', green)
}

export {
    test
}