import * as d3 from 'd3'
import * as geoJSON from './json/world.json'
import * as colorbrewer from './colorbrewer'

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
        .scale(200)
        // 투영 줌심을 그림 영열의 중심으로 
        .translate([width / 2, height / 2])

    console.log('colorbrewer.', colorbrewer.colorbrewer)

    var geoPath = d3.geoPath().projection(projection)
    var featureSize = d3.extent(geoJSON.features, d => geoPath.area(d))
    var countryColor = d3.scaleQuantize()
        .domain(featureSize).range(colorbrewer.colorbrewer.Reds[6])
    d3.select('svg').selectAll('path')
        .data(geoJSON.features)
        .enter()
        .append('path')
        .attr('class', 'countries')
        .attr('d', geoPath)
        .style('fill', d => countryColor(geoPath.area(d)))
        .style('stroke', d => d3.rgb(countryColor(geoPath.area(d))).darker())

    d3.select('svg').selectAll('circle').data(cities)
        .enter()
        .append('circle')
        .attr('class', 'cities')
        .attr('r', 3)
        .attr('cx', d => projection([d.x, d.y])[0])
        .attr('cy', d => projection([d.x, d.y])[1])
        .style('fill', 'red')


    var graticule = d3.geoGraticule()
    d3.select('svg').insert('path', 'path.countries')
        .datum(graticule)
        .attr('class', 'graticule line')
        .attr('d', geoPath)
    d3.select('svg').insert('path', 'path.countries')
        .datum(graticule.outline)
        .attr('class', 'graticule outline')
        .attr('d', geoPath)


    d3.selectAll('path.countries')
        .on('mouseover', centerBounds)
        .on('mouseout', clearCenterBounds)

    function centerBounds(d) {
        var thisBounds = geoPath.bounds(d)
        var thisCenter = geoPath.centroid(d)
        d3.select('svg')
            .append('rect')
            .attr('class', 'bbox')
            .attr('x', thisBounds[0][0])
            .attr('y', thisBounds[0][1])
            .attr('width', thisBounds[1][0] - thisBounds[0][0])
            .attr('height', thisBounds[1][1] - thisBounds[0][1])
        d3.select('svg')
            .append('circle')
            .attr('class', 'centroid')
            .attr('r', 5)
            .attr('cx', thisCenter[0]).attr('cy', thisCenter[1])
    }

    function clearCenterBounds() {
        d3.selectAll('circle.centroid').remove()
        d3.selectAll('rect.bbox').remove()
    }

}


export {
    test
}