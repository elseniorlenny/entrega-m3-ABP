

/* Inventario de materiales como objetos con propiedades y métodos */

let materiales = [
    {
        nombre: "Melamina", alto: 244, ancho: 183, espesor: 18, stock: 12,
        calcularArea: function() { return this.alto * this.ancho; },
        descripcion: function() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; }
    },
    {
        nombre: "Terciado", alto: 244, ancho: 122, espesor: 12, stock: 15,
        calcularArea: function() { return this.alto * this.ancho; },
        descripcion: function() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; }
    },
    {
        nombre: "MDF", alto: 244, ancho: 152, espesor: 15, stock: 8,
        calcularArea: function() { return this.alto * this.ancho; },
        descripcion: function() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; }
    },
    {
        nombre: "Durolac", alto: 244, ancho: 152, espesor: 3, stock: 6,
        calcularArea: function() { return this.alto * this.ancho; },
        descripcion: function() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; }
    },
    {
        nombre: "OSB", alto: 244, ancho: 122, espesor: 12, stock: 10,
        calcularArea: function() { return this.alto * this.ancho; },
        descripcion: function() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; }
    }
];

/* Recorrer el inventario con forEach */
console.log("=== EJERCICIO 4: OBJETOS ===");
console.log("Materiales disponibles (usando forEach):");
materiales.forEach(function(material) {
        console.log("- " + material.descripcion() + " | Espesor: " + material.espesor + "mm | Stock: " + material.stock + " | Área: " + material.calcularArea() + " cm2");
});

/* Funciones reutilizadas */
function calcularArea(largo, ancho) {
    return largo * ancho;
}

function calcularAreaTotal(areaPlaca, cantidad) {
    return areaPlaca * cantidad;
}

function calcularPorcentaje(parte, total) {
    return (parte / total) * 100;
}

/* Función que pide datos al usuario y maneja el cancelar */
function pedirDato(mensaje) {
    let respuesta = prompt(mensaje);
    if (respuesta === null) {
        let salir = confirm("Desea salir del programa?");
        if (salir) {
            alert("Muchas gracias por utilizar el dimensionador");
            return null;
        }
        return undefined;
    }
    return respuesta;
}

/* Buscar material por nombre o numero */
function buscarMaterial(texto) {
    let textoLower = texto.toLowerCase().trim();
    let numero = parseInt(textoLower);

    if (!isNaN(numero) && numero >= 1 && numero <= materiales.length) {
        return materiales[numero - 1];
    }

    for (let i = 0; i < materiales.length; i++) {
        if (materiales[i].nombre.toLowerCase() === textoLower) {
            return materiales[i];
        }
    }

    return null;
}

