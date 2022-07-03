const container = require('./contenedor')

const nuevoContenedor = new container('./productos.txt')

const prodDisponibles = async () => {
    return await nuevoContenedor.leer()
}

/*const guardarProductos = async () => {
    await nuevoContenedor.escribir(producto)
}*/

module.exports = prodDisponibles