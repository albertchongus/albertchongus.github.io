let url = 'https://albertchongus.github.io/mydata/top10_1979.json'
let req = new XMLHttpRequest()

let values = []
let xLabel = []

let xScale
let yScale

let width = 1000
let height = 600
let padding = 60

let svg = d3.select('svg')
let tooltip = d3.select('#tooltip')

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let genScales = () => {

    xScale = d3.scaleBand()
                .domain(xLabel)
	            .range([padding, width-padding])

    yScale = d3.scaleLinear()
                .domain([0, 55000])
                .range([height-padding, padding])
}

let drawRects = () => {

    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (item) => {
            return xScale(item['Origin']) + 20
        })
        .attr('y', (item) => {
            return yScale(item['Number']) 
        })
        .attr('height', (item) => {
            return height - padding - yScale(item['Number'])
        })
        .attr('width', 50)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2')
        .on('mouseover', (item) => {
            tooltip.transition()
                .style('visibility', 'visible')
            tooltip.text('Year 1969: No.1 Canada 13,318')
        })
        .on('mouseout', (item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })


}

let genAxes = () => {

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    svg.append('g')
            .style("font", "14px times")
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0, ' + (height-padding) +')')
    
    svg.append('g')
            .style("font", "14px times")
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform','translate(' + padding + ', 0)')

}

let genText = () => {

    svg.selectAll('text.bar')
            .data(values)
            .enter()
            .append('text')
            .attr('x', 650)
            .attr('y', 120)
            .text('World Total: 286,340')
            .style('font-size', '30px')
            .style('font-weight', 900)

}

let genTitle = () => {

    svg.append('text')
            .attr('x', width/2)
            .attr('y', padding)
            .attr('text-anchor', 'middle')
            .style('font-size', '30px')
            .style('font-weight', 900)
            .text('Year 1979')

}

let genAnnotation = () => {

    const annotations = [
        {
          note: { label: "No.1: Iran Number: 51,310"  },
          color: ["#EF5B0C"],
          x: 80,
          y: 80,
          dy: -1,
          dx: 0,
        },
      ];
    
    const makeAnnotatios = d3.annotation()
      .annotations(annotations)
    d3.annotation().annotations(annotations);

    d3.select('svg')
        .append('g')
        .call(makeAnnotatios)

}

req.open('GET', url, true)
req.onload = () => {
    values = JSON.parse(req.responseText)
    console.log(values)
    xLabel = values.map((item) => {
        return item['Origin']
    })
    console.log(xLabel)
    drawCanvas()
    genScales()
    drawRects()
    genAxes()
    genText()
    genTitle()
    genAnnotation()
}
req.send()


