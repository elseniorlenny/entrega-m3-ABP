// =====================================================
// DIMENSIONADOR PRO - Optimizador de Cortes
// Aplica: Ejercicio 1 (let/const, if/else, switch, math)
//         Ejercicio 2 (arrays, for/while, filter, map)
//         Ejercicio 3 (funciones, params, retorno, composicion)
//         Ejercicio 4 (objetos, metodos, forEach, validaciones)
// =====================================================

/* Ejercicio 4: INVENTARIO con objetos que tienen metodos */
const INVENTARIO = {
    melamina: {
        nombre: "Melamina", alto: 244, ancho: 183,
        calcularArea() { return this.alto * this.ancho; },
        descripcion() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; },
        variantes: [
            { espesor: 18, color: "Blanco", marca: "Vesto", stock: 12, precio: 32000 },
            { espesor: 18, color: "Gris", marca: "Vesto", stock: 8, precio: 34000 },
            { espesor: 18, color: "Roble", marca: "Masisa", stock: 10, precio: 38000 },
            { espesor: 18, color: "Nogal", marca: "Egger", stock: 7, precio: 42000 },
            { espesor: 15, color: "Blanco", marca: "Vesto", stock: 15, precio: 28000 }
        ]
    },
    mdf: {
        nombre: "MDF", alto: 244, ancho: 152,
        calcularArea() { return this.alto * this.ancho; },
        descripcion() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; },
        variantes: [
            { espesor: 15, color: "Crudo", marca: "Trupan", stock: 14, precio: 14000 },
            { espesor: 18, color: "Crudo", marca: "Trupan", stock: 10, precio: 16000 },
            { espesor: 25, color: "Crudo", marca: "Trupan", stock: 6, precio: 22000 }
        ]
    },
    terciado: {
        nombre: "Terciado", alto: 244, ancho: 122,
        calcularArea() { return this.alto * this.ancho; },
        descripcion() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; },
        variantes: [
            { espesor: 15, color: "Mueblista", marca: "Araucoply", stock: 8, precio: 12000 },
            { espesor: 18, color: "Mueblista", marca: "Araucoply", stock: 10, precio: 14000 },
            { espesor: 15, color: "Estructural", marca: "Hepta", stock: 6, precio: 10000 },
            { espesor: 18, color: "Estructural", marca: "Sodimac", stock: 5, precio: 11000 }
        ]
    },
    durolac: {
        nombre: "Durolac", alto: 244, ancho: 152,
        calcularArea() { return this.alto * this.ancho; },
        descripcion() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; },
        variantes: [
            { espesor: 3, color: "Blanco", marca: "Arauco", stock: 8, precio: 9000 },
            { espesor: 3, color: "Negro", marca: "Arauco", stock: 5, precio: 10000 },
            { espesor: 3, color: "Gris", marca: "Arauco", stock: 4, precio: 9500 }
        ]
    },
    osb: {
        nombre: "OSB", alto: 244, ancho: 122,
        calcularArea() { return this.alto * this.ancho; },
        descripcion() { return this.nombre + " " + this.alto + "x" + this.ancho + "cm"; },
        variantes: [
            { espesor: 11, color: "Estructural", marca: "LP", stock: 7, precio: 9000 },
            { espesor: 15, color: "Estructural", marca: "LP", stock: 6, precio: 11000 },
            { espesor: 11, color: "Estructural", marca: "Multiplac", stock: 5, precio: 8500 }
        ]
    }
};

const COLORES = [
    "#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6",
    "#06b6d4", "#f97316", "#64748b", "#14b8a6", "#dc2626"
];

/* Ejercicio 3: Funciones utilitarias con parametros y retorno */
function calcularAreaPieza(largo, ancho) { return largo * ancho; }
function calcularPorcentaje(parte, total) { return total > 0 ? (parte / total) * 100 : 0; }
function formatearCLP(n) { return "$" + n.toLocaleString("es-CL"); }

/* Ejercicio 1: Switch para clasificar resultado */
function clasificarResultado(porcentaje) {
    switch (true) {
        case (porcentaje >= 80): return "Excelente";
        case (porcentaje >= 60): return "Bueno";
        case (porcentaje >= 40): return "Regular";
        default: return "Bajo";
    }
}

/* Ejercicio 2: Funcion para valores unicos (filter) */
function unicos(arr) {
    const vistos = new Set();
    return arr.filter(function(v) { return !vistos.has(v) && vistos.add(v); });
}

