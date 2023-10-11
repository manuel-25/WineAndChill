# Wine and Chill - Plataforma de Comercio Electrónico de Vinos

¡Bienvenido a Wine and Chill, la plataforma de comercio electrónico especializada en vinos! A continuación, encontrarás una descripción detallada de cómo funciona nuestra aplicación web y sus principales funciones.

## Descripción General

Wine and Chill es una plataforma de comercio electrónico que ofrece una amplia variedad de vinos de alta calidad para satisfacer tus gustos y preferencias. La aplicación está diseñada para brindar una experiencia de compra segura y cómoda a los amantes del vino. Aquí hay un vistazo a las características clave de Wine and Chill:

### Autenticación Segura

Wine and Chill implementa un sistema de autenticación seguro utilizando Passport.js y Bcrypt para cifrar las contraseñas de los usuarios. Los usuarios pueden crear cuentas de forma segura y autenticarse en la plataforma. Además, ofrecemos la opción de iniciar sesión utilizando GitHub para mayor comodidad.

### Catálogo de Productos

Nuestra plataforma presenta un catálogo completo de vinos, que se pueden explorar y filtrar según las siguientes categorías:

- **Categorías de Vinos:** Filtra por categorías de vinos, como tintos, blancos o dulces, para encontrar exactamente lo que estás buscando.

- **Bodegas:** Explora vinos de diferentes bodegas y descubre productos exclusivos y de alta calidad.

- **Tipos de Vinos:** Filtra los productos por tipos específicos, como espumosos, de guarda o varietales.

### Chat en Vivo

Wine and Chill va más allá de una experiencia de compra estándar y ofrece una función de chat en vivo. Utilizando la tecnología de sockets, los clientes pueden comunicarse con el soporte en tiempo real para resolver preguntas o recibir asistencia.

### Perfil de Usuario

Cada usuario tiene un perfil personalizado donde pueden ver y modificar sus detalles de cuenta. Los usuarios pueden agregar una foto de perfil, actualizar su dirección y número de teléfono, y acceder a información importante sobre su cuenta.

### Panel de Administrador

Para los administradores, Wine and Chill proporciona un panel de administrador que muestra información detallada de todos los usuarios registrados. Esto incluye detalles como su correo electrónico, rol, última conexión y otros datos importantes. Los administradores también tienen la capacidad de administrar documentos.

### Carrito de Compras

Los usuarios pueden agregar productos al carrito de compras, donde pueden ver los productos seleccionados y actualizar las cantidades o eliminarlos según sus necesidades. También hay un botón para finalizar la compra, que genera un ticket con todos los detalles y envía un correo electrónico al usuario con la información de la compra.

### Compra de Productos

Cuando los usuarios deciden finalizar su compra, se genera un ticket que incluye detalles sobre la compra, como el código del ticket, la fecha y la cantidad total. Además, se envía un correo electrónico al usuario con la información del ticket y un resumen de la compra.

### Restablecimiento de Contraseña

Wine and Chill ofrece funciones de restablecimiento de contraseña mediante el uso de tokens, lo que permite a los usuarios recuperar el acceso a sus cuentas de manera segura y eficiente.

### Administración de Productos

Los administradores tienen acceso a vistas que les permiten crear, actualizar y eliminar productos en la plataforma. Esto asegura que el catálogo de vinos se mantenga actualizado y completo.

## Clonar y Abrir el Servidor

Para clonar y ejecutar el servidor de Wine and Chill, sigue estos pasos:

```bash
1. Clona el proyecto a tu computadora con el siguiente comando: `https://github.com/manuel-25/WineAndChill.git`
2. Abre una terminal y dirígete a la carpeta del repositorio: `cd sprint-01`
3. Ejecuta el comando `npm run start` para iniciar el servidor.
```

## Rutas de Postman para productos

- **GET todos los productos:** `http://localhost:8080/api/products`
- **GET un producto específico:** `http://localhost:8080/api/products/:pid`
- **POST agregar un nuevo producto:** `http://localhost:8080/api/products`
- **PUT actualizar un producto específico:** `http://localhost:8080/api/products/:pid`
- **DELETE un producto específico:** `http://localhost:8080/api/products/:pid`

## Rutas de Postman para carritos

- **GET todos los carritos:** `http://localhost:8080/api/carts`
- **GET un carrito específico:** `http://localhost:8080/api/carts/:cartId`
- **POST agregar un nuevo carrito:** `http://localhost:8080/api/carts`
- **PUT actualizar unidades de un producto en un carrito:** `http://localhost:8080/api/carts/:cartId/product/:pid/:units`
- **POST agregar un nuevo producto a un carrito:** `http://localhost:8080/api/carts/:cartId/product/:pid`
- **DELETE eliminar un producto de un carrito:** `http://localhost:8080/api/carts/:cartId/product/:pid/:units`

## Rutas de las Vistas

- **Página de Inicio:** `/`
- **Todos los Productos:** `/products`
- **Detalle de un Producto:** `/products/:pid`
- **Crear Producto:** `/new_product`
- **Carrito de Compras:** `/cart`
- **Chat en Vivo:** `/chat`
- **Registro:** `/register`
- **Iniciar Sesión:** `/login`
- **Perfil de Usuario:** `/profile`
- **Olvidé mi Contraseña:** `/forgot-password`