/* Programa principal */
function main() {
    while (true) {

        /* PASO 1: Seleccionar material */
        let material = null;
        while (true) {
            let lista = "";
            for (let i = 0; i < materiales.length; i++) {
                lista = lista + (i + 1) + ". " + materiales[i].nombre + "\n";
            }

            let respuesta = pedirDato("¿Qué material necesita?\n\n" + lista);

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            material = buscarMaterial(respuesta);
            if (material != null) {
                console.log("Material seleccionado:", material.nombre);
                break;
            }

            alert("Material no válido. Intente de nuevo.");
        }

        /* PASO 2: Cuántas placas se quieren */
        let cantidadPlacas = 0;
        while (true) {
            let respuesta = pedirDato(
                material.nombre + "\n" +
                "Espesor: " + material.espesor + "mm\n" +
                "Stock: " + material.stock + " placas\n\n" +
                "¿Cuántas placas desea usar?:"
            );

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            cantidadPlacas = parseInt(respuesta);
            if (!isNaN(cantidadPlacas) && cantidadPlacas > 0 && cantidadPlacas <= material.stock) {
                console.log("Placas seleccionadas:", cantidadPlacas);
                break;
            }

            alert("Cantidad inválida. Intente de nuevo.");
        }

        /* PASO 3: Nombre de la pieza a dimensionar */
        let nombrePieza = "";
        while (true) {
            let respuesta = pedirDato("Nombre de la pieza a dimensionar (ej: repisa, puerta):");

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            if (respuesta.trim() != "") {
                nombrePieza = respuesta.trim();
                break;
            }

            alert("El nombre no puede estar vacío.");
        }

        /* PASO 4: Largo de la pieza */
        let largoPieza = 0;
        while (true) {
            let respuesta = pedirDato("Ingrese el Largo de \"" + nombrePieza + "\" en cm:");

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            largoPieza = Number(respuesta);
            if (!isNaN(largoPieza) && largoPieza > 0) break;

            alert("Dato invalido. Intente de nuevo.");
        }

        /* PASO 5: Ancho de la pieza */
        let anchoPieza = 0;
        while (true) {
            let respuesta = pedirDato("Ingrese el Ancho de \"" + nombrePieza + "\" en cm:");

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            anchoPieza = Number(respuesta);
            if (!isNaN(anchoPieza) && anchoPieza > 0) break;

            alert("Dato invalido. Intente de nuevo.");
        }

        /* PASO 6: Cantidad de piezas a dimensionar */
        let cantidadPiezas = 0;
        while (true) {
            let respuesta = pedirDato("Ingrese la cantidad de piezas de \"" + nombrePieza + "\" que necesita:");

            if (respuesta === null) return;
            if (respuesta === undefined) continue;

            cantidadPiezas = Number(respuesta);
            if (!isNaN(cantidadPiezas) && cantidadPiezas > 0) break;

            alert("Dato invalido. Intente de nuevo.");
        }

        /* Calcular resultado usando las funciones */
        let areaPlaca = calcularArea(material.alto, material.ancho);
        let areaTotal = calcularAreaTotal(areaPlaca, cantidadPlacas);
        let areaPieza = calcularArea(largoPieza, anchoPieza);
        let areaNecesaria = calcularAreaTotal(areaPieza, cantidadPiezas);
        let porcentajeUsado = calcularPorcentaje(areaNecesaria, areaTotal);
        let porcentajeSobrante = 100 - porcentajeUsado;
        let caben = areaNecesaria <= areaTotal;

        console.log("--- CÁLCULO ---");
        console.log("Pieza:", nombrePieza);
        console.log("Dimensiones de la pieza:", largoPieza + "x" + anchoPieza + " cm");
        console.log("Cantidad de piezas:", cantidadPiezas);
        console.log("Area de una placa:", areaPlaca + " cm2");
        console.log("Area total disponible:", areaTotal + " cm2");
        console.log("Area necesaria:", areaNecesaria + " cm2");
        console.log("Porcentaje usado:", porcentajeUsado.toFixed(2) + "%");
        console.log("Porcentaje sobrante:", porcentajeSobrante.toFixed(2) + "%");

        /* Mostrar resultado */
        if (caben) {
            console.log("Resultado:", "Las piezas SI caben");
            alert(
                "Las piezas SI caben\n\n" +
                "Material: " + material.nombre + "\n" +
                "Dimensiones de placa: " + material.alto + "x" + material.ancho + "cm\n" +
                "Placas necesarias: " + cantidadPlacas + "\n\n" +
                "Pieza: " + nombrePieza + "\n" +
                "Dimensiones de pieza: " + largoPieza + "x" + anchoPieza + "cm\n" +
                "Cantidad de piezas: " + cantidadPiezas + "\n\n" +
                "Porcentaje utilizado: " + porcentajeUsado.toFixed(2) + "%\n" +
                "Porcentaje sin usar: " + porcentajeSobrante.toFixed(2) + "%"
            );

            alert("Muchas gracias por utilizar el dimensionador");
            break;
        }

        let placasNecesarias = Math.ceil(areaNecesaria / areaPlaca);
        console.log("Resultado:", "Las piezas NO caben");
        console.log("Placas necesarias:", placasNecesarias);
        alert(
            "Las piezas NO caben\n\n" +
            "Material: " + material.nombre + "\n" +
            "Dimensiones de placa: " + material.alto + "x" + material.ancho + "cm\n" +
            "Stock disponible: " + material.stock + " placas\n" +
            "Placas que necesita: " + placasNecesarias + " placas"
        );

        let volverACalcular = confirm("¿Desea realizar otro cálculo con nuevas medidas o placas?");
        if (volverACalcular) {
            continue;
        }

        alert("Muchas gracias por utilizar el dimensionador");
        break;
    }
}

main();

/* Decisiones de diseño:
   - Usé objetos con métodos (calcularArea, descripcion) para representar materiales
   - Continué con los materiales de ejercicios anteriores agregando espesor y stock
   - Usé forEach para recorrer el inventario y mostrarlo en consola
   - Reutilice las funciones del ejercicio 3 (calcularArea, calcularAreaTotal, calcularPorcentaje)
   - Usé cantidades limitadas ya que se complicaría mucho con más datos (lo dejé para el siguiente ejercicio)
   - El programa tiene un flujo de 6 pasos con while(true) anidados para validar cada entrada
   - Agregué manejo de cancelar: si el usuario presiona cancel, pregunto si quiere salir o continuar
   - La función buscarMaterial() acepta número o nombre para flexibilidad
   - Fui agregando características mientras probaba (desarrollo iterativo)
   - Usé IA para corregir errores y saber qué me faltaba agregar
   - Reutilicé las funciones del ejercicio 3 (calcularArea, calcularAreaTotal, calcularPorcentaje) */
