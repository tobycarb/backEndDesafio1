const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath; // Establece la ruta al archivo proporcionada
        this.products = [];
        this.loadProductsFromFile();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Comprueba si se proporcionan los parámetros requeridos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los parámetros son obligatorios.");
            return;
        }

        // Comprueba si un producto con el mismo código ya existe
        const existingProduct = this.products.find(prod => prod.code === code);
        if (existingProduct) {
            console.log(`El producto con código ${code} ya se agregó y no se puede repetir.`);
            return;
        } else {
            const id = this.generateUniqueId();
            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products.push(newProduct);
            this.saveProductsToFile();
        }
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        if (product) {
            console.log(`Producto encontrado: ${product.title}`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}.`);
        }
    }

    updateProduct(id, updatedData) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex !== -1) {
            // Copia el producto existente y actualízalo con los datos proporcionados
            const updatedProduct = { ...this.products[productIndex], ...updatedData };
            this.products[productIndex] = updatedProduct;
            this.saveProductsToFile();
            console.log(`Producto con ID ${id} actualizado.`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}.`);
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProductsToFile();
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}.`);
        }
    }

    getProducts() {
        return this.products;
    }

    generateUniqueId() {
        let id = 1;
        if (this.products.length > 0) {
            id = this.products[this.products.length - 1].id + 1;
        }
        return id;
    }

    saveProductsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            this.products = [];
        }
    }
}

module.exports = ProductManager;
//testing
//1)Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager('products.json');
//2)Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo 
const arreglo=manager.getProducts();
console.log(arreglo);
//3)Se llamará al método “addProduct” con los campos:
manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
//4) Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(arreglo);
//5)Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
manager.getProductById(1)
manager.getProductById(2)
//6)Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
manager.updateProduct(1,{price:500,title:"producto modificado"})
console.log(manager);
//7) Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
manager.deleteProduct(2);
manager.deleteProduct(1);
console.log(manager);
