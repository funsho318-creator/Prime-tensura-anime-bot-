const { load, save } = require("../utils/database");

module.exports = async(sock,chat,sender)=>{
const db=load("./database/users.json");
const u=db[sender];

if(u.inventory.length<2)
return sock.sendMessage(chat,{text:"Need 2 characters"});

const a=u.inventory.pop();
const b=u.inventory.pop();

const fused={
name:a.name+"-"+b.name,
rarity:"FUSION",
power:(a.power+b.power)+20
};

u.inventory.push(fused);

save("./database/users.json",db);

sock.sendMessage(chat,{
text:`🧬 Fusion: ${fused.name}`
});
};