/* Estado global */
var estado = {
    materialKey: null,
    variante: null,
    piezas: [],
    placasOptimizadas: [],
    placaActual: 0
};

/* ==================== PASOS ==================== */
function mostrarPaso(num) {
    document.querySelectorAll(".paso-panel").forEach(function(el) { el.classList.add("d-none"); });
    var panel = document.getElementById("paso-" + num);
    if (panel) panel.classList.remove("d-none");

    document.querySelectorAll(".step-link").forEach(function(el) {
        var paso = parseInt(el.dataset.paso);
        el.classList.remove("active", "disabled");
        if (paso < num) el.classList.add("completed");
        else if (paso === num) el.classList.add("active");
        else el.classList.add("disabled");
    });

    var indicador = document.getElementById("paso-indicador");
    if (indicador) {
        indicador.classList.remove("d-none");
        indicador.textContent = "Paso " + num + " de 5";
    }

    document.getElementById("btn-reiniciar").classList.toggle("d-none", num === 1);
}

/* ==================== MATERIALES ==================== */
function renderMateriales() {
    var grid = document.getElementById("grid-materiales");
    grid.innerHTML = "";
    Object.keys(INVENTARIO).forEach(function(key) {
        var mat = INVENTARIO[key];
        var totalStock = mat.variantes.reduce(function(s, v) { return s + v.stock; }, 0);
        var col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg";
        col.innerHTML =
            '<div class="card card-material h-100" data-key="' + key + '" style="cursor:pointer;">' +
                '<div class="card-body text-center">' +
                    '<div class="fs-1 mb-2"><i class="bi bi-box-seam text-primary"></i></div>' +
                    '<h6 class="fw-bold mb-1">' + mat.nombre + '</h6>' +
                    '<small class="text-muted d-block">' + mat.alto + 'x' + mat.ancho + 'cm</small>' +
                    '<small class="text-success">Stock: ' + totalStock + ' und</small>' +
                '</div>' +
            '</div>';
        col.querySelector(".card-material").addEventListener("click", function() {
            seleccionarMaterial(key);
        });
        grid.appendChild(col);
    });
}

function seleccionarMaterial(key) {
    document.querySelectorAll(".card-material").forEach(function(c) { c.classList.remove("border-primary", "shadow"); });
    var card = document.querySelector('.card-material[data-key="' + key + '"]');
    if (card) card.classList.add("border-primary", "shadow");

    estado.materialKey = key;
    estado.variante = null;
    estado.piezas = [];
    estado.placasOptimizadas = [];
    estado.placaActual = 0;

    var mat = INVENTARIO[key];
    document.getElementById("material-seleccionado-nombre").textContent = mat.descripcion();

    renderColorMarca();
    renderEspesores([]);
    document.getElementById("resumen-variante").style.display = "none";
    document.getElementById("btn-continuar-piezas").disabled = true;

    setTimeout(function() { mostrarPaso(2); }, 150);
}

/* ==================== COLOR / MARCA ==================== */
function renderColorMarca() {
    var mat = INVENTARIO[estado.materialKey];
    var grid = document.getElementById("grid-colores-marcas");
    grid.innerHTML = "";

    /* Ejercicio 2: map para extraer valores unicos */
    var opciones = [];
    mat.variantes.forEach(function(v) {
        var label = v.marca + " - " + v.color;
        var existe = opciones.find(function(o) { return o.label === label; });
        if (!existe) opciones.push({ label: label, marca: v.marca, color: v.color });
    });

    opciones.forEach(function(op) {
        var col = document.createElement("div");
        col.className = "col-6";
        col.innerHTML =
            '<div class="card card-variante h-100" data-marca="' + op.marca + '" data-color="' + op.color + '" style="cursor:pointer;">' +
                '<div class="card-body py-2 px-3 text-center">' +
                    '<div class="fw-bold small">' + op.marca + '</div>' +
                    '<small class="text-muted">' + op.color + '</small>' +
                '</div>' +
            '</div>';
        col.querySelector(".card-variante").addEventListener("click", function() {
            seleccionarColorMarca(op.marca, op.color);
        });
        grid.appendChild(col);
    });
}

