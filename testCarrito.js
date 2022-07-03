const container = require('./contenedorCarrito')
const nuevoContenedor = new container('./carrito.txt')

const main = async() => {
    await nuevoContenedor.crearCarrito
    console.log('Nuevo carrito creado')
}

main()