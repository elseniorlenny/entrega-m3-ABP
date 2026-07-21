
console.log("=== EJERCICIO 3: FUNCIONES ===");

/* Función que pide un número al usuario y lo retorna */
function pedirNumero(mensaje) {
    return Number(prompt(mensaje));
}

/* Función que calcula área de un rectángulo */
function calcularArea(largo, ancho) {
    return largo * ancho;
}

/* Función que calcula el área total de varias placas */
function calcularAreaTotal(areaPlaca, cantidad) {
    return areaPlaca * cantidad;
}

/* Función que calcula cuántas piezas caben en un área total */
function calcularPiezasQueCaben(areaTotal, areaPieza) {
    return parseInt(areaTotal / areaPieza);
}

/* Función que calcula un porcentaje */
function calcularPorcentaje(parte, total) {
    return (parte / total) * 100;
}

/* Pedir datos al usuario */
let altoPlaca = pedirNumero("Ingrese el alto de la placa en cm:");
let anchoPlaca = pedirNumero("Ingrese el ancho de la placa en cm:");
let cantidadPlacas = pedirNumero("Ingrese la cantidad de placas:");

let altoPieza = pedirNumero("Ingrese el alto de la pieza a cortar en cm:");
let anchoPieza = pedirNumero("Ingrese el ancho de la pieza a cortar en cm:");

/* Calcular áreas usando las funciones */
let areaPlaca = calcularArea(altoPlaca, anchoPlaca);
let areaTotal = calcularAreaTotal(areaPlaca, cantidadPlacas);
let areaPieza = calcularArea(altoPieza, anchoPieza);

/* Calcular piezas que caben y areas */
let piezasQueCaben = calcularPiezasQueCaben(areaTotal, areaPieza);
let areaUtilizada = piezasQueCaben * areaPieza;
let areaSobrante = areaTotal - areaUtilizada;

/* Calcular porcentajes */
let porcentajeUtilizado = calcularPorcentaje(areaUtilizada, areaTotal);
let porcentajeSobrante = calcularPorcentaje(areaSobrante, areaTotal);

/* Mostrar resultados en consola */
console.log("Placa: " + altoPlaca + " x " + anchoPlaca + " cm");
console.log("Cantidad de placas: " + cantidadPlacas);
console.log("Pieza: " + altoPieza + " x " + anchoPieza + " cm");
console.log("Área de la placa: " + areaPlaca + " cm2");
console.log("Área total disponible: " + areaTotal + " cm2");
console.log("Área de la pieza: " + areaPieza + " cm2");
console.log("Piezas que caben: " + piezasQueCaben);
console.log("Material utilizado: " + porcentajeUtilizado.toFixed(2) + "%");
console.log("Material sobrante: " + porcentajeSobrante.toFixed(2) + "%");

/* Mostrar alerta con el resultado */
alert("Caben " + piezasQueCaben + " piezas en sus placas.\nMaterial utilizado: " + porcentajeUtilizado.toFixed(2) + "%\nMaterial sobrante: " + porcentajeSobrante.toFixed(2) + "%");

/* Decisiones de diseño:
   - Reimplementé las operaciones del ejercicio 1 como funciones separadas
   - Cada función hace una sola tarea y retorna un resultado (calcularArea, calcularAreaTotal, etc.)
   - Usé IA como guía para revisar si la estructura de las funciones era correcta porque acá ya me costaba 
   - Las funciones son reutilizables y se componen entre si (composición)
   - Mantuve la misma sintaxis y nombres que el ejercicio 1 para consistencia */