function seleccionarColorMarca(marca, color) {
    document.querySelectorAll(".card-variante").forEach(function(c) { c.classList.remove("border-primary", "shadow"); });
    var card = document.querySelector('.card-variante[data-marca="' + marca + '"][data-color="' + color + '"]');
    if (card) card.classList.add("border-primary", "shadow");

    document.getElementById("ayuda-color").textContent = "Seleccionado: " + marca + " - " + color;

    var vars = filtrarVariantes(marca, color);
    renderEspesores(vars);
    document.getElementById("ayuda-espesor").textContent = "Seleccione un espesor";
    document.getElementById("resumen-variante").style.display = "none";
    document.getElementById("btn-continuar-piezas").disabled = true;
}

function filtrarVariantes(marca, color) {
    var mat = INVENTARIO[estado.materialKey];
    return mat.variantes.filter(function(v) {
        if (marca && v.marca !== marca) return false;
        if (color && v.color !== color) return false;
        return true;
    });
}

/* ==================== ESPESOR ==================== */
function renderEspesores(variantes) {
    var grid = document.getElementById("grid-espesores");
    grid.innerHTML = "";

    if (variantes.length === 0) {
        grid.innerHTML = '<div class="col-12 text-muted small">Seleccione un color/marca primero</div>';
        return;
    }

    variantes.forEach(function(v) {
        var col = document.createElement("div");
        col.className = "col-6 col-md-4";
        col.innerHTML =
            '<div class="card card-espesor h-100" data-espesor="' + v.espesor + '" style="cursor:pointer;">' +
                '<div class="card-body py-2 px-3 text-center">' +
                    '<div class="fw-bold">' + v.espesor + 'mm</div>' +
                    '<small class="text-success">' + v.stock + ' und</small>' +
                    '<div><small class="text-muted">' + formatearCLP(v.precio) + '/und</small></div>' +
                '</div>' +
            '</div>';
        col.querySelector(".card-espesor").addEventListener("click", function() {
            seleccionarEspesor(v);
        });
        grid.appendChild(col);
    });
}

function seleccionarEspesor(variante) {
    document.querySelectorAll(".card-espesor").forEach(function(c) { c.classList.remove("border-primary", "shadow"); });
    var card = document.querySelector('.card-espesor[data-espesor="' + variante.espesor + '"]');
    if (card) card.classList.add("border-primary", "shadow");

    estado.variante = variante;

    var resumen = document.getElementById("resumen-variante");
    resumen.style.display = "block";
    document.getElementById("resumen-titulo").textContent = variante.marca + " - " + variante.color + " " + variante.espesor + "mm";
    document.getElementById("resumen-detalle").textContent = INVENTARIO[estado.materialKey].descripcion();
    document.getElementById("resumen-stock").textContent = variante.stock + " unidades disponibles";
    document.getElementById("resumen-precio").textContent = formatearCLP(variante.precio) + " por placa";

    document.getElementById("btn-continuar-piezas").disabled = false;
}

/* ==================== PASO 3: PIEZAS ==================== */
document.getElementById("btn-continuar-piezas").addEventListener("click", function() {
    document.getElementById("variante-seleccionada-piezas").textContent =
        INVENTARIO[estado.materialKey].nombre + " " + INVENTARIO[estado.materialKey].alto + "x" + INVENTARIO[estado.materialKey].ancho + "cm | " + estado.variante.marca + " - " + estado.variante.color + " " + estado.variante.espesor + "mm";
    renderTablaPiezas();
    mostrarPaso(3);
});

document.getElementById("btn-volver-material").addEventListener("click", function() { mostrarPaso(1); });
document.getElementById("btn-volver-variante").addEventListener("click", function() { mostrarPaso(2); });
document.getElementById("btn-volver-piezas").addEventListener("click", function() { mostrarPaso(3); });
document.getElementById("btn-volver-optimizar").addEventListener("click", function() { mostrarPaso(4); });

