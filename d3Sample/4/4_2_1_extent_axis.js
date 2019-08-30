import * as d3 from 'd3'

var scatterData = [{ friends: 5, salary: 22000 },
{ friends: 3, salary: 18000 }, { friends: 10, salary: 88000 },
{ friends: 0, salary: 180000 }, { friends: 27, salary: 56000 },
{ friends: 8, salary: 74000 }]

function test(instance) {
    const targetContainer = instance.$el
    d3.select(targetContainer).append('svg')
    draw()    
}

function draw(){
    var xExtent = d3.extent(scatterData, d=> d.salary)
    var yExtent = d3.extent(scatterData, d=> d.friends)
    
    var xScale = d3.scaleLinear().domain(xExtent).range([0,500])
    var yScale = d3.scaleLinear().domain(yExtent).range([0,500])

    d3.select('svg').selectAll('circle')
        .data(scatterData).enter().append('circle')
        .attr('r', 5).attr('cx', d => xScale(d.salary))
        .attr('cy', d => yScale(d.friends))

    // 데이터를 표현하는 데 사용한 스케일에 기초해 이런 요소들을 쉽게 생성해주는 axis...() 메서도 제공
    var yAxis = d3.axisRight().scale(yScale)
    d3.select('svg').append('g').attr('id','yAxisG').call(yAxis)

    var xAxis = d3.axisBottom().scale(xScale)
    d3.select('svg').append('g').attr('id','xAxisG').call(xAxis)

    //축의 스타일 설정
    d3.selectAll('path.domain').style('fill','red').style('stroke','blue')
    d3.selectAll('line').style('stroke','yellow')
    d3.selectAll('text').style('stroke','blue')
   
    // X-축을 그림 영영 바닥으로 옮김
    d3.selectAll('#xAxisG').attr('transform', 'translate(0,500)')
}

export {
    test
}