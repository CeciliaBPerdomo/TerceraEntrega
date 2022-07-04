/* Autenticación local */
const passport = require('passport')
const { findOne } = require('../../../models/user.models.js')
const LocalStrategy = require('passport-local').Strategy

/* Usuario de mongo */
const User = require('../../../models/user.models.js')

passport.use('local-register',
    new LocalStrategy({
        usernameField: "mail",
        passwordField: "password",
        passReqToCallback: true,

    }, 
    async (req, mail, password, done) => {
        const checkUserExists = await User.findOne({ email })
        if (checkUserExists){
            done(null, false, {message: 'Usuario con email ya registrado'})
        } else {
            const newUser = new User({ nombre, apellido, mail })
            newUser.password = newUser.encryptPass(password)
            const savedUser = await newUser.save() // se guarda en la base de datos
            done(null, savedUser._id)
        }
    })
)

passport.serializeUser((userId, done) => {
    done(null, userId)
})

passport.deserializeUser(async(userId, done) => {
    const user = await User.findById(userId)
    done(null, user)
})