function renderTablaPiezas() {
    var tbody = document.querySelector("#tabla-piezas tbody");
    var sinPiezas = document.getElementById("sin-piezas");
    var totales = document.getElementById("totales-piezas");

    if (estado.piezas.length === 0) {
        tbody.innerHTML = "";
        sinPiezas.classList.remove("d-none");
        totales.style.display = "none";
        document.getElementById("btn-optimizar").disabled = true;
        return;
    }

    sinPiezas.classList.add("d-none");
    totales.style.display = "block";

    var totalUnidades = 0;
    var totalArea = 0;

    tbody.innerHTML = estado.piezas.map(function(p, i) {
        var area = p.alto * p.ancho * p.cantidad;
        totalUnidades += p.cantidad;
        totalArea += area;
        return '<tr data-index="' + i + '">' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + p.nombre + '</td>' +
            '<td>' + p.alto + '</td>' +
            '<td>' + p.ancho + '</td>' +
            '<td>' + p.cantidad + '</td>' +
            '<td><span class="badge ' + (p.rotar ? 'bg-success' : 'bg-secondary') + '">' + (p.rotar ? 'Si' : 'No') + '</span></td>' +
            '<td>' + area.toLocaleString() + '</td>' +
            '<td>' +
                '<button class="btn btn-sm btn-outline-primary me-1 editar" title="Editar"><i class="bi bi-pencil"></i></button>' +
                '<button class="btn btn-sm btn-outline-danger eliminar" title="Eliminar"><i class="bi bi-trash"></i></button>' +
            '</td>' +
        '</tr>';
    }).join("");

    document.getElementById("total-piezas").textContent = estado.piezas.length;
    document.getElementById("total-unidades").textContent = totalUnidades;
    document.getElementById("total-area").textContent = totalArea.toLocaleString();
    document.getElementById("btn-optimizar").disabled = false;

    tbody.querySelectorAll(".editar").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var idx = parseInt(e.currentTarget.closest("tr").dataset.index);
            var p = estado.piezas[idx];
            document.getElementById("inp-pieza-nombre").value = p.nombre;
            document.getElementById("inp-pieza-alto").value = p.alto;
            document.getElementById("inp-pieza-ancho").value = p.ancho;
            document.getElementById("inp-pieza-cantidad").value = p.cantidad;
            document.getElementById("inp-pieza-rotar").value = p.rotar ? "1" : "0";
            estado.piezas.splice(idx, 1);
            renderTablaPiezas();
            document.getElementById("inp-pieza-nombre").focus();
        });
    });
    tbody.querySelectorAll(".eliminar").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var idx = parseInt(e.currentTarget.closest("tr").dataset.index);
            estado.piezas.splice(idx, 1);
            renderTablaPiezas();
        });
    });
}

/* ==================== AGREGAR PIEZA (inline) ==================== */
document.getElementById("btn-agregar-pieza").addEventListener("click", agregarPieza);

function agregarPieza() {
    var nombre = document.getElementById("inp-pieza-nombre").value.trim();
    var alto = parseFloat(document.getElementById("inp-pieza-alto").value);
    var ancho = parseFloat(document.getElementById("inp-pieza-ancho").value);
    var cantidad = parseInt(document.getElementById("inp-pieza-cantidad").value);
    var rotar = document.getElementById("inp-pieza-rotar").value === "1";

    if (!nombre || isNaN(alto) || isNaN(ancho) || isNaN(cantidad) || alto <= 0 || ancho <= 0 || cantidad <= 0) {
        Swal.fire("Error", "Complete todos los campos correctamente", "warning");
        return;
    }

    var mat = INVENTARIO[estado.materialKey];
    if (alto > mat.alto && alto > mat.ancho) {
        Swal.fire("Error", "El alto supera ambas dimensiones de la placa", "warning");
        return;
    }
    if (ancho > mat.ancho && ancho > mat.alto) {
        Swal.fire("Error", "El ancho supera ambas dimensiones de la placa", "warning");
        return;
    }

    estado.piezas.push({ nombre: nombre, alto: alto, ancho: ancho, cantidad: cantidad, rotar: rotar });

    document.getElementById("inp-pieza-nombre").value = "";
    document.getElementById("inp-pieza-alto").value = "";
    document.getElementById("inp-pieza-ancho").value = "";
    document.getElementById("inp-pieza-cantidad").value = "1";
    document.getElementById("inp-pieza-rotar").value = "0";
    document.getElementById("inp-pieza-nombre").focus();

    renderTablaPiezas();
}

document.getElementById("btn-limpiar-piezas").addEventListener("click", function() {
    estado.piezas = [];
    renderTablaPiezas();
});

/* ==================== ALGORITMO DE OPTIMIZACION ==================== */
/* Ejercicio 2: while + for anidados para colocacion greedy (bottom-left) */
/* Ejercicio 3: funciones compuestas para calcular areas y porcentajes */

document.getElementById("btn-optimizar").addEventListener("click", optimizar);

