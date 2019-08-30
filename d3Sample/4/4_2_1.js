import * as d3 from 'd3'

var scatterData = [{ friends: 5, salary: 22000 },
{ friends: 3, salary: 18000 }, { friends: 10, salary: 88000 },
{ friends: 0, salary: 180000 }, { friends: 27, salary: 56000 },
{ friends: 8, salary: 74000 }]

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    d3.select('svg').selectAll('circle')
        .data(scatterData).enter()
        .append('circle').attr('r', 5).attr('cx', (d, i) => i * 10).attr('cy', d => d.friends)
}

export {
    test
}