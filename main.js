const SVG2 = d3.select("#vis-21").append("svg");

const WIDTH1 = 600;
const HEIGHT1 = 400;
const margin = {
  top: 60,
  bottom: 60,
  right: 30,
  left: 60
};
const HEIGHTVIS1 = HEIGHT1 - margin.top - margin.bottom;
const WIDTHVIS1 = WIDTH1 - margin.right - margin.left;

const WIDTH2 = 900;
const HEIGHT2 = 400;
const margin2 = {
  top: 30,
  bottom: 50,
  left: 90,
  right: 100,
};
const HEIGHTVIS2 = HEIGHT2 - margin2.top - margin2.bottom;
const WIDTHVIS2 = WIDTH2 - margin2.right - margin2.left;

const detail_WIDTH2 = 400
const detail_HEIGHT2 = 400

const TIEMPO_TRANSICION = 800;

SVG2.attr("width", WIDTH2).attr("height", HEIGHT2).attr("id", "svg2").style("border", "1px solid black");

const grafico2 = SVG2.append("g")
  .attr("id", "grafico2")
  .style("position", "absolute")
  .style("z-index", "1")
  .attr("transform", `translate(${margin2.left} ${margin2.top})`);

// ******************************************************************* VIS 1 ************************************************************************************
const svgPanoramica = d3
  .select("#vista_panoramica")
  .attr("width", WIDTH1)
  .attr("height", HEIGHT1)

const svgDetalle = d3
  .select("#vista_detalle")
  .attr("width", HEIGHT1)
  .attr("height", HEIGHT1)

// Contenedores

const contenedorEjeResolucion = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEjePrecio = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHT1 - margin.bottom})`);

const contenedorPuntosPanoramica = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorBrush = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEjeResolucionDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEjePrecioDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHT1 - margin.bottom})`);

const contenedorPuntosDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorTitulosPanoramica = svgPanoramica
  .append("g");

const contenedorTitulosDetalle = svgDetalle
  .append("g");

// Titulos

contenedorTitulosPanoramica
  .append("text")
  .attr("transform", `translate(${WIDTH1 / 2}, ${margin.top / 2})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 20)
  .text("Vista Panorámica");

contenedorTitulosPanoramica
  .append("text")
  .attr("transform", `rotate(-90) translate(${-(margin.top + HEIGHTVIS1 / 2)}, ${margin.left / 4})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 16)
  .text("Resolución Máxima");

contenedorTitulosPanoramica
  .append("text")
  .attr("transform", `translate(${margin.left + WIDTHVIS1 / 2}, ${HEIGHT1 - margin.bottom / 2.5})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 16)
  .text("Precio");

contenedorTitulosDetalle
  .append("text")
  .attr("transform", `translate(${HEIGHT1 / 2}, ${margin.top / 2})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 20)
  .text("Vista Detalle");

