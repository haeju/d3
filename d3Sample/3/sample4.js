import * as d3 from 'd3'
import * as tweetsJSON from './tweets.json'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    dataViz(tweetsJSON.tweets)
}


function dataViz(incomingData) {
    incomingData.forEach(d => {
        d.impact = d.favorites.length + d.retweets.length
        d.tweetTime = new Date(d.timestamp)
    })
    var maxImpact = d3.max(incomingData, d => d.impact)
    var startEnd = d3.extent(incomingData, d => d.tweetTime)
    var timeRamp = d3.scaleTime().domain(startEnd).range([20, 480])
    var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0, 460])
    var radiusScale = d3.scaleLinear()
        .domain([0, maxImpact]).range([1, 20])
    var colorScale = d3.scaleLinear()
        .interpolate(d3.interpolateHsl) //채도
        .interpolate(d3.interpolateHcl) //농도
        .interpolate(d3.interpolateLab) //대응 공간
        .domain([0, maxImpact]).range(['yellow', 'blue'])
    // d3.select('svg')
    //     .selectAll('circle')
    //     .data(incomingData)
    //     .enter()
    //     .append('circle')
    //     .attr('r', d => radiusScale(d.impact))
    //     .attr('cx', d => timeRamp(d.tweetTime))
    //     .attr('cy', d => 480 - yScale(d.impact))
    //     .style('fill', d => colorScale(d.impact))
    //     .style('stroke', 'black')
    //     .style('stroke-width', '1px')

    var tweetG = d3.select('svg').selectAll('g')
        .data(incomingData)
        .enter()
        .append('g')
        .attr('transform', d => 'translate(' +
            timeRamp(d.tweetTime) + ',' + (480 - yScale(d.impact)) + ')'
        )

    tweetG.append('circle')
        .attr('r', d => radiusScale(d.impact))
        .style('fill', d => colorScale(d.impact))
        .style('stroke', 'black')
        .style('stroke-width', '1px')

    tweetG.append('text')
        .text(d => d.user + '-' + d.tweetTime.getHours())
        
    // d3.selectAll('g').data([1, 2, 3, 4]).exit().remove()
    // d3.selectAll('g').select('text').text(d => d)

    d3.selectAll('g').each(d => console.log(d))
    d3.selectAll('text').each(d => console.log(d))
    d3.selectAll('circle').each(d => console.log(d))

    // var teamColor  = d3.rgb('pink')

    // d3.selectAll('circle')
    //     .style('fill', d => d.user === 'Sam' ? teamColor.darker(.95):teamColor.brighter(.5))
        

}

export {
    test
}