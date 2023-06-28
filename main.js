const SVG2 = d3.select("#vis-21").append("svg");
const SVG3 = d3.select("#vis-23").append("svg");

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

const WIDTH3 = 600;
const HEIGHT3 = 400;

const margin3 = {
    top: 60,
    bottom: 60,
    left: 30,
    right: 60
};

const HEIGHTVIS3 = HEIGHT3 - margin3.top - margin3.bottom;
const WIDTHVIS3 = WIDTH3 - margin3.right - margin3.left;

const TIEMPO_TRANSICION = 800;

SVG2.attr("width", WIDTH2).attr("height", HEIGHT2).attr("id", "svg2").style("border", "1px solid black");
SVG3.attr("width", WIDTH3).attr("height", HEIGHT3).attr("id", "svg3").style("border", "1px solid black");

const grafico2 = SVG2.append("g")
  .attr("id", "grafico2")
  .style("position", "absolute")
  .style("z-index", "1")
  .attr("transform", `translate(${margin2.left} ${margin2.top})`);

const grafico3 = SVG3.append("g")
  .attr("id", "grafico3")
  .style("position", "absolute")
  .style("z-index", "1")
  .attr("transform", `translate(${+ WIDTHVIS3 / 2 +margin3.left} ${+ WIDTHVIS3 / 2 +margin3.top})`);

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

  contenedorEjeResolucion
    .selectAll("line")
    .attr("x1", WIDTH1 - margin.left - margin.right)
    .attr("opacity", 0.5)
    .attr("stroke-dasharray", "5");

  const escalaPrecioPanoramica = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.Price))
    .range([0, WIDTHVIS1])
    .nice();
  
  const ejePrecioPanoramica = d3.axisBottom(escalaPrecioPanoramica);

  contenedorEjePrecio.call(ejePrecioPanoramica)

  contenedorEjePrecio
    .selectAll("line")
    .attr("y1", -(HEIGHT1 - margin.top - margin.bottom))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

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

  contenedorEjeResolucionDetalle
    .selectAll("line")
    .attr("x1", WIDTH1 - margin.left - margin.right)
    .attr("opacity", 0.5)
    .attr("stroke-dasharray", "5");


  const escalaPrecioDetalle = d3
    .scaleLinear()
    .domain([100,200].map(escalaPrecioPanoramica.invert))
    .range([0, HEIGHTVIS1]);
  
  const ejePrecioDetalle = d3.axisBottom(escalaPrecioDetalle);

  contenedorEjePrecioDetalle.call(ejePrecioDetalle);
  
  contenedorEjePrecioDetalle
    .selectAll("line")
    .attr("y1", -(HEIGHT1 - margin.top - margin.bottom))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);


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
      txt11.text(d.Model);
      txt12.text(`Price: ${d.Price}`);
      txt13.text(`Max Resolution: ${d.Max_resolution}`);
      contenedorCuadro.style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      txt11
        .attr("x", event.offsetX + 25 + "px")
        .attr("y", event.offsetY + 20 + "px");
      txt12
        .attr("x", event.offsetX + 25 + "px")
        .attr("y", event.offsetY + 35 + "px");
      txt13
        .attr("x", event.offsetX + 25 + "px")
        .attr("y", event.offsetY + 50 + "px");
      contenedorFondo
        .attr("x", event.offsetX + 20 + "px")
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
    contenedorEjePrecioDetalle.call(d3.axisBottom(escalaPrecioDetalle))
    contenedorEjePrecioDetalle
    .selectAll("line")
    .attr("y1", -(HEIGHT1 - margin.top - margin.bottom))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

    escalaResolucionDetalle.domain([resolucionMin, resolucionMax]);
    contenedorEjeResolucionDetalle.call(d3.axisLeft(escalaResolucionDetalle))
    contenedorEjeResolucionDetalle
    .selectAll("line")
    .attr("x1", WIDTH1 - margin.left - margin.right)
    .attr("opacity", 0.5)
    .attr("stroke-dasharray", "5");

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
      ).on("click", function() {
      console.log(clave)
      radar_marca(data, clave)
    })
      // (d) => updateBarChart(d)
    
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[1]))
      .attr('y2', (d)=> escala_y(cuartiles[1]))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })
      
    // LI
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[3]))
      .attr('y2', (d)=> escala_y(cuartiles[3]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })

    // LS
    grupoCaja.append('line')
      .attr('x1', 0)
      .attr('x2', 10)
      .attr('y1', (d)=> escala_y(cuartiles[4]))
      .attr('y2', (d)=> escala_y(cuartiles[4]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })

    grupoCaja.append('line')
      .attr('x1', 5)
      .attr('x2', 5)
      .attr('y1', escala_y(cuartiles[4]))
      .attr('y2', escala_y(cuartiles[2]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })
    grupoCaja.append('line')
      .attr('x1', 5)
      .attr('x2', 5)
      .attr('y1', escala_y(cuartiles[0]))
      .attr('y2', escala_y(cuartiles[3]))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })

    grupoCaja.selectAll('circle')
      .data(valoresAtipicos)
      .join(
        (enter) => 
      enter
      .append('circle')
      .attr('cx', 5)
      .attr('cy', d => escala_y(d))
      .attr('r', 2)
      .attr('fill', 'red'))
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })
    
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
      .attr("class","txt"))
      .on("click", function() {
        console.log(clave)
        radar_marca(data, clave)
      })
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
// ******************************************************************* VIS 3 ************************************************************************************

