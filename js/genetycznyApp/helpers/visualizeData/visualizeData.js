import * as d3 from 'd3';

function visualizeData(data) {
  const parsedData = data.map((curr, idx) => {
    return {
      nrPopulacji: idx,
      dane: curr
    };
  });

  const valueX = d => d.nrPopulacji;
  const valueY = d => d.dane;

  const width = 960;
  const height = 500;
  const svg = d3.select("#svgroot").append("svg")
    .attr("width", width)
    .attr("height", height);

  const scaleX = d3.scaleLinear()
    .domain(d3.extent(parsedData, valueX))
    .range([0, width]);
    
  const scaleY = d3.scaleLinear()
    .domain(d3.extent(parsedData, valueY))
    .range([height, 100]);

  const line = d3.line()
    .x(d => scaleX(valueX(d)))
    .y(d => scaleY(valueY(d)));
    
  svg.append("path")
    .attr("d", line(parsedData))
    .attr("stroke", "black")
    .attr("fill", "none");
}

export default visualizeData;