contenedorTitulosDetalle
  .append("text")
  .attr("transform", `rotate(-90) translate(${-(margin.top + HEIGHTVIS1 / 2)}, ${margin.left / 4})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 16)
  .text("Resolución Máxima");

contenedorTitulosDetalle
  .append("text")
  .attr("transform", `translate(${margin.left + HEIGHTVIS1 / 2}, ${HEIGHT1 - margin.bottom / 2.5})`)
  .attr("text-anchor", "middle")
  .attr("font-size", 16)
  .text("Precio");

function createCameras(data) {
  // Ejes
  const maximaresolucion = d3.max(data, (d) => d.Max_resolution);
  const maximamplitud = d3.max(data, (d) => d.Zoom_wide);
  const maximaPrice = d3.max(data, (d) => d.Price);
  // Price
  console.log(maximaresolucion)
  console.log(maximamplitud)
  console.log(maximaPrice)

  // Vista Panoramica

  const escala_amplitud = d3
    .scaleLinear()
    .domain([0, maximamplitud])
    .range([0, WIDTHVIS1]);

  const escalaResolucionPanoramica = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.Max_resolution))
    .range([HEIGHTVIS1, 0])
    .nice();

  const ejeResolucionPanoramica = d3.axisLeft(escalaResolucionPanoramica);

  contenedorEjeResolucion.call(ejeResolucionPanoramica)

  const escalaPrecioPanoramica = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.Price))
    .range([0, WIDTHVIS1])
    .nice();
  
  const ejePrecioPanoramica = d3.axisBottom(escalaPrecioPanoramica);

  contenedorEjePrecio.call(ejePrecioPanoramica)

  const puntosPanoramica = contenedorPuntosPanoramica
    .selectAll("circle")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "punto")
          .attr("cx", (d, i) => escalaPrecioPanoramica(d.Price))
          .attr(
            "cy", (d) => escalaResolucionPanoramica(d.Max_resolution))
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr("r", (d) => 4)
          .attr("fill", "#D9ED92")
          .attr("stroke", "#113149"),
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr(
            "cy",
            (d) => escalaResolucionPanoramica(d.Max_resolution)
          )
          .attr("cx", (d) => escalaPrecioPanoramica(d.Price)),
      (exit) => exit.remove()
    );
   
  // Vista Detalle
    
  const escalaResolucionDetalle = d3
    .scaleLinear()
    .domain([200,100].map(escalaResolucionPanoramica.invert))
    .range([HEIGHTVIS1, 0]);

  const ejeResolucionDetalle = d3.axisLeft(escalaResolucionDetalle);

  contenedorEjeResolucionDetalle.call(ejeResolucionDetalle)

  const escalaPrecioDetalle = d3
    .scaleLinear()
    .domain([100,200].map(escalaPrecioPanoramica.invert))
    .range([0, HEIGHTVIS1]);
  
  const ejePrecioDetalle = d3.axisBottom(escalaPrecioDetalle);

  contenedorEjePrecioDetalle.call(ejePrecioDetalle);

  const contenedorCuadro = svgDetalle
    .append("g")
    .attr("id", "cuadro")
    .style("visibility", "hidden");
  
  const contenedorFondo = contenedorCuadro
    .append("rect")
    .attr("id", "fondo_tt")
    .style("fill", "yellow")
    .attr("stroke", "#113149")
    .attr("stroke-width", "1")
    .attr("width", 205)
    .attr("height", 60)
    .attr("rx", "4px");

  const txt11 = contenedorCuadro.append("text").attr("class", "txt");
  const txt12 = contenedorCuadro.append("text").attr("class", "txt");
  const txt13 = contenedorCuadro.append("text").attr("class", "txt");
  
  const puntosDetalle = contenedorPuntosDetalle
    .selectAll("circle")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "punto")
          .attr("cx", (d, i) => escalaPrecioDetalle(d.Price))
          .attr(
            "cy", (d) => escalaResolucionDetalle(d.Max_resolution))
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr("r", (d) => 4)
          .attr("fill", "orange")
          .attr("stroke", "#113149"),
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr(
            "cy",
            (d) => escalaResolucionDetalle(d.Max_resolution)
          )
          .attr("cx", (d) => escalaPrecioDetalle(d.Price)),
      (exit) => exit.remove()
    )
    .on("mouseover", function (event, d) {
      txt11.text(`Camera: ${d.Model}`);
      txt12.text(`Price: ${d.Price}`);
      txt13.text(`Max Resolution: ${d.Max_resolution}`);
      contenedorCuadro.style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      txt11
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 20 + "px");
      txt12
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 35 + "px");
      txt13
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 50 + "px");
      contenedorFondo
        .attr("x", event.offsetX - 80 + "px")
        .attr("y", event.offsetY + 5 + "px");
    })
    .on("mouseout", () => {
      contenedorCuadro.style("visibility", "hidden");
    }); 
  
  svgDetalle
    .append("clipPath")
    .attr("id", "clip-detalle")
    .append("rect")
    .attr("width", HEIGHT1 - margin.top - margin.bottom)
    .attr("height", HEIGHT1 - margin.top - margin.bottom);
  
  contenedorPuntosDetalle.attr("clip-path", "url(#clip-detalle)");

  // Brush

  const brush = d3
    .brush()
    .extent([
      [0, 0],
      [WIDTH1 - margin.left - margin.right, HEIGHT1 - margin.top - margin.bottom]
    ])
  
  contenedorBrush.call(brush);

  const brushed = (evento) => {
    const seleccion = evento.selection;

    const precioMin = escalaPrecioPanoramica.invert(seleccion[0][0]);
    const precioMax = escalaPrecioPanoramica.invert(seleccion[1][0]);

    const resolucionMin = escalaResolucionPanoramica.invert(seleccion[1][1]);
    const resolucionMax = escalaResolucionPanoramica.invert(seleccion[0][1]);

    const filtro = d => 
      precioMin <= d.Price && d.Price <= precioMax && resolucionMin <= d.Max_resolution && d.Max_resolution <= resolucionMax;
    
    puntosPanoramica
      .attr("fill", d => filtro(d) ? "orange" : "#D9ED92")
    
    escalaPrecioDetalle.domain([precioMin, precioMax]);
    contenedorEjePrecioDetalle.call(d3.axisBottom(escalaPrecioDetalle));

    escalaResolucionDetalle.domain([resolucionMin, resolucionMax]);
    contenedorEjeResolucionDetalle.call(d3.axisLeft(escalaResolucionDetalle));

    puntosDetalle
      .attr("cx", d => escalaPrecioDetalle(d.Price))
      .attr("cy", d => escalaResolucionDetalle(d.Max_resolution))
  }

  brush.on("brush", brushed);

  contenedorBrush.call(brush.move, [
    [100, 100],
    [200, 200]
  ]);

  contenedorBrush.select(".selection").attr("fill", "orange");


/*
  SVG1
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(ejeY)
    .selectAll("line")
    .attr("x1", WIDTHVIS1)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.1);
    SVG1
    .append("text")
    .attr("class", "labely")
    .attr("text-anchor", "end")
    .attr("x", 270)
    .attr("y", HEIGHTVIS1 +  margin.top+ 75)
    .text("Camera`s Resolution");

  SVG1
  .append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHTVIS1 +margin.top})`)
  .call(ejeX)
    .selectAll("line")
    .attr("y1", -HEIGHTVIS1)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.1);

  SVG1
    .append("text")
    .attr("class", "labelx")
    .attr("text-anchor", "end")
    .attr("x", WIDTH1 -margin.right)
    .attr("y", HEIGHT1 -10)
    .text("Camera`s Price");
    

  const cuadro = grafico1.append("g").attr("id", "cuadro")
    .style("visibility", "hidden")
  const fondo = cuadro
  .append("rect")
    .attr("id", "fondo_tt")
    .style("fill", "yellow")
    .attr("stroke", "#113149")
    .attr("stroke-width", "1")
    .attr("width", 205)
    .attr("height", 60)
    .attr("rx", "4px");

  const txt11 = cuadro.append("text").attr("class", "txt");
  const txt12 = cuadro.append("text").attr("class", "txt");
  const txt13 = cuadro.append("text").attr("class", "txt");

  grafico1
    .selectAll("circle")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "punto")
          .attr("cx", (d, i) => escala_price(d.Price))
          .attr(
            "cy", (d) =>escala_resolucion(d.Max_resolution))
          .attr("r", (d) => 4)
          .attr("fill", "#D9ED92")
          .attr("stroke", "#113149"),
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr(
            "cy",
            (d) => 3
          )
          ,
      (exit) => exit.remove()
    ) .on("mouseover", function (event, d) {
      txt11.text(`Camera: ${d.Model}`);
      txt12.text(`Price: ${d.Price}`);
      txt13.text(`Max Resolution: ${d.Max_resolution}`);
      cuadro.style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      txt11
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 20 + "px");
      txt12
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 35 + "px");
      txt13
        .attr("x", event.offsetX - 75 + "px")
        .attr("y", event.offsetY + 50 + "px");
      fondo
        .attr("x", event.offsetX - 80 + "px")
        .attr("y", event.offsetY + 5 + "px");
    })
    .on("mouseout", () => {
      cuadro.style("visibility", "hidden");
    });

