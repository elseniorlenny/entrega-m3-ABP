
console.log("=== EJERCICIO 1: DIMENSIONADO DE PLACAS ===");

/* Pedir datos al usuario con prompt() */
let altoPlaca = prompt("Ingrese el largo de la placa en cm");
let anchoPlaca = prompt("Ingrese el ancho de la placa en cm");
let cantidadPlacas = prompt("Ingrese la cantidad de placas");

/* Convertir strings a numeros con Number() */
let altoMaterial = Number(altoPlaca);
let anchoMaterial = Number(anchoPlaca);
let cantidadMaterial = Number(cantidadPlacas);

/* Calcular areas de las placas */
let areaCadaPlaca = altoMaterial * anchoMaterial;
let areaTotalPlacas = areaCadaPlaca * cantidadMaterial;

/* Mostrar resultados en consola y en pantalla */
console.log("Dimensiones de la placa:", altoMaterial + " x " + anchoMaterial + " cm");
console.log("Cantidad de placas:", cantidadMaterial);
console.log("Area de cada placa:", areaCadaPlaca + " cm2");
console.log("Area total de placas:", areaTotalPlacas + " cm2");

alert("Placa: " + altoMaterial + " x " + anchoMaterial + " cm\nArea total: " + areaTotalPlacas + " cm2");

/* Pedir dimensiones de la pieza a cortar */
let altoCorte = prompt("Largo de pieza en cm");
let anchoCorte = prompt("Ancho de pieza en cm");

let alto = Number(altoCorte);
let ancho = Number(anchoCorte);

/* Calcular area de la pieza */
let areaPieza = alto * ancho;
console.log("Dimensiones de la pieza:", alto + " x " + ancho + " cm");
console.log("Area de la pieza:", areaPieza + " cm2");

/* Calcular cuantas piezas caben en el material total */
let piezasQueCaben = parseInt(areaTotalPlacas / areaPieza);
console.log("Piezas que caben:", piezasQueCaben);

/* Calcular area utilizada y material sobrante */
let areaUtilizada = piezasQueCaben * areaPieza;
console.log("Area utilizada:", areaUtilizada + " cm2");

let materialSobrante = areaTotalPlacas - areaUtilizada;
console.log("Material sobrante:", materialSobrante + " cm2");

/* Calcular porcentajes de uso */
let porcentajeUtilizado = (areaUtilizada / areaTotalPlacas) * 100;
let porcentajeSobrante = (materialSobrante / areaTotalPlacas) * 100;
console.log("Porcentaje utilizado:", porcentajeUtilizado.toFixed(2) + "%");
console.log("Porcentaje sobrante:", porcentajeSobrante.toFixed(2) + "%");

/* Operaciones de suma y resta de areas */
let sumaAreas = areaCadaPlaca + areaPieza;
console.log("Suma de areas (placa + pieza):", sumaAreas + " cm2");

let restaAreas = areaCadaPlaca - areaPieza;
console.log("Resta de areas (placa - pieza):", restaAreas + " cm2");

/* Evaluar si caben las piezas con if/else */
if (piezasQueCaben > 0) {
    console.log("Resultado:", "Caben " + piezasQueCaben + " piezas en tus placas.");
    alert("Caben " + piezasQueCaben + " piezas en tus placas");
    alert("Material utilizado: " + porcentajeUtilizado.toFixed(2) + "%");
    alert("Material sobrante: " + porcentajeSobrante.toFixed(2) + "%");
} else {
    console.log("Resultado:", "No se puede calcular");
    alert("No se puede calcular");
}

/* Clasificar la cantidad de piezas con switch */
switch (true) {
    case (piezasQueCaben >= 10):
        console.log("Clasificacion:", "Muchas piezas: " + piezasQueCaben);
        break;
    case (piezasQueCaben >= 5):
        console.log("Clasificacion:", "Pocas piezas: " + piezasQueCaben);
        break;
    default:
        console.log("Clasificacion:", "Muy pocas piezas: " + piezasQueCaben);
}
