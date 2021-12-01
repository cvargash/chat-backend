const jwt = require("jsonwebtoken")

function authenticate(req, res, next){
    try{
        const token = req.headers["accesstoken"]
        const email = req.headers["email"]
        const nickname = req.headers["nickname"]
        if(email==null){
            throw new Error("Debes ingresar el correo")
        }
        if(token==null){
            throw new Error("No se envio el token")
        }
        if(nickname==null){
            throw new Error("Debes ingresar el usuario")
        }
        let auth
        try{
        auth = jwt.verify(token, process.env.SIGN_PASSWORD)
        }catch (error){
            throw new Error("Firma invalida")
        }
        if(auth == null || auth.email != email || auth.nickname != nickname){
            throw new Error ("Error el token no es válido")
        }
        return next()

    }catch(error){
        console.log(error)
        res.status(401).send({
            status: false,
            message:"Autenticacion inválida",
            data: {error: error.toString()}
        })
    }

}

module.exports = { authenticate }
