import dimple from 'dimple-js/dist/dimple.latest.js';

function visualizeData(data, div, nrBadania = 'srednia') {
  const parsedData = data.map((curr, idx) => {
    return {
      nrPopulacji: idx,
      dostosowanie: curr
    };
  });

  const svgRoot = document.createElement('div');
  svgRoot.id = `svgroot${nrBadania}`;
  svgRoot.classList.add('svgTable');
  div.appendChild(svgRoot);

  const svg = dimple.newSvg(`#svgroot${nrBadania}`, 960, 500);
  const myChart = new dimple.chart(svg, parsedData);
  myChart.setBounds(60, 30, 875, 365);
  const x = myChart.addCategoryAxis("x", "nrPopulacji");
  myChart.addMeasureAxis("y", "dostosowanie");
  const s = myChart.addSeries(null, dimple.plot.line);
  const s1 = myChart.addSeries(null, dimple.plot.line);
  const s2 = myChart.addSeries(null, dimple.plot.line);
  const s3 = myChart.addSeries(null, dimple.plot.line);
  myChart.draw();
}

export default visualizeData;