function optimizar() {
    if (!estado.materialKey || !estado.variante || estado.piezas.length === 0) {
        Swal.fire("Faltan datos", "Seleccione material, variante y agregue piezas", "warning");
        return;
    }

    var mat = INVENTARIO[estado.materialKey];
    var stock = estado.variante.stock;
    var areaPlaca = mat.calcularArea();
    var areaTotalDisponible = areaPlaca * stock;

    var piezasExpandidas = expandirPiezas();

    /* Ejercicio 1: validar si caben individualmente */
    for (var i = 0; i < piezasExpandidas.length; i++) {
        var p = piezasExpandidas[i];
        var cabeNormal = p.ancho <= mat.ancho && p.alto <= mat.alto;
        var cabeRotada = p.rotar && p.alto <= mat.ancho && p.ancho <= mat.alto;
        if (!cabeNormal && !cabeRotada) {
            Swal.fire("Pieza muy grande", '"' + p.nombre + '" (' + p.alto + 'x' + p.ancho + ') no cabe en la placa ' + mat.alto + 'x' + mat.ancho, "error");
            return;
        }
    }

    var placas = [];
    var restantes = piezasExpandidas.slice().sort(function(a, b) { return (b.alto * b.ancho) - (a.alto * a.ancho); });

    while (restantes.length > 0) {
        var grid = crearGrid(mat.ancho, mat.alto);
        var colocadas = [];
        var nuevasRestantes = [];

        for (var j = 0; j < restantes.length; j++) {
            var pieza = restantes[j];
            var pos = buscarPosicion(grid, mat.ancho, mat.alto, pieza);
            if (pos) {
                marcarGrid(grid, pos.x, pos.y, pos.w, pos.h);
                var colocada = {};
                for (var k in pieza) colocada[k] = pieza[k];
                colocada.x = pos.x;
                colocada.y = pos.y;
                colocada.w = pos.w;
                colocada.h = pos.h;
                colocada.rotada = pos.rotada;
                colocadas.push(colocada);
            } else {
                nuevasRestantes.push(pieza);
            }
        }

        if (colocadas.length === 0) break;
        placas.push(colocadas);
        restantes = nuevasRestantes;
    }

    estado.placasOptimizadas = placas;
    estado.placaActual = 0;

    var areaUsada = 0;
    placas.forEach(function(placa) {
        placa.forEach(function(pc) { areaUsada += pc.alto * pc.ancho; });
    });
    var areaTotalPiezas = 0;
    piezasExpandidas.forEach(function(p) { areaTotalPiezas += p.alto * p.ancho; });
    var pctEficiencia = calcularPorcentaje(areaTotalPiezas, areaTotalDisponible);
    var clasificacion = clasificarResultado(pctEficiencia);

    mostrarResumenOptimizacion(areaTotalDisponible, areaUsada, areaTotalPiezas, pctEficiencia, clasificacion, placas.length, stock);
    dibujarPlacas();
    mostrarPaso(4);
}

function expandirPiezas() {
    var lista = [];
    estado.piezas.forEach(function(p, idx) {
        for (var i = 0; i < p.cantidad; i++) {
            lista.push({ nombre: p.nombre, alto: p.alto, ancho: p.ancho, rotar: p.rotar, colorIdx: idx, originalIdx: idx });
        }
    });
    return lista.sort(function(a, b) { return (b.alto * b.ancho) - (a.alto * a.ancho); });
}

function crearGrid(w, h) {
    var grid = [];
    for (var y = 0; y < h; y++) {
        grid[y] = [];
        for (var x = 0; x < w; x++) grid[y][x] = false;
    }
    return grid;
}

function buscarPosicion(grid, wPlaca, hPlaca, pieza) {
    var orientaciones = pieza.rotar ? [
        { w: pieza.ancho, h: pieza.alto, rotada: true },
        { w: pieza.alto, h: pieza.ancho, rotada: false }
    ] : [{ w: pieza.ancho, h: pieza.alto, rotada: false }];

    for (var o = 0; o < orientaciones.length; o++) {
        var ori = orientaciones[o];
        if (ori.w > wPlaca || ori.h > hPlaca) continue;
        for (var y = 0; y <= hPlaca - ori.h; y++) {
            for (var x = 0; x <= wPlaca - ori.w; x++) {
                if (libre(grid, x, y, ori.w, ori.h)) return { x: x, y: y, w: ori.w, h: ori.h, rotada: ori.rotada };
            }
        }
    }
    return null;
}

function libre(grid, x, y, w, h) {
    for (var dy = 0; dy < h; dy++)
        for (var dx = 0; dx < w; dx++)
            if (grid[y + dy][x + dx]) return false;
    return true;
}

function marcarGrid(grid, x, y, w, h) {
    for (var dy = 0; dy < h; dy++)
        for (var dx = 0; dx < w; dx++)
            grid[y + dy][x + dx] = true;
}

