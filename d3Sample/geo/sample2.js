import * as d3 from 'd3'
import * as geoJSON from './json/world.json'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    d3.csv('/src/renderer/pages/countryInfo/d3Sample/geo/csv/cities.csv').then(createMap)
}

function createMap(cities) {
    var width = 500
    var height = 500
    var projection = d3.geoMercator()
        // scale값은 도법에 따라 다르지만 여기에서는 80이 제대로 작동
        .scale(80)
        // 투영 줌심을 그림 영열의 중심으로 
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath().projection(projection)

    d3.select('svg').selectAll('path').data(geoJSON.features)
        .enter()
        .append('path')
        .attr('class', 'countries')
        .attr('d', geoPath)
        .style('fill','gray')
    
    d3.select('svg').selectAll('circle').data(cities)
        .enter()
        .append('circle')
        .attr('class', 'cities')
        .attr('r', 3)
        .attr('cx', d => projection([d.x, d.y])[0])
        .attr('cy', d => projection([d.x, d.y])[1])
        .style('fill','red')
        
}

export {
    test
}