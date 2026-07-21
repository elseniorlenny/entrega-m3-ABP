
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

/* Función que filtra elementos según una condición */
function filtrarPorAncho(listaAnchos, listaNombres, anchoBuscado) {
    let resultado = [];
    for (let i = 0; i < listaAnchos.length; i++) {
        if (listaAnchos[i] === anchoBuscado) {
            resultado.push(listaNombres[i]);
        }
    }
    return resultado;
}

/* Usar la función para filtrar materiales con ancho 122 cm */
let materiales122 = filtrarPorAncho(anchos, nombres, 122);
console.log("Materiales con ancho 122 cm (usando función):");
for (let i = 0; i < materiales122.length; i++) {
    console.log("- " + materiales122[i]);
}

/* Usar la función para filtrar materiales con ancho 152 cm */
let materiales152 = filtrarPorAncho(anchos, nombres, 152);
console.log("Materiales con ancho 152 cm (usando funcion):");
for (let i = 0; i < materiales152.length; i++) {
    console.log("- " + materiales152[i]);
}

/* Decisiones de diseño:
   - Usé arrays paralelos (nombres, altos, anchos) como pedía el ejercicio
   - Recorrí con for y con while para mostrar ambos métodos
   - Originalmente había dejado como comentarios el for y while, después cambié la letra de la variable para que no se repita y los dejé activos
   - La funci\u00f3n filtrarPorAncho() usa un for cl\u00e1sico con if para filtrar
   - Tome los mismos 5 materiales del ejercicio-1.html para mantener consistencia */