// grafico3
let radius = Math.min(WIDTHVIS3, HEIGHTVIS3) / 2;

const contenedorAngles = SVG3
  .append("g")
  .attr("transform", `translate(${WIDTHVIS3 / 2}, ${HEIGHTVIS3 / 2})`);
  
const contenedorAreas = SVG3
  .append("g")
  .attr("transform", `translate(${WIDTHVIS3 * 0.55}, ${HEIGHTVIS3 * 0.62})`); // Adjust the translation here
  
const contenedorLabels = SVG3
  .append("g");

const contenedorLines = SVG3
  .append("g")
  .attr("transform", `translate(${WIDTHVIS3 * 0.55}, ${HEIGHTVIS3 * 0.62})`);


  function normalize(value, min, max) {
    if (min === max) {
      // Handle the case where min equals max
      return 0; // Return a default value (you can choose a different default value if desired)
    } else {
      return (value - min) / (max - min);
    }
  }

function radar_marca(datos, brand) {
  d3.selectAll("#selected")
    .html(`<img src="assets/${brand}.png" alt="${brand}" class="brand-icon" />`);
  // The first value is the mean of the release_date column
  const datosMarca = datos.filter(d => d.Brand == brand)

  const fechaSalida = d3.extent(datosMarca, (d) => d.Release_date)
  const resolucionMaxima = d3.extent(datosMarca, (d) => d.Max_resolution)
  const pixelesEfectivos = d3.extent(datosMarca, (d) => d.Effective_pixels)
  const peso = d3.extent(datosMarca, (d) => d.Weight_incbatteries)
  const precio = d3.extent(datosMarca, (d) => d.Price)

  const fechaSalidaP = d3.mean(datosMarca, (d) => d.Release_date)
  const resolucionMaximaP = d3.mean(datosMarca, (d) => d.Max_resolution)
  const pixelesEfectivosP = d3.mean(datosMarca, (d) => d.Effective_pixels)
  const pesoP = d3.mean(datosMarca, (d) => d.Weight_incbatteries)
  const precioP = d3.mean(datosMarca, (d) => d.Price)

  console.log(datosMarca.length)

  const normalizedFechaSalida = datosMarca.map(d => normalize(d.Release_date, fechaSalida[0], fechaSalida[1]));
  const normalizedResolucionMaxima = datosMarca.map(d => normalize(d.Max_resolution, resolucionMaxima[0], resolucionMaxima[1]));
  const normalizedPixelesEfectivos = datosMarca.map(d => normalize(d.Effective_pixels, pixelesEfectivos[0], pixelesEfectivos[1]));
  const normalizedPeso = datosMarca.map(d => normalize(d.Weight_incbatteries, peso[0], peso[1]));
  const normalizedPrecio = datosMarca.map(d => normalize(d.Price, precio[0], precio[1]));

  /*console.log(normalizedFechaSalida)
  console.log(normalizedResolucionMaxima)
  console.log(normalizedPixelesEfectivos)
  console.log(normalizedPeso)
  console.log(normalizedPrecio)
  console.log(precioP)*/

  // We have to check if the lenght of the data is larger than 1, otherwise normalize will return NaN, so we use the already calculated mean

  values = [
    {label: 'Fecha de salida', value: d3.mean(normalizedFechaSalida), x: WIDTHVIS3/1.75, y: HEIGHTVIS3*0.20},
    {label: 'Resolución máxima', value: d3.mean(normalizedResolucionMaxima), x: WIDTHVIS3, y: HEIGHTVIS3*0.45},
    {label: 'Pixeles efectivos ', value: d3.mean(normalizedPixelesEfectivos), x: WIDTHVIS3*0.8, y: HEIGHTVIS3*1.1},
    {label: 'Peso', value: d3.mean(normalizedPeso), x: WIDTHVIS3*0.35, y: HEIGHTVIS3*1.1},
    {label: 'Precio', value: d3.mean(normalizedPrecio), x: WIDTHVIS3*0.15, y: HEIGHTVIS3*0.45}
  ];



  const angleScale = d3.scaleBand()
    .domain(values.map((d) => d.label))
    .range([0, Math.PI * 2])
    .padding(0.2);

  const radiusScale = d3.scaleLinear()
    .domain([0, d3.max(values, (d) => d.value)])
    .range([0, radius]);

  contenedorLabels
    .selectAll(".label")
    .data(values)
    .join(
      (enter) =>
      enter.append("text")
      .attr("class", "label")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .transition()
      .duration(TIEMPO_TRANSICION)
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      ,
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y),
      (exit) => exit.remove()
      );
    
  const line = d3
    .lineRadial()
    .angle((d) => angleScale(d.label))
    .radius((d) => radiusScale(d.value))
    .curve(d3.curveLinearClosed);
  
  contenedorLines
    .selectAll(".line")
    .data(values)
    .join(
      (enter) =>
        enter.append("line")
        .attr("class", "line")
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr("stroke", "rgba(0, 0, 0, " + 0.3 + ")")
        .attr("stroke-width", 1)
        .transition() // Add transition for animation
        .duration(TIEMPO_TRANSICION)
        .attr('x2', (d) => radiusScale(d.value) * Math.cos(angleScale(d.label)))
        .attr('y2', (d) => radiusScale(d.value) * Math.sin(angleScale(d.label)))
      ,
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr('x2', (d) => radiusScale(d.value) * Math.cos(angleScale(d.label)))
          .attr('y2', (d) => radiusScale(d.value) * Math.sin(angleScale(d.label))),
      (exit) => exit.remove()
      );

  const contenedorCuadroRadar = SVG3
    .append("g")
    .attr("id", "cuadro_radar")
    .style("visibility", "hidden");
  
  const contenedorFondoRadar = contenedorCuadroRadar
    .append("rect")
    .attr("id", "fondo_tt")
    .style("fill", "yellow")
    .attr("stroke", "#113149")
    .attr("stroke-width", "1")
    .attr("width", 230)
    .attr("height", 115)
    .attr("rx", "4px");

  const txt31 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt32 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt33 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt34 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt35 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt36 = contenedorCuadroRadar.append("text").attr("class", "txt");
  const txt37 = contenedorCuadroRadar.append("text").attr("class", "txt");
  
  contenedorAreas
    .selectAll(".area")
    .data([values])
    .join(
      (enter) =>
      enter.append("path")
      .attr("class", "area")
      .attr("d", line)
      .attr("fill", "orange")
      .attr("opacity", 0)
      .transition()
      .duration(TIEMPO_TRANSICION + 600)
      .attr("opacity", 1)
      ,
      (update) =>
        update
          .transition()
          .duration(TIEMPO_TRANSICION)
          .attr("d", line)
          .attr("fill", "orange"),
      (exit) => exit.remove()
      )
      .on("mouseover", function (event, d) {
        txt31.text(`Marca: ${brand}`);
        txt32.text(`Concentración de lanzamientos: ${Math.round(fechaSalidaP)}`);
        txt33.text(`Resolución máxima promedio: ${Math.round(resolucionMaximaP)}`);
        txt34.text(`Píxeles efectivos promedio: ${Math.round(pixelesEfectivosP)}`);
        txt35.text(`Peso promedio: ${Math.round(pesoP)}`);
        txt36.text(`Precio promedio: ${Math.round(precioP)}`);
        txt37.text(`Número de cámaras: ${datosMarca.length}`);
        contenedorCuadroRadar.style("visibility", "visible");
      })
      .on("mousemove", function (event) {
        txt31
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 20 + "px");
        txt32
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 35 + "px");
        txt33
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 50 + "px")
        txt34
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 65 + "px");
        txt35
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 80 + "px");
        txt36
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 95 + "px");
        txt37
          .attr("x", event.offsetX + 25 + "px")
          .attr("y", event.offsetY + 110 + "px");

        contenedorFondoRadar
          .attr("x", event.offsetX + 20 + "px")
          .attr("y", event.offsetY + 5 + "px");
      })
      .on("mouseout", () => {
        contenedorCuadroRadar.style("visibility", "hidden");
      }); 
      ;
}
/*var radius = Math.min(WIDTHVIS3, HEIGHTVIS3) / 2;
var angleScale = d3.scaleBand()
.domain(datos.map((d) => d.label))
.range([0, Math.PI * 2])
.padding(0.2);

var radiusScale = d3.scaleLinear()
.domain([0, d3.max(datos, (d) => d.value)])
.range([0, radius]);

var line = d3.lineRadial()
.angle((d) => angleScale(d.label))
.radius((d) => radiusScale(d.value))
.curve(d3.curveLinearClosed);


console.log(datos.map((d) => d.label))

for (var i = 0; i < datos.length; i++) {
  var level = (i + 1) * radius / datos.length; 
  var lineData = datos.map(function(d) {
    return {
      angle: angleScale(d.label),
      radius: level
    };
  });

  var lineFunction = d3.lineRadial()
    .angle(function(d) { return d.angle; })
    .radius(function(d) { return d.radius; })
    .curve(d3.curveLinearClosed);

    grafico3.append("path")
    .datum(lineData)
    .attr("d", lineFunction)
    .attr("fill", "none")
    .attr("stroke", "rgba(0, 0, 0, " + 0.3 + ")")
    .attr("stroke-width", 1);
};

const area = grafico3.selectAll(".area")
.data([datos])
.join(
  (enter) =>
    enter.append("path")
      .attr("class", "area")
      .attr("d", line)
      .attr("fill", "rgba(75, 192, 192, 0.2)") 
      .attr("stroke", "rgba(75, 192, 192, 1)")
      .attr("stroke-width", 1),
  (update) =>
    update
      .transition()
      .duration(TIEMPO_TRANSICION)
      .attr("d", line)
      .attr("fill", "rgba(75, 192, 192, 0.2)")
      .attr("stroke", "rgba(75, 192, 192, 1)")
      .attr("stroke-width", 1)
      ,
      (exit) => exit.remove()
      ); 
const labels = grafico3.selectAll(".label")
.data(datos)
.join(
  (enter) =>
  enter.append("text")
  .attr("class", "label")
  .attr("x", function(d) {
    return radiusScale(d.value) * Math.cos(angleScale(d.label))
  })
  .attr("y", function(d) {
    return radiusScale(d.value) * Math.sin(angleScale(d.label))
  })
  .text((d) => d.label)
  .attr("text-anchor", "middle")
  .attr("font-size", 12)
  .attr("dy", "0.3em")
  ,
  (update) =>
    update
      .transition()
      .duration(TIEMPO_TRANSICION)
      .attr("x", function(d) {
        return radiusScale(d.value) * Math.cos(angleScale(d.label));
      })
      .attr("y", function(d) {
        return radiusScale(d.value) * Math.sin(angleScale(d.label));
      }),
      (exit) => exit.remove()
  ); */



// const widthLegend = 200,
//   heightLegend = 100;

// const svgLegend = d3
//   .select("#leyenda")
//   .attr("width", widthLegend)
//   .attr("height", heightLegend);

