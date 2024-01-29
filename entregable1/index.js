const ProductManager = require('./productManager');

const productManager = new ProductManager();

console.log("**debe ser[] vacio** \n")
console.log(productManager.getProducts());
console.log("**agregando producto** \n")
try {
    productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    });

    console.log("**debe aparecer el producto recien agregado**\n")
    console.log(productManager.getProducts());

    console.log("**Se agrega un producto con el mismo código**\n");
    productManager.addProduct({
        title: "producto prueba 2",
        description: "Otra descripción",
        price: 300,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 30
    });
} catch (e) {
    console.error(e.message);
}


try {
    console.log("**debe mostrar el producto** \n")
    console.log(productManager.getProductById(1));
    console.log("**debe mostrar el error al no existir el producto** \n")
    console.log(productManager.getProductById(2));

} catch (e) {
    console.error(e.message);
}