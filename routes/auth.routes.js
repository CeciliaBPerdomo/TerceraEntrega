/* Autenticación  de usuarios */
const { Router } = require('express')
const routerAuth = Router()
const passport = require('passport')

// Rutas estaticas
routerAuth.get('/login', (req, res) => {
    res.render('./auth/login')
})

routerAuth.get('/registrarse', (req, res) => {
    res.render('./auth/registrarse')
})

routerAuth.post('registrarse', passport.authenticate('local-register', {
    successRedirect: '/', 
    failureRedirect: '/error', 
    passReqToCallback: true,
}))

routerAuth.get('/error', (req, res) => {
     res.render('./error')
})

module.exports = routerAuth