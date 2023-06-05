const SVG1 = d3.select("#vis-1").append("svg");
// const SVG2 = d3.select("#vis-2").append("svg");

const WIDTH1 = 900;
const HEIGHT1 = 400;
// const WIDTH2 = 1100;
// const HEIGHT2 = 1600;
// const TIEMPO_TRANSICION = 800;
const margin = {
    top: 30,
    bottom: 50,
    left: 120,
    right: 100,
  };

const HEIGHTVIS1 = HEIGHT1 - margin.top - margin.bottom;
const WIDTHVIS1 = WIDTH1 - margin.right - margin.left;


SVG1.attr("width", WIDTH1).attr("height", HEIGHT1).style("border", "1px solid black");
// SVG2.attr("width", WIDTH2).attr("height", HEIGHT2);

const grafico1 = SVG1.append("g")
  .attr("id", "grafico1")
  .style("position", "absolute")
  .style("z-index", "1")
  .attr("transform", `translate(${margin.left} ${margin.top})`);


  
function createCameras(data) {
  // Ejes
  const maximaresolucion = d3.max(data, (d) => d.Max_resolution);
  const maximamplitud = d3.max(data, (d) => d.Zoom_wide);
  console.log(maximaresolucion)
  console.log(maximamplitud)
    
  const escalaX = d3
  .scaleLinear()
  .domain([0, maximamplitud])
  .range([0, WIDTHVIS1]);
      
     
  const escalaY = d3
  .scaleLinear()
  .domain([0, maximaresolucion])
  .range([HEIGHTVIS1, 0]);
      
    
  const ejeY = d3.axisLeft(escalaY);
  const ejeX = d3.axisBottom(escalaX);

  SVG1
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(ejeY)
    .selectAll("line")
    .attr("x1", WIDTHVIS1)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.1);
  // grafico1
  // .append("text")
  // .attr("class", "labelxy")
  // .attr("text-anchor", "end")
  // .attr("x", margin.left + 300)
  // .attr("y", margin.top - 20)

  SVG1
  .append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHTVIS1 +margin.top})`)
  .call(ejeX)
    .selectAll("line")
    .attr("y1", -HEIGHTVIS1)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.1);
  // grafico1
  //   .append("text")
  //   .attr("class", "labelxy")
  //   .attr("text-anchor", "end")
  //   .attr("x", WIDTH1 -margin.right)
  //   .attr("y", HEIGHT1 -10)
  //   .text("Personas que utilizan actualmente esta herramienta");
    
  // grafico1
  //   .selectAll("circle")
  //   .data(data).join("circle").attr("class", "disco")
  //   .attr("r", 6)
  //   .attr("fill", "white")
  //   .attr("cx", 50)
  //   .attr("cy", 50)
}