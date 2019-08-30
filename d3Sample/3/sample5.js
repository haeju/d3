import * as d3 from 'd3'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')    
    // d3.select(targetContainer).append('div')
    createSoccerViz()
}

function createSoccerViz() {
    d3.csv('worldcup.csv', data => overallTeamViz(data))
}

function overallTeamViz(incomingData) {
    var target = d3.select('svg')
        .append('g')
        .attr('id', 'teamsG')
        .attr('transform', 'translate(50,300)')

        incomingData

        target.selectAll('g')
        .data(incomingData)
        .enter()
        .append('g')
        .attr('class', 'overallG')
        .attr('transform', (d, i) => 'translate(' + (i * 50) + ', 0)')
    var teamG = d3.selectAll('g.overallG')
    teamG
        .append('circle')
        .attr('r', 20)
        .style('fill','pink')
    teamG
        .append('text')
        .attr('y', 30)
        .text(d => d.team)
}

export {
    test
}