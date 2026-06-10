const { load } = require("../utils/database");

module.exports = async(sock,chat,sender)=>{
const db=load("./database/users.json");
const u=db[sender];

if(!u)
return sock.sendMessage(chat,{text:"No profile"});

sock.sendMessage(chat,{
text:u.inventory.map((c,i)=>
`${i+1}. ${c.name}`
).join("\n") || "Empty"
});
};
