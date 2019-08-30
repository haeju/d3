import * as d3 from 'd3'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    const yScale = d3.scaleLinear().domain([0, 100, 500]).range([0, 50, 100]).clamp(true)

    d3.select('svg')
        .selectAll('rect')
        .data([15, 68, 24500, 430, 18, 1000, 5555])
        .enter()
        .append('rect')
        .attr('width', 10)
        .attr('height', d => yScale(d))
        .style('fill', 'blue')
        .style('stroke', 'red')
        .style('stroke-width', '1px')
        .style('opacity', '.25')
        .attr('x', function (d, i) { return i * 10 })
        .attr('y', function (d) { return 100 - yScale(d) })
}

export {
    test
}