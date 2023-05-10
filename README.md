# Sprint-4 Primer pre-entrega Router y multer

## Funcionalidades Product Manager

- `addProduct(data)`: Agrega un producto al array y lo guarda dentro de `data.json`.
- `getProducts()`: Muestra los productos.
- `getProductById(id)`: Devuelve el producto con el id que se ingresa.
- `updateProduct(id, data)`: Actualiza la información del producto con el id que se ingresa y lo guarda en `data.json`.
- `deleteProduct(id)`: Elimina el producto del archivo `data.json`.

## Funcionalidades Cart Manager
- `addCart(cartId, productId)`: Agrega un producto al carrito correspondiente. Si no se especifica un carrito, se crea uno nuevo vacío.
- `getCarts()`: Devuelve todos los carritos guardados.
- `getCartById(id)`: Devuelve el carrito con el id especificado.
- `updateCart(cartId, newProducts)`: Actualiza los productos en el carrito especificado.
- `delete(cartId, productId, units)`: Elimina un producto del carrito especificado.
- `writeFile(data_json)`: Guarda los cambios en el archivo cart.json.

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

## Cómo levantar el servidor

1. Clona el proyecto a tu computadora con el siguiente comando: `git clone https://github.com/manuel-25/sprint-1.git`
2. Abre una terminal y dirígete a la carpeta del repositorio: `cd sprint-01`
3. Ejecuta el comando `npm run start` para iniciar el servidor.

