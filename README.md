# TodoFierro - Plataforma de Comercio Electrónico de Decoraciones de Fierro

¡Bienvenido a TodoFierro, la plataforma de comercio electrónico especializada en decoraciones hechas con fierro! A continuación, encontrarás una descripción detallada de cómo funciona nuestra aplicación web y sus características principales.

## Descripción General

TodoFierro es una plataforma de comercio electrónico desarrollada con Express y Node.js, diseñada para exhibir y vender productos de decoración hechos con fierro de alta calidad. La aplicación ofrece una experiencia de compra segura y fácil de usar. Aquí hay un vistazo a las características clave de TodoFierro:

### Interfaz Responsiva

TodoFierro presenta una interfaz responsiva que permite a los usuarios explorar y comprar productos desde cualquier dispositivo. Destacamos productos a través de un banner interactivo para mejorar la experiencia del usuario.

### Catálogo de Productos

El catálogo incluye una amplia variedad de decoraciones de fierro, organizadas por categorías, materiales y tipos de productos. Los usuarios pueden filtrar y explorar productos fácilmente.

### Detalles de Producto

Cada producto en TodoFierro cuenta con detalles completos, incluyendo imágenes, descripciones y opciones de compra a través de WhatsApp.

### Navegación por Categorías y Filtros

Los usuarios pueden explorar y buscar productos según categorías específicas y aplicar diversos filtros para encontrar fácilmente lo que están buscando.

### Conexión a WhatsApp

La plataforma facilita la compra directa mediante la integración de WhatsApp, permitiendo a los usuarios contactar rápidamente para realizar pedidos.

### Plataforma en Línea

TodoFierro está disponible en [todofierro.ar](https://todofierro.ar), con un servidor en la nube, reverse proxy (Nginx) y certificado SSL para garantizar la seguridad y accesibilidad.

### Tecnologías Utilizadas

- **Plantillas EJS:** TodoFierro utiliza EJS para la generación de plantillas y la presentación de vistas.

- **MongoDB:** La base de datos de TodoFierro está implementada en MongoDB, ofreciendo flexibilidad y escalabilidad para almacenar información de productos y usuarios.

- **Modelo DAO y Controladores:** La aplicación sigue una estructura de Modelo DAO (Data Access Object) para interactuar con la base de datos. Los controladores manejan la lógica de negocio y la interacción con las vistas.

- **Middleware:** Utilizamos middleware en la aplicación para manejar diversas funcionalidades, como la autenticación, manejo de errores, y más.

- **Configuración con `config.js`:** La configuración de la aplicación, incluyendo la URL de conexión a MongoDB y la URL de la aplicación, está centralizada en el archivo `config.js`.

## Clonar y Ejecutar el Servidor

Para clonar y ejecutar el servidor de TodoFierro, sigue estos pasos:

```bash
1. Clona el proyecto a tu computadora: `https://github.com/manuel-25/TodoFierro.git`
2. Abre una terminal y navega a la carpeta del repositorio: `cd TodoFierro`
3. Ejecuta el comando `npm install` para instalar las dependencias.
4. Inicia el servidor con `npm start`.

