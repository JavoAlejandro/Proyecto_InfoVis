const CamerasURL ="https://raw.githubusercontent.com/JavoAlejandro/Proyecto_InfoVis/main/dataset.csv"

d3.csv(CamerasURL).then(function(datos) {
    createCameras(datos);
})
.catch((error) => console.log(error));