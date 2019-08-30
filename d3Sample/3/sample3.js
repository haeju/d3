import * as d3 from 'd3'
import * as tweetsJSON from './tweets.json'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    dataViz(tweetsJSON.tweets)
}


function dataViz(incomingData) {
    incomingData.forEach(d => {
        d.impact = d.favorites.length + d.retweets.length; 1
        d.tweetTime = new Date(d.timestamp); 2
    })
    var maxImpact = d3.max(incomingData, d => d.impact)
    var startEnd = d3.extent(incomingData, d => d.tweetTime); 3
    var timeRamp = d3.scaleTime().domain(startEnd).range([20, 480]); 4
    var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0, 460])
    var radiusScale = d3.scaleLinear()
        .domain([0, maxImpact]).range([1, 20])
    var colorScale = d3.scaleLinear()
        .domain([0, maxImpact]).range(['white', '#75739F']); 5
    d3.select('svg')
        .selectAll('circle')
        .data(incomingData)
        .enter()
        .append('circle')
        .attr('r', d => radiusScale(d.impact))
        .attr('cx', d => timeRamp(d.tweetTime))
        .attr('cy', d => 480 - yScale(d.impact))
        .style('fill', d => colorScale(d.impact))
        .style('stroke', 'black')
        .style('stroke-width', '1px')
}

export {
    test
}