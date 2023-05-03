# Sprint-3 Desafío Entregable Servidor con express

## Funcionalidades Product Manager

- `addProduct(data)`: Agrega un producto al array y lo guarda dentro de `data.json`.
- `getProducts()`: Muestra los productos.
- `getProductById(id)`: Devuelve el producto con el id que se ingresa.
- `updateProduct(id, data)`: Actualiza la información del producto con el id que se ingresa y lo guarda en `data.json`.
- `deleteProduct(id)`: Elimina el producto del archivo `data.json`.

## Funcionalidades Cart Manager
- `addCart(productId, quantity)`: Agrega un carrito con un producto y cantidad determinados.
- `getCarts()`: Devuelve todos los carritos guardados.
- `getCartById(id)`: Devuelve el carrito con el id especificado.
- `writeFile(data_json)`: Guarda los cambios en el archivo cart.json.
- `init(path)`: Inicializa el objeto CartManager, cargando los datos del archivo cart.json.
- `constructor(path)`: Crea una instancia de CartManager con la ruta especificada para el archivo cart.json.


## Cómo levantar el servidor

1. Clona el proyecto a tu computadora con el siguiente comando: `git clone https://github.com/manuel-25/sprint-1.git`
2. Abre una terminal y dirígete a la carpeta del repositorio: `cd sprint-01`
3. Ejecuta el comando `npm run dev` para iniciar el servidor.

