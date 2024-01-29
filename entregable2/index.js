const ProductManager = require('./productManager');

const runTests = async () => {
    const productManager = new ProductManager('products.json');

    console.log('\n\n**getProducts() en este punto ,debería ser un arreglo vacío **');
    console.log('Productos iniciales:', productManager.getProducts() ,'\n');

    console.log('**Añadiendo un producto...**') 
    productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    });

    console.log('**getProducts() después de añadir un producto**') 
    console.log('Productos después de añadir item:', productManager.getProducts(),'\n');

    console.log('**getProductById**');
    const id = 1; // Asumiendo que el primer producto tiene id 1
    console.log('Producto con ID 1:', productManager.getProductById(id),'\n');

    console.log('**updateProduct**'); 
    productManager.updateProduct(id, { price: 250 });
    console.log('**Producto actualizado con ID 1:**', productManager.getProductById(id),'\n');

    console.log('**deleteProduct**'); 
    productManager.deleteProduct(id);
    console.log('Productos después de eliminar:', productManager.getProducts(),'\n');
};

runTests().catch(error => console.error(error));
