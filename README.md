# Dimensionador de Placas - Proyecto M3

Proyecto de JavaScript para el módulo M3, orientado al cálculo y dimensionado de placas de melamina, MDF, terciado, durolac y OSB para construccion y ebanisteria.

---

## Ejercicios

Los ejercicios son archivos independientes que se ejecutan en la consola del navegador. Cada uno cubre un tema diferente de JavaScript.

### Cómo ejecutar

1. Abrir el archivo `ejercicio_X.html` en el navegador
2. Abrir la consola del navegador (F12 → pestaña Console)
3. Aceptar los permisos de `prompt()` si el navegador lo pide
4. Seguir las instrucciones en pantalla

---

### Ejercicio 1 - Dimensionado de Placas

**Archivo:** `assets/js/ejercicio_1.js`

**Qué hace:** Pide al usuario las dimensiones de una placa y de una pieza a cortar. Calcula áreas, porcentaje de material utilizado y sobrante, y clasifica la cantidad de piezas.

**Qué incluye:**
- Uso de `prompt()` para pedir datos (alto, ancho, cantidad de placas y piezas)
- Conversión de texto a número con `Number()`
- Operaciones matemáticas: suma, resta, multiplicación, división
- Uso de `alert()` para mostrar resultados
- Condicional `if/else` para validar si caben piezas
- `switch` para clasificar la cantidad de piezas (muchas/pocas/muy pocas)
- Cálculo de porcentajes de uso y material sobrante

**Flujo:**
1. Ingresa dimensiones de la placa (alto, ancho, cantidad)
2. Ingresa dimensiones de la pieza a cortar (alto, ancho)
3. Se calculan áreas, piezas que caben y porcentajes
4. Se muestra el resultado en consola y en pantalla

---

### Ejercicio 2 - Arrays de Materiales

**Archivo:** `assets/js/ejercicio_2.js`

**Qué hace:** Almacena los mismos materiales del ejercicio 1 en arreglos. Los recorre con `for` y `while`. Implementa una función que filtra materiales por ancho de placa.

**Qué incluye:**
- Arreglos de nombres, altos y anchos
- Recorrido con `for` usando indices
- Recorrido con `while` usando variable incrementada
- Función `filtrarPorAncho()` que retorna un arreglo con los materiales que coinciden
- Los 5 materiales: Melamina (183cm), Terciado (122cm), MDF (152cm), Durolac (152cm), OSB (122cm)

**Flujo:**
1. Se muestran todos los materiales con `for`
2. Se muestran todos los materiales con `while`
3. Se filtran materiales con ancho 122cm
4. Se filtran materiales con ancho 152cm
5. Los resultados se muestran en consola

---

### Ejercicio 3 - Funciones

**Archivo:** `assets/js/ejercicio_3.js`

**Qué hace:** Reimplementa las operaciones del ejercicio 1 como funciones separadas. Cada función hace una tarea y retorna un resultado. Se piden los datos al usuario y se calcula todo usando las funciones.

**Qué incluye:**
- `pedirNumero(mensaje)` - pide un dato y lo retorna como Number
- `calcularArea(largo, ancho)` - retorna largo * ancho
- `calcularAreaTotal(areaPlaca, cantidad)` - retorna área por cantidad
- `calcularPiezasQueCaben(areaTotal, areaPieza)` - retorna division entera
- `calcularPorcentaje(parte, total)` - retorna porcentaje

**Flujo:**
1. Se piden datos al usuario (dimensiones de placa y pieza)
2. Se calculan áreas usando `calcularArea()`
3. Se calcula el area total con `calcularAreaTotal()`
4. Se calculan piezas que caben, área utilizada y sobrante
5. Se calculan porcentajes con `calcularPorcentaje()`
6. Se muestra el resultado en consola y en pantalla

---

### Ejercicio 4 - Objetos e Inventario

**Archivo:** `assets/js/ejercicio_4.js`

**Qué hace:** Crea un inventario de materiales como objetos con propiedades y métodos. Implementa un programa completo con 6 pasos: seleccionar material, cantidad de placas, nombre de pieza, dimensiones y calculo final.

**Qué incluye:**
- Arreglo `materiales` con objetos que tienen:
  - Propiedades: nombre, alto, ancho, espesor, stock
  - Métodos: `calcularArea()`, `descripcion()`
- `forEach()` para recorrer el inventario
- `while(true)` anidados para validación en cada paso
- `pedirDato()` con manejo de cancelar (pregunta "Desea salir del programa?")
- `buscarMaterial()` que busca por nombre o numero
- Funciones reutilizadas del ejercicio 3
- Validación de stock (no permite placas mayores al stock disponible)