*/
};

// ******************************************************************* VIS 2 ************************************************************************************

function calculateQuartiles(numbers) {
  numbers.sort((a, b) => a - b); 

  const q1Index = Math.floor(numbers.length / 4);
  const q2Index = Math.floor(numbers.length / 2);
  const q3Index = Math.floor((3 * numbers.length) / 4);

  const q1 = numbers[q1Index];
  const q2 = numbers[q2Index];
  const q3 = numbers[q3Index];

  // console.log(`precios: ${numbers}`)

  const RIQ = q3- q1
  
  const LI = q1 - 1.5 *RIQ
  const LS = q3 + 1.5 *RIQ

  return [q1, q2, q3, d3.max([LI, 0]), d3.max([LS, 0])];
}

function calculateOutliers(numbers) {
  numbers.sort((a, b) => a - b); // Sort the numbers in ascending order

  const q1Index = Math.floor(numbers.length / 4);
  const q3Index = Math.floor((3 * numbers.length) / 4);

  const q1 = numbers[q1Index];
  const q3 = numbers[q3Index];

  const iqr = q3 - q1;
  const lowerBound = q1 - (1.5 * iqr);
  const upperBound = q3 + (1.5 * iqr);

  return numbers.filter(d => d < lowerBound || d > upperBound);
}