/* ==================== RESUMEN OPTIMIZACION (Paso 4) ==================== */
function mostrarResumenOptimizacion(areaTotal, areaUsada, areaPiezas, pctEficiencia, clasificacion, numPlacas, stock) {
    var mat = INVENTARIO[estado.materialKey];
    var v = estado.variante;

    document.getElementById("optimizacion-info").textContent =
        mat.nombre + " | " + v.marca + " - " + v.color + " " + v.espesor + "mm";

    var html =
        '<div class="mb-3">' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Placa</span><span class="fw-bold">' + mat.descripcion() + '</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Variante</span><span class="fw-bold">' + v.espesor + 'mm ' + v.color + '</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Stock disponible</span><span class="fw-bold">' + stock + ' und</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Placas necesarias</span><span class="fw-bold">' + numPlacas + ' / ' + stock + '</span></div>' +
        '</div>' +
        '<hr>' +
        '<div class="mb-3">' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Area total disponible</span><span>' + (areaTotal / 10000).toFixed(2) + ' m2</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Area piezas</span><span>' + (areaPiezas / 10000).toFixed(2) + ' m2</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Eficiencia</span><span class="fw-bold ' + (pctEficiencia >= 70 ? 'text-success' : pctEficiencia >= 40 ? 'text-warning' : 'text-danger') + '">' + pctEficiencia.toFixed(1) + '%</span></div>' +
            '<div class="d-flex justify-content-between mb-1"><span class="text-muted">Clasificacion</span><span class="fw-bold">' + clasificacion + '</span></div>' +
        '</div>';

    if (numPlacas > stock) {
        html += '<div class="alert alert-danger py-2 mb-0 small"><i class="bi bi-exclamation-triangle me-1"></i>Faltan ' + (numPlacas - stock) + ' placas en stock</div>';
    }

    document.getElementById("resumen-optimizacion").innerHTML = html;
}

/* ==================== DIBUJO (Canvas) ==================== */
function dibujarPlacas() {
    var container = document.getElementById("canvas-container");
    container.innerHTML = "";

    if (estado.placasOptimizadas.length === 0) {
        container.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 text-muted"><i class="bi bi-image fs-1"></i></div>';
        return;
    }

    var mat = INVENTARIO[estado.materialKey];
    var controles = document.getElementById("controles-placa");
    controles.style.display = estado.placasOptimizadas.length > 1 ? "flex" : "none";

    dibujarUnaPlaca(container, estado.placasOptimizadas[0], 0, estado.placasOptimizadas.length, mat);
    actualizarInfoPlaca();
}

function dibujarUnaPlaca(container, piezas, indice, total, mat) {
    var canvas = document.createElement("canvas");
    var maxW = 550, maxH = 450;
    var escala = Math.min(maxW / mat.ancho, maxH / mat.alto);
    canvas.width = Math.ceil(mat.ancho * escala);
    canvas.height = Math.ceil(mat.alto * escala);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    piezas.forEach(function(p) {
        ctx.fillStyle = COLORES[p.colorIdx % COLORES.length];
        ctx.fillRect(p.x * escala, p.y * escala, p.w * escala, p.h * escala);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x * escala, p.y * escala, p.w * escala, p.h * escala);

        var fontSize = Math.min(12, Math.floor(Math.min(p.w * escala, p.h * escala) / 5));
        if (fontSize >= 7) {
            ctx.fillStyle = "#fff";
            ctx.font = "bold " + fontSize + "px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(p.nombre, p.x * escala + p.w * escala / 2, p.y * escala + p.h * escala / 2);
        }

        ctx.fillStyle = "#333";
        ctx.font = "9px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(p.w + "x" + p.h, p.x * escala + 3, p.y * escala + 12);
    });

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if (total > 1) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(canvas.width - 65, 5, 60, 24);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText((indice + 1) + " / " + total, canvas.width - 35, 21);
    }

    container.innerHTML = "";
    container.appendChild(canvas);
}

function actualizarInfoPlaca() {
    var info = document.getElementById("info-placa-actual");
    info.textContent = (estado.placaActual + 1) + " / " + estado.placasOptimizadas.length;
}

