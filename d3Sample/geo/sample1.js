import * as d3 from 'd3'
import * as geoJSON from './json/world.json'

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    createMap()    
}

function createMap() {
    var width = 500
    var height = 500
    var aProjection = d3.geoMercator()
                        // scale값은 도법에 따라 다르지만 여기에서는 80이 제대로 작동
                        .scale(80)
                        // 투영 줌심을 그림 영열의 중심으로 
                        .translate([width/2, height/2])
    var geoPath = d3.geoPath().projection(aProjection)

    d3.select('svg').selectAll('path').data(geoJSON.features)
    .enter()
    .append('path')
    .attr('d',geoPath)
    .attr('class', 'countries')

    console.log( d3.geoMercator().scale())
    console.log( d3.geoAlbersUsa().scale())
    console.log( aProjection([-122,37])) // 위도,경도 배열을 전달 호출 용도
}

export {
    test
}