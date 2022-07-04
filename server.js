const express = require ('express')

/* Rutas */
// Productos
const routes = require('./routes')
// Carrito
const routesCarrito = require('./routesCarrito')
// Autenticación
const routerAuth = require('./routes/auth.routes')

const app = express()
const morgan = require('morgan')

/* Autenticación */
const passport = require('passport') 
const session = require('express-session')
const mongoStore = require('connect-mongo')
const MongoStore = require('connect-mongo')
require('./src/auth/passport/localAuth')

require('dotenv').config()

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "palabrasecreta",
        resave: false, 
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_STORE_URI,
        })
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/productos', routes)
app.use('/carrito', routesCarrito)
app.use('/', routerAuth)

/* Server listen */
app.get('/', (req, res) => {
    return res.render('home')
})

const PORT = process.env.PORT || 8080

/* Server listen */
const srv = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))