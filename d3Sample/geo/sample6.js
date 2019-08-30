import * as d3 from 'd3'
import * as geoJSON from './json/world.json'
import * as colorbrewer from './colorbrewer'

// 위성 도법

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    d3.csv('/src/renderer/pages/countryInfo/d3Sample/geo/csv/cities.csv').then(createMap)
}

function createMap(cities) {
    var projection = d3.d3.geoSatellite()
        .scale(1330)
        .translate([250, 250])
        .rotate([-30.24, -31, -56])
        .tilt(30)
        .distance(1.199)
        .clipAngle(45)

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

    var featureData = d3.selectAll('path.countries').data()
    var realFeatureSize =
        d3.extent(featureData, d => d3.geoArea(d))
    var newFeatureColor =
        d3.scaleQuantize().domain(realFeatureSize).range(colorbrewer.colorbrewer.Reds[7])
    d3.selectAll('path.countries')
        .style('fill', d => newFeatureColor(d3.geoArea(d)))


    var mapZoom = d3.zoom()
        .on('zoom', zoomed)

    var zoomSettings = d3.zoomIdentity
        .translate(0, 0)
        .scale(200)

    var rotateScale = d3.scaleLinear()
        .domain([-500, 0, 500])
        .range([-180, 0, 180])

    d3.select('svg')
        .call(mapZoom)
        .call(mapZoom.transform, zoomSettings)


    function zoomed() {
        var e = d3.event
        var currentRotate = rotateScale(e.transform.x) % 360

        projection
            .rotate([currentRotate, 0])
            .scale(e.transform.k)

        d3.selectAll('path.graticule').attr('d', geoPath)
        d3.selectAll('path.countries').attr('d', geoPath)
            .style('fill', d => countryColor(geoPath.area(d)))
            .style('stroke', d => d3.rgb(countryColor(geoPath.area(d))).darker())

        d3.selectAll('circle.cities')
            .each(function (d) {
                var projectedPoint = projection([d.x, d.y])
                var x = parseInt(d.x)
                var display = x + currentRotate < 90 && x + currentRotate > -90
                    || (x + currentRotate < -270 && x + currentRotate > -450)
                    || (x + currentRotate > 270 && x + currentRotate < 450)
                    ? 'block' : 'none'
                d3.select(this)
                    .attr('cx', projectedPoint[0])
                    .attr('cy', projectedPoint[1])
                    .style('display', display)
            })
    }
}


export {
    test
}