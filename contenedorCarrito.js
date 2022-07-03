const fs = require('fs')
class ContainerCarrito {
    constructor(filename){
        this.filename = filename; 
    }

    crearCarrito(){
        try{
            const carritos = []      
            const carrito = {
                id: 1,
                timestamp: Date.now(),
                productos: []
            }
            carritos.push(carrito) 
            fs.writeFileSync(this.filename, JSON.stringify(carritos))
            console.log(carrito.id)     
        } catch(error){
            throw new Error(error)
        }
    }

    // Mostrar carrito
    async leer(){
        try{
            let contenido = await fs.promises.readFile(this.filename, 'utf-8')
            console.log(contenido)
            return JSON.parse(contenido)
        }catch(error){
            throw new Error(error)
        }    
    }

    // borra el carrito completo
    async borrarPorId(id){
        try {
            const carritos = await this.leer()
            const carrito = carritos.find(carrito => carrito.id === id)
            const index = carritos.indexOf(carrito)

            carritos.splice(index, 1)
            await  fs.promises.writeFile(this.filename, JSON.stringify(carritos))
        } catch(error) {
            throw new Error(error)
        }
    }

    // Agrega un producto al carrito 
    async agregarProducto(id, producto){
        try{
            const carritos = await this.leer()
            const carrito = carritos.find(carrito => carrito.id === id)
            carrito.producto.push(producto)
            await fs.promises.writeFile(this.filename, JSON.stringify(carritos))
            console.log(carrito)
        } catch(error){
            throw new Error(error)
        }
    }

    async borrarProducto(id, prodId){
        try{
            const carritos = await this.leer()
            const carrito = carritos.find(carrito => carrito.id === id)
            const producto = carrito.productos.find(producto => producto.id == prodId)
            const index = carrito.productos.indexOf(producto)

            carrito.productos.splice(index, 1)
            await fs.promises.writeFile(this.filename, JSON.stringify(carritos))
            console.log(carrito)
        }catch(error){
            throw new Error(error)
        }
    }

}

module.exports = ContainerCarrito