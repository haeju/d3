import * as d3 from 'd3'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    draw()
}

function draw() {
    d3.csv('/src/renderer/pages/countryInfo/d3Sample/4/tweetdata.csv', lineChart)
}

function lineChart(data) {
    console.log(data)
    const blue = '#5eaec5', green = '#92c463', orange = '#fe9a22'
    var xScale = d3.scaleLinear().domain([1, 10.5]).range([20, 480])
    var yScale = d3.scaleLinear().domain([0, 35]).range([480, 20])
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(480)
        .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis)
    var yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(10)
        .tickSize(480)
    d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis)

    d3.select('svg').selectAll('circle.tweets')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'tweets')
        .attr('r', 5)
        .attr('cx', d => xScale(d.day))
        .attr('cy', d => yScale(d.tweets))
        .style('fill', blue)

    d3.select('svg').selectAll('circle.retweets')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'retweets')
        .attr('r', 5)
        .attr('cx', d => xScale(d.day))
        .attr('cy', d => yScale(d.retweets))
        .style('fill', green)

    d3.select('svg').selectAll('circle.favorites')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'favorites')
        .attr('r', 5)
        .attr('cx', d => xScale(d.day))
        .attr('cy', d => yScale(d.favorites))
        .style('fill', orange)
}

export {
    test
}