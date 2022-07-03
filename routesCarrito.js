const express = require('express')
const routerCarrito = express.Router()

const container = require('./contenedorCarrito')
const datos = new container('./carrito.txt')

/* Inicializa el carrito, con id 1
 datos.crearCarrito() */

/* Muestra el carrito */
routerCarrito.get('/', async(req, res) => {
    let carrito = await datos.leer()
    res.render('carrito', { carrito })
})

/* Guarda productos en el carrito */
routerCarrito.post('/guardar/:id/productos', async(req, res) => {
    const { id } = req.params
    const producto = req.body
    await datos.agregarProducto(id, producto) 
})

/* Elige el carrito según el id*/ 
routerCarrito.get('/:id', async(req, res) => {
    const { id } = req.params
    let carrito = await datos.leer()
    let carritoId = carrito.filter(carrito => carrito.id === parseInt(id))
    console.log(carritoId)
    res.send(carritoId)
})

/*Borra un producto del carrito */
routerCarrito.delete('/:id/productos/:idprod', async(req, res) => {
    const { id } = req.params.id
    //const producto = req.body
    const { idprod } = req.params.idprod
    await datos.borrarProducto(id, idprod)
    res.send(await datos.leer())
})

/* Modificar el carrito */
routerCarrito.put('/:id/productos/:idprod', async(req, res) => {

})

// Borra el carrito
routerCarrito.delete('/borrar/:id', async(req, res) => {
    const { id } = req.params
    datos.borrarPorId(id)
    res.json(await datos.leer)
})

module.exports = routerCarrito