document.getElementById("btn-placa-prev").addEventListener("click", function() {
    if (estado.placasOptimizadas.length <= 1) return;
    estado.placaActual = (estado.placaActual - 1 + estado.placasOptimizadas.length) % estado.placasOptimizadas.length;
    var mat = INVENTARIO[estado.materialKey];
    dibujarUnaPlaca(document.getElementById("canvas-container"), estado.placasOptimizadas[estado.placaActual], estado.placaActual, estado.placasOptimizadas.length, mat);
    actualizarInfoPlaca();
});

document.getElementById("btn-placa-next").addEventListener("click", function() {
    if (estado.placasOptimizadas.length <= 1) return;
    estado.placaActual = (estado.placaActual + 1) % estado.placasOptimizadas.length;
    var mat = INVENTARIO[estado.materialKey];
    dibujarUnaPlaca(document.getElementById("canvas-container"), estado.placasOptimizadas[estado.placaActual], estado.placaActual, estado.placasOptimizadas.length, mat);
    actualizarInfoPlaca();
});

document.getElementById("btn-reoptimizar").addEventListener("click", function() { optimizar(); });

/* ==================== EXPORTAR ==================== */
document.getElementById("btn-exportar-csv").addEventListener("click", exportarCSV);
document.getElementById("btn-exportar-img").addEventListener("click", exportarImagen);

