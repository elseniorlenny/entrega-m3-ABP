
console.log("=== EJERCICIO 1: DIMENSIONADO DE PLACAS ===");

/* Pedir datos al usuario con prompt() */
let altoPlaca = prompt("Ingrese el largo de la placa en cm");
let anchoPlaca = prompt("Ingrese el ancho de la placa en cm");
let cantidadPlacas = prompt("Ingrese la cantidad de placas");

/* Convertir strings a numeros con Number() */
let altoMaterial = Number(altoPlaca);
let anchoMaterial = Number(anchoPlaca);
let cantidadMaterial = Number(cantidadPlacas);

/* Calcular áreas de las placas */
let areaCadaPlaca = altoMaterial * anchoMaterial;
let areaTotalPlacas = areaCadaPlaca * cantidadMaterial;

/* Mostrar resultados en consola y en pantalla */
console.log("Dimensiones de la placa:", altoMaterial + " x " + anchoMaterial + " cm");
console.log("Cantidad de placas:", cantidadMaterial);
console.log("Área de cada placa:", areaCadaPlaca + " cm2");
console.log("Área total de placas:", areaTotalPlacas + " cm2");

alert("Placa: " + altoMaterial + " x " + anchoMaterial + " cm\nÁrea total: " + areaTotalPlacas + " cm2");

/* Pedir dimensiones de la pieza a cortar */
let altoCorte = prompt("Largo de pieza en cm");
let anchoCorte = prompt("Ancho de pieza en cm");

let alto = Number(altoCorte);
let ancho = Number(anchoCorte);

/* Calcular área de la pieza */
let areaPieza = alto * ancho;
console.log("Dimensiones de la pieza:", alto + " x " + ancho + " cm");
console.log("Área de la pieza:", areaPieza + " cm2");

/* Calcular cuántas piezas caben en el material total */
let piezasQueCaben = parseInt(areaTotalPlacas / areaPieza);
console.log("Piezas que caben:", piezasQueCaben);

/* Calcular área utilizada y material sobrante */
let areaUtilizada = piezasQueCaben * areaPieza;
console.log("Área utilizada:", areaUtilizada + " cm2");

let materialSobrante = areaTotalPlacas - areaUtilizada;
console.log("Material sobrante:", materialSobrante + " cm2");

/* Calcular porcentajes de uso */
let porcentajeUtilizado = (areaUtilizada / areaTotalPlacas) * 100;
let porcentajeSobrante = (materialSobrante / areaTotalPlacas) * 100;
console.log("Porcentaje utilizado:", porcentajeUtilizado.toFixed(2) + "%");
console.log("Porcentaje sobrante:", porcentajeSobrante.toFixed(2) + "%");

/* Operaciones de suma y resta de áreas */
let sumaAreas = areaCadaPlaca + areaPieza;
console.log("Suma de áreas (placa + pieza):", sumaAreas + " cm2");

let restaAreas = areaCadaPlaca - areaPieza;
console.log("Resta de áreas (placa - pieza):", restaAreas + " cm2");

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
        console.log("Clasificación:", "Muchas piezas: " + piezasQueCaben);
        break;
    case (piezasQueCaben >= 5):
        console.log("Clasificación:", "Pocas piezas: " + piezasQueCaben);
        break;
    default:
        console.log("Clasificación:", "Muy pocas piezas: " + piezasQueCaben);
}



/* Decisiones de diseño:
   - Usé un dominio que conozco (placas de melamina) para enfocarme en JS y no complicarme con cosas nuevas
   - Seguí la estructura que dio en clases con archivos separados por ejercicio
   - Use Number() para convertir los prompt() a numero 
   - Use if/else para validar si caben piezas y switch para clasificar cantidad
   - Use console.log() para mostrar resultados en consola y alert() para mostrar resultados en pantalla
   - Este ejercicio fue la base de sintaxis para todos los siguientes */