function lineas_marca(data) {
  const maximaPrice = d3.max(data, (d) => +d.Price);
  const grupos = d3.group(data, d => d.Brand);
  const columns = grupos.size;
  // console.log(`size: ${grupos.size}`);

  const xScale = d3.scaleBand()
        .domain(d3.range(columns))
        .range([0, WIDTHVIS2])
        .padding(0.1);
  
  const escala_y = d3
        .scaleLinear()
        .domain([0, 4000])
        .range([HEIGHTVIS1, 0]);

  const ejeY = d3.axisLeft(escala_y);

  grafico2.call(ejeY)
    .selectAll("line")
    .attr("x1", WIDTHVIS2)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.1);

  var count = 0;
  for (const [clave, valores] of grupos.entries()) {
    // console.log(`grupo: ${count+1}, ${clave}`);
    // Realiza aquí las operaciones que necesites con los resultados
    const precios = valores.map(d => +d.Price);
    const minimo = d3.min(precios);
    const maximo = d3.max(precios);

    const grupoCaja = grafico2.append('g')
    .attr("transform", `translate(${xScale(count)}, 0)`);

    
    // Calcular los valores atípicos para el gráfico de caja
    const valoresAtipicos = calculateOutliers(precios);
    // console.log(`valoresAtipicos: ${valoresAtipicos}`);
    
    
    const cuartiles = calculateQuartiles(precios);
    // console.log(`cuartiles: ${cuartiles[0]},${cuartiles[1]},${cuartiles[2]}.LI:${cuartiles[3]},LS:${cuartiles[4]}`);


    grupoCaja.selectAll('rect')
      .data([minimo, cuartiles[0], cuartiles[1], cuartiles[2],cuartiles[3],cuartiles[4], maximo])
      .join(
        (enter) => 
      enter
      .append('rect')
      .attr('x', 0)
      .attr('y', escala_y(cuartiles[2]))
      .attr('width', 10)
      .attr('height', Math.abs(escala_y(cuartiles[2]) - escala_y(cuartiles[0])))
      .attr('stroke', 'black')
      .attr("fill","transparent")
      .attr('stroke-width', 2)
      .attr('class', 'box')
      ).on("click", (d) => console.log(valores));
      // (d) => updateBarChart(d)
    
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[1]))
      .attr('y2', (d)=> escala_y(cuartiles[1]))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
    // LI
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[3]))
      .attr('y2', (d)=> escala_y(cuartiles[3]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)

    // LS
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[4]))
      .attr('y2', (d)=> escala_y(cuartiles[4]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)

    grupoCaja.append('line')
      .attr('x1', 5)
      .attr('x2', 5)
      .attr('y1', escala_y(cuartiles[4]))
      .attr('y2', escala_y(cuartiles[2]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
    grupoCaja.append('line')
      .attr('x1', 5)
      .attr('x2', 5)
      .attr('y1', escala_y(cuartiles[0]))
      .attr('y2', escala_y(cuartiles[3]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)

    grupoCaja.selectAll('circle')
      .data(valoresAtipicos)
      .join(
        (enter) => 
      enter
      .append('circle')
      .attr('cx', 5)
      .attr('cy', d => escala_y(d))
      .attr('r', 2)
      .attr('fill', 'red'));
    
    grupoCaja.selectAll('text').data([clave])
      .join(
        (enter) => 
      enter.append('text')
      .attr('x', 5)
      .attr('y', HEIGHT2 - margin2.bottom)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .text(clave)
      .attr('transform', `translate(${5}, ${HEIGHT2 - margin2.bottom}) rotate(-45) translate(-${5}, -${HEIGHT2 - margin2.bottom})`)
      .attr("class","txt"));
    count ++;
  }
  // .append("svg").attr("width", detail_WIDTH2).attr("height", detail_HEIGHT2).attr("id", "detail2").style("border", "1px solid black");
  var detail_SVG2 = d3.select("#vis-22");
  function updateBarChart(data) {
    d3.select("#vis-22 svg").remove();
    var detailSvg = d3.select("#vis-22")
                      .append("svg")
                      .attr("width", detail_WIDTH2)
                      .attr("height", detail_HEIGHT2)
                      .attr("id", "detail2")
                      .style("border", "1px solid black");
    console.log(data)
  }
};