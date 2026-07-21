
console.log("=== EJERCICIO 2: ARRAYS DE MATERIALES ===");

/* Crear arreglos con listas de materiales */
let nombres = ["Melamina", "Terciado", "MDF", "Durolac", "OSB"];
let altos = [244, 244, 244, 244, 244];
let anchos = [183, 122, 152, 152, 122];

/* Recorrer arreglos con for */
console.log("Materiales disponibles (for):");
for (let i = 0; i < nombres.length; i++) {
    console.log("- " + nombres[i] + ": " + altos[i] + " x " + anchos[i] + " cm");
}
console.log("");

/* Recorrer arreglos con while */
console.log("Materiales disponibles (while):");
let j = 0;
while (j < nombres.length) {
    console.log("- " + nombres[j] + ": " + altos[j] + " x " + anchos[j] + " cm");
    j++;
}
console.log("");

/* Funcion que filtra elementos segun una condicion */
function filtrarPorAncho(listaAnchos, listaNombres, anchoBuscado) {
    let resultado = [];
    for (let i = 0; i < listaAnchos.length; i++) {
        if (listaAnchos[i] === anchoBuscado) {
            resultado.push(listaNombres[i]);
        }
    }
    return resultado;
}

/* Usar la funcion para filtrar materiales con ancho 122 cm */
let materiales122 = filtrarPorAncho(anchos, nombres, 122);
console.log("Materiales con ancho 122 cm (usando funcion):");
for (let i = 0; i < materiales122.length; i++) {
    console.log("- " + materiales122[i]);
}

/* Usar la funcion para filtrar materiales con ancho 152 cm */
let materiales152 = filtrarPorAncho(anchos, nombres, 152);
console.log("Materiales con ancho 152 cm (usando funcion):");
for (let i = 0; i < materiales152.length; i++) {
    console.log("- " + materiales152[i]);
}

/* Decisiones de diseno:
   - Use arrays paralelos (nombres, altos, anchos) como pedia el ejercicio
   - Recorri con for y con while para mostrar ambos metodos
   - originalmente habia dejado como comentarios el for y while, despues camvie la letra de la variable para que no se repita y los deje activos
   - La funcion filtrarPorAncho() usa un for clasico con if para filtrar
   - Tome los mismos 5 materiales del ejercicio-1.html para mantener consistencia */
