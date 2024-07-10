# Registro de Ventas en un Supermercado

Este es un proyecto simple para registrar las ventas diarias de un supermercado, categorizarlas y generar un informe en formato CSV al finalizar el día.

## Características

- Registro de ventas con categorías de productos.
- Cálculo y aplicación de descuentos para productos de cuidado personal.
- Listado de ventas realizadas durante el día.
- Resumen de ingresos acumulados por categoría.
- Cantidad de ventas por hora.
- Generación de un archivo CSV con las ventas del día.
- Limpieza de los datos al finalizar el día.

## Requisitos

- Node.js y npm instalados en tu sistema.

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Navega al directorio del proyecto en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias necesarias (Express).

## Uso

1. Ejecuta el servidor Node.js con el comando:

   ```bash
   node server.js
   ```

2. Abre tu navegador y navega a <http://localhost:3001>.

3. Usa el formulario para registrar las ventas. Las secciones de resumen y la tabla de ventas se mostrarán automáticamente al agregar una venta.

4. Al finalizar el día, haz clic en el botón "Finalizar Día" para generar un archivo CSV con los datos de las ventas y limpiar todos los datos.

## Estructura del Proyecto

- public:

  - index.html: El archivo HTML principal con la estructura del formulario y las secciones de resumen.

  - sales.js: El archivo JavaScript que maneja la lógica de las ventas, cálculos de descuento y generación del CSV.

  - styles.css: El archivo CSS que contiene los estilos para una apariencia moderna y limpia.

- server.js: El archivo del servidor Node.js para servir los archivos estáticos.

## Código Principal

### index.html

Contiene el formulario para registrar ventas, la tabla de ventas, y las secciones de resumen y tique diario.

### sales.js

Contiene las funciones JavaScript para:

- Agregar una venta.
- Calcular descuentos.
- Actualizar la tabla de ventas.
- Actualizar los resúmenes por categoría y por hora.
- Generar el archivo CSV.
- Limpiar los datos al finalizar el día.
- styles.css
- Contiene los estilos CSS para mejorar la apariencia del proyecto.

### server.js

- Un servidor Node.js simple usando Express para servir los archivos estáticos y permitir el acceso a la página en <http://localhost:3001>.

#### Ejemplo de Uso

- Registra una venta llenando el formulario y haciendo clic en "Agregar Venta".

- Observa cómo se actualizan automáticamente la tabla de ventas y las secciones de resumen.

- Al finalizar el día, haz clic en "Finalizar Día" para descargar un archivo CSV con los datos de las ventas y limpiar todos los datos.
