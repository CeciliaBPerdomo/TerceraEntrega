const express = require ('express')

const routes = require('./routes')
const routesCarrito = require('./routesCarrito')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/productos', routes)
app.use('/carrito', routesCarrito)

/* Server listen */
const PORT = process.env.PORT || 8080

const srv = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))