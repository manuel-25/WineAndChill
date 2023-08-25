WINE AND CHILL ECOMMERCE 

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

## Rutas de las vistas

- **Index/Home:** `/`
- **Todos los productos:** `/products`
- **Detalle de un producto:** `/products/:pid`
- **Crear producto:** `/new_product`
- **Carrito:** `/cart`
- **Chat:** `/chat`

## Cómo levantar el servidor

1. Clona el proyecto a tu computadora con el siguiente comando: `git clone https://github.com/manuel-25/sprint-1.git`
2. Abre una terminal y dirígete a la carpeta del repositorio: `cd sprint-01`
3. Ejecuta el comando `npm run start` para iniciar el servidor.

