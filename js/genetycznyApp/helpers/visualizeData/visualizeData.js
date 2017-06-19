import * as d3 from 'd3';

function visualizeData(data, nrBadania, defaults) {
  const parsedData = data.map((curr, idx) => {
    return {
      nrPopulacji: idx,
      dostosowanie: curr
    };
  });
  const { wynikiNode } = defaults;
  const wyniki = document.getElementById(`${wynikiNode}_${nrBadania}`);

  const svgRoot = document.createElement('div');
  svgRoot.id = `svgroot${nrBadania}`;
  svgRoot.classList.add('svgTable');
  wyniki.appendChild(svgRoot);

  const svg = dimple.newSvg(`#svgroot${nrBadania}`, 960, 500);
  const myChart = new dimple.chart(svg, parsedData);
  myChart.setBounds(60, 30, 875, 365);
  const x = myChart.addCategoryAxis("x", "nrPopulacji");
  myChart.addMeasureAxis("y", "dostosowanie");
  const s = myChart.addSeries(null, dimple.plot.line);
  myChart.draw();

  // const valueX = d => d.nrPopulacji;
  // const valueY = d => d.dane;

  // const width = 960;
  // const height = 500;
  // const svg = d3.select("#svgroot").append("svg")
  //   .attr("width", width)
  //   .attr("height", height);

  // const scaleX = d3.scaleLinear()
  //   .domain(d3.extent(parsedData, valueX))
  //   .range([0, width]);
    
  // const scaleY = d3.scaleLinear()
  //   .domain(d3.extent(parsedData, valueY))
  //   .range([height, 100]);

  // const line = d3.line()
  //   .x(d => scaleX(valueX(d)))
  //   .y(d => scaleY(valueY(d)));
    
  // svg.append("path")
  //   .attr("d", line(parsedData))
  //   .attr("stroke", "black")
  //   .attr("fill", "none");
}

export default visualizeData;
