const CamerasURL ="https://raw.githubusercontent.com/JavoAlejandro/Proyecto_InfoVis/main/dataset.csv"

d3.csv(CamerasURL).then(function(datos) {
    for(let i = 0; i < datos.length; i++) {
        datos[i].Release_date = +datos[i].Release_date;
        datos[i].Max_resolution = +datos[i].Max_resolution;
        datos[i].Low_resolution = +datos[i].Low_resolution;
        datos[i].Effective_pixels = +datos[i].Effective_pixels;
        datos[i].Zoom_wide = +datos[i].Zoom_wide;
        datos[i].Zoom_tele = +datos[i].Zoom_tele;
        datos[i].Normal_focus_range = +datos[i].Normal_focus_range;
        datos[i].Macro_focus_range = +datos[i].Macro_focus_range;
        datos[i].Storage_included = +datos[i].Storage_included;
        datos[i].Weight_incbatteries = +datos[i].Weight_incbatteries;
        datos[i].Dimensions = parseFloat(datos[i].Dimensions);
        datos[i].Price = +datos[i].Price;
    }
    createCameras(datos);

    lineas_marca(datos);
})
.catch((error) => console.log(error));