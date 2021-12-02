const Chat = require("../../models/chat")
const { v4 } = require ('uuid')
const moment = require("moment")


async function createGroup(name, adminNickname, adminUser, initialMessage){
    const chat = await Chat.create({
        name,
        adminNickname,
        users: [
            adminUser
        ],
        messages: [
            {
                id: v4(),
                sender: adminUser,
                date: moment().unix(),
                body: initialMessage
            }
        ]
    }).catch((error)=>{
        console.log(error)
        throw new Error("Error al crear el chat")
    })
    return {
        name: chat.name,
        adminNickname: chat.adminNickname,
        user: chat.user,
        messages: chat.messages
    }
}

module.exports = {createGroup}