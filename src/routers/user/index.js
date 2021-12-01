const express = require("express")
const router = new express.Router()
const {registerUser, loginUser} = require("./utils")

router.post("/user/register", async (req, res)=>{
    try{
        const request = req.body
        console.log("/user/register", request)
        const newUser = await registerUser(
            request.email, 
            request.nickname, 
            request.password
        )
        res.status(200).send({
            status: true, 
            message: "Usuario registrado con exito",
            data:{
                email: newUser.email, 
                nickname: newUser.nickname, 
                token: newUser.token
            }
        })
    }catch(error){
        res.status(500).send({
            status: false, 
            message: "Registro Fallo", 
            data: {error: error.toString()}
        })
    }
})

router.post("/user/login", async (req,res) => {
    try{
        const request = req.body
        console.log("/user/login", request)
        const loggedUser = await loginUser(
            request.email,
            request.password
        )
        res.status(200).send({
            status: true,
            message: "Usuario ingreso con exito",
            data: {
                email: loggedUser.email,
                nickname: loggedUser.nickname,
                token: loggedUser.token
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            status: false,
            message:"Login Falló",
            data: {error: error.toString()}
        })
    }
    
})




module.exports = router