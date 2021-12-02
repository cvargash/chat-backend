const express = require("express")
const { authenticate} = require("../../middleware/auth")
const router = new express.Router()
const {createGroup} = require("./utils")


//Crear grupo
router.post("/chat/create-group", async (req, res)=> {
    try{
        const request = req.body
        const createGroup = await createGroup(
            request.name,
            request.adminNickname,
            request.adminUser,
            request.initialMessage
        )
        res.status(200).send({
            status: true, 
            message: "Grupo registrado con exito",
            data:{chat: createGroup}
        })
    }catch(error){
        console.log("EROR", error)
        res.status(500).send({
            status: false, 
            message: "Creación de grupo Fallo", 
            data: {error: error.toString()}
        })
    }
})

module.exports = router
