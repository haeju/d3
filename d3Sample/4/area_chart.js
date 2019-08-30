import * as d3 from 'd3'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    draw()

}

// movie.csv
// day,titanic,avatar,akira,frozen,deliverance,avengers
// 1,20,8,3,0,0,0
// 2,18,5,1,13,0,0
// 3,14,3,1,10,0,0
// 4,7,3,0,5,27,15
// 5,4,3,0,2,20,14
// 6,3,1,0,0,10,13
// 7,2,0,0,0,8,12
// 8,0,0,0,0,6,11
// 9,0,0,0,0,3,9
// 10,0,0,0,0,1,8


function draw() {
    d3.csv('/src/renderer/pages/countryInfo/d3Sample/4/movie.csv').then(data => areaChart(data))
}

function areaChart(data) {
    var fillScale = d3.scaleOrdinal()
        .domain(['titanic', 'avatar', 'akira', 'frozen', 'deliverance', 'avengers'])
        .range(['#fcd88a', '#cf7c1c', '#93c464', '#75734F', '#5eafc6', '#41a368'])

    var xScale = d3.scaleLinear().domain([1, 8]).range([20, 470])
    var yScale = d3.scaleLinear().domain([0, 55]).range([480, 20])

    Object.keys(data[0]).forEach(key => {
        if (key != 'day') {
            var movieArea = d3.area()
                .x(d => xScale(d.day))
                .y0(d => yScale(simpleStacking(d, key) - d[key]))
                .y1(d => yScale(simpleStacking(d, key)))
                .curve(d3.curveBasis)

            d3.select('svg')
                .append('path')
                .style('id', key + 'Area')
                .attr('d', movieArea(data))
                .attr('fill', fillScale(key))
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
        }
    })
    function simpleStacking(lineData, lineKey) {
        var newHeight = 0
        Object.keys(lineData).every(key => {
            if (key !== 'day') {
                newHeight += parseInt(lineData[key])
                if (key === lineKey) {
                    return false
                }
            }
            return true
        })
        return newHeight
    }
    var legendA = d3.legendColor().scale(fillScale)
    d3.select('svg')
        .style('width', '1000px')

    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(500, 0)')
        .call(legendA)
}


export {
    test
}