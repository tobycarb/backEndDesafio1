class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los parámetros son obligatorios.");
            return;
        }
        let existe = this.products.find(prod => prod.code == code)
        if (existe) {
            console.log(`el producto con codigo ${code} ya se agrego y no se puede repetir`);
            return;
        }
        else {
            let id = 1
            if (this.products.length > 0) {
                id = this.products[this.products.length - 1].id + 1;
            }
            let nuevoProducto = {
                id,
                title, description,
                price, thumbnail,
                code, stock
            }
            this.products.push(nuevoProducto)
        }

    }
    getProductById(id) {
        // Utiliza el método find para buscar un producto por su id
        const productoEncontrado = this.products.find(prod => prod.id === id);
        
        if (productoEncontrado) {
            console.log(`Producto encontrado: ${productoEncontrado.title}`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}.`);
        }
    }
    getProducts(){
        return this.products;
    }
    
}
let productManager = new ProductManager();
console.log(productManager.getProducts());
productManager.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123",25);
console.log(productManager.getProducts());
productManager.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc13",25);
console.log(productManager.getProducts());
productManager.getProductById(1)