function exportarCSV() {
    if (estado.placasOptimizadas.length === 0) { Swal.fire("Sin datos", "Primero optimice", "warning"); return; }
    var csv = "Placa,Pieza,Alto,Ancho,X,Y,Rotada\n";
    estado.placasOptimizadas.forEach(function(placa, i) {
        placa.forEach(function(p) {
            csv += (i + 1) + "," + p.nombre + "," + p.alto + "," + p.ancho + "," + p.x + "," + p.y + "," + (p.rotada ? "Si" : "No") + "\n";
        });
    });
    var blob = new Blob([csv], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "corte-detalle.csv"; a.click();
    URL.revokeObjectURL(url);
}

function exportarImagen() {
    var canvas = document.getElementById("canvas-container").querySelector("canvas");
    if (!canvas) { Swal.fire("Sin imagen", "No hay diagrama para exportar", "warning"); return; }
    var link = document.createElement("a");
    link.download = "placa-" + (estado.placaActual + 1) + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

/* ==================== PASO 5: PAGO ==================== */
document.getElementById("btn-ir-pago").addEventListener("click", function() { mostrarPaso(5); renderPago(); });

function renderPago() {
    var mat = INVENTARIO[estado.materialKey];
    var v = estado.variante;
    var numPlacas = estado.placasOptimizadas.length;

    document.getElementById("pago-detalle-material").innerHTML =
        '<div class="row align-items-center">' +
            '<div class="col-auto"><i class="bi bi-box-seam fs-2 text-primary"></i></div>' +
            '<div class="col">' +
                '<div class="fw-bold">' + mat.nombre + '</div>' +
                '<small class="text-muted">' + mat.alto + 'x' + mat.ancho + 'cm | ' + v.espesor + 'mm</small><br>' +
                '<small class="text-muted">' + v.marca + ' - ' + v.color + '</small>' +
            '</div>' +
            '<div class="col-auto text-end">' +
                '<div class="fw-bold">' + numPlacas + ' placas</div>' +
                '<small class="text-muted">Piezas: ' + estado.piezas.length + ' tipos</small>' +
            '</div>' +
        '</div>';

    var subtotalMaterial = v.precio * numPlacas;
    var costoCorte = numPlacas * 5000;
    var costoDiseño = 15000;
    var total = subtotalMaterial + costoCorte + costoDiseño;

    document.querySelector("#tabla-costos tbody").innerHTML =
        '<tr><td>Placa ' + mat.nombre + ' (' + v.marca + ' ' + v.color + ')</td>' +
            '<td class="text-end">' + formatearCLP(v.precio) + '</td>' +
            '<td class="text-end">' + numPlacas + '</td>' +
            '<td class="text-end">' + formatearCLP(subtotalMaterial) + '</td></tr>' +
        '<tr><td>Servicio de corte (guillotina)</td>' +
            '<td class="text-end">' + formatearCLP(5000) + '</td>' +
            '<td class="text-end">' + numPlacas + '</td>' +
            '<td class="text-end">' + formatearCLP(costoCorte) + '</td></tr>' +
        '<tr><td>Diseño y optimizacion</td>' +
            '<td class="text-end">' + formatearCLP(costoDiseño) + '</td>' +
            '<td class="text-end">1</td>' +
            '<td class="text-end">' + formatearCLP(costoDiseño) + '</td></tr>';

    document.getElementById("pago-total").textContent = formatearCLP(total);

    var stockDisponible = v.stock;
    var stockOk = numPlacas <= stockDisponible;
    var stockHtml = stockOk
        ? '<div class="d-flex align-items-center text-success"><i class="bi bi-check-circle-fill fs-3 me-2"></i><div><div class="fw-bold">Stock suficiente</div><small>' + stockDisponible + ' unidades disponibles, necesita ' + numPlacas + '</small></div></div>'
        : '<div class="d-flex align-items-center text-danger"><i class="bi bi-x-circle-fill fs-3 me-2"></i><div><div class="fw-bold">Stock insuficiente</div><small>Disponible: ' + stockDisponible + ' | Necesita: ' + numPlacas + '</small></div></div>';

    document.getElementById("pago-stock-detalle").innerHTML = stockHtml;
    document.getElementById("btn-confirmar-pago").disabled = !stockOk;
}

document.getElementById("btn-confirmar-pago").addEventListener("click", function() {
    var mat = INVENTARIO[estado.materialKey];
    var v = estado.variante;
    var numPlacas = estado.placasOptimizadas.length;

    v.stock -= numPlacas;

    Swal.fire({
        title: "¡Pedido Confirmado!",
        html: '<p class="mb-2">Gracias por su preferencia.</p>' +
              '<p class="small text-muted mb-0">Tu pedido de <strong>' + numPlacas + ' placa(s)</strong> de ' +
              mat.nombre + ' ' + v.marca + ' - ' + v.color + ' ha sido registrado.</p>' +
              '<p class="small text-muted">Stock restante: <strong>' + v.stock + ' unidades</strong></p>',
        icon: "success",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false
    }).then(function() {
        reiniciar();
    });
});

document.getElementById("btn-nuevo-pedido").addEventListener("click", reiniciar);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);

function reiniciar() {
    estado.materialKey = null;
    estado.variante = null;
    estado.piezas = [];
    estado.placasOptimizadas = [];
    estado.placaActual = 0;

    document.querySelectorAll(".card-material, .card-variante, .card-espesor").forEach(function(c) {
        c.classList.remove("border-primary", "shadow");
    });

    document.getElementById("grid-materiales").innerHTML = "";
    document.getElementById("grid-colores-marcas").innerHTML = "";
    document.getElementById("grid-espesores").innerHTML = "";
    document.querySelector("#tabla-piezas tbody").innerHTML = "";
    document.getElementById("inp-pieza-nombre").value = "";
    document.getElementById("inp-pieza-alto").value = "";
    document.getElementById("inp-pieza-ancho").value = "";
    document.getElementById("inp-pieza-cantidad").value = "1";
    document.getElementById("inp-pieza-rotar").value = "0";
    document.getElementById("resumen-variante").style.display = "none";
    document.getElementById("btn-continuar-piezas").disabled = true;
    document.getElementById("btn-optimizar").disabled = true;
    document.getElementById("sin-piezas").classList.remove("d-none");
    document.getElementById("totales-piezas").style.display = "none";
    document.getElementById("canvas-container").innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 text-muted"><i class="bi bi-image fs-1"></i></div>';
    document.getElementById("controles-placa").style.display = "none";
    document.getElementById("resumen-optimizacion").innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-hourglass-split fs-1"></i><p class="mt-2 small">Ejecute la optimizacion para ver resultados</p></div>';
    document.getElementById("pago-stock-detalle").innerHTML = '<div class="text-center py-4 text-muted"><i class="bi bi-hourglass-split fs-1"></i><p class="mt-2 small">Verificando stock...</p></div>';
    document.getElementById("btn-confirmar-pago").disabled = true;

    renderMateriales();
    mostrarPaso(1);
}

/* ==================== INICIALIZACION ==================== */
renderMateriales();
mostrarPaso(1);

/* Decisiones de diseno:
   - Cree este archivo como un "ejercicio 5" porque el 4 ya estaba muy cargado de cosas
   - Use IA para que tomara todos los ejercicios anteriores y armara la base de la app visual
   - Eleji Bootstrap 5.3 para la interfaz responsive y SweetAlert2 porque ya se habia mencionado en clases
   - Use datos reales del mercado chileno: marcas (Vesto, Masisa, Egger, Trupan, Arauco, etc.) y precios en CLP
   - Use Canvas para los diagramas de cortey poder descargar diagramas en imagenes
   - Active GitHub Pages para que se pueda abrir desde un link */