**Flujo:**
1. Seleccionar material (por numero o nombre)
2. Indicar cuantas placas usar (validado contra stock)
3. Nombre de la pieza a dimensionar
4. Largo de la pieza
5. Ancho de la pieza
6. Cantidad de piezas
7. Se calcula si caben y se muestra el resultado
8. Si no caben, indica cuantas placas adicionales necesita
9. Puede volver a calcular con otros datos

---

## Dimensionador Pro (Aplicacion Web)

El Dimensionador Pro es una aplicacion web que integra todos los conceptos de los ejercicios en una herramienta visual con interfaz de 5 pasos.

**Archivo:** `index.html` + `assets/js/dimensionador-pro.js`

### Usar en línea

👉 **[Abrir Dimensionador Pro en línea](https://elseniorlenny.github.io/entrega-m3-ABP/)**

### Cómo ejecutar localmente

1. Clonar o descargar el repositorio
2. Abrir `index.html` en el navegador
3. Seguir los 5 pasos en la interfaz visual
4. No necesita consola, todo se muestra en la pantalla

### Flujo de la aplicacion

**Paso 1 - Material:**
- Se muestra una grilla con los 5 materiales disponibles
- Hacer clic en uno para seleccionarlo
- Cada material indica sus dimensiones y stock total

**Paso 2 - Variante:**
- Seleccionar color/marca (Vesto, Masisa, Egger, Trupan, etc.)
- Seleccionar espesor (15mm, 18mm, 25mm, etc.)
- Se muestra precio y stock de la variante seleccionada
- Hacer clic en "Continuar a Piezas"

**Paso 3 - Piezas:**
- Formulario inline para agregar piezas:
  - Nombre (ej: Repisa, Puerta, Costado)
  - Alto en cm
  - Ancho en cm
  - Cantidad
  - Rotar (Si/No) - intercambia alto y ancho para mejor ajuste
- Las piezas aparecen en una tabla debajo del formulario
- Se pueden editar (clic en lápiz) o eliminar (clic en basura)
- Hacer clic en "Optimizar Corte" cuando termine

**Paso 4 - Optimizar:**
- Se ejecuta el algoritmo FFD (First-Fit Decreasing)
- Se dibuja el diagrama de corte en Canvas
- Navegar entre placas con los botones anterior/siguiente
- Se muestra resumen: placas necesarias, eficiencia, clasificación
- Se puede exportar el detalle en CSV o imagen PNG
- Hacer clic en "Continuar a Pago"

**Paso 5 - Pago:**
- Resumen del material seleccionado
- Desglose de costos en CLP (precio placa, corte, dise\u00f1o)
- Validación de stock (no permite confirmar si no hay stock suficiente)
- Hacer clic en "Confirmar Pedido"
- Aparece un mensaje de agradecimiento
- Stock se reduce automaticamente

### Materiales disponibles

| Material | Alto (cm) | Ancho (cm) | Marcas |
|----------|-----------|------------|--------|
| Melamina | 244 | 183 | Vesto, Masisa, Egger |
| MDF | 244 | 152 | Trupan |
| Terciado | 244 | 122 | Araucoply, Hepta, Sodimac |
| Durolac | 244 | 152 | Arauco |
| OSB | 244 | 122 | LP, Multiplac |

### Tecnologías

- JavaScript vanilla (sin frameworks)
- Bootstrap 5.3
- Bootstrap Icons
- SweetAlert2
- Canvas API para diagramas de corte

### Funcionalidades

- Rotación de piezas (intercambia alto/ancho)
- Navegación entre placas con controles prev/next
- Exportar detalle de cortes en CSV
- Exportar diagrama como imagen PNG
- Persistencia de datos (guardar/cargar proyecto en JSON)
- Validaciones en cada paso
- Precios referenciales de mercado chileno en CLP

---

## Notas

- Los ejercicios 1 al 4 son versiones de consola que usan `prompt()` y `alert()`
- El Dimensionador Pro es la version web con interfaz visual
- Todos los ejercicios comparten los mismos 5 materiales y sus dimensiones
- El proyecto es un prototipo en desarrollo
- En los ejercicios 1-4 la IA se usó para corregir errores y ajustar detalles menores
- En el Dimensionador Pro la IA armó la base integrando todo lo de los ejercicios, después se agregó trabajo visual y se implementaron cambios en el funcionamiento hasta llegar a la versión actual


**Autoria:** Fabian Adolfo Ortiz Peña


