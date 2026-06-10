const { load, save } = require("../utils/database");
const bosses = require("../data/bosses.json");

module.exports = async(sock,chat,sender)=>{
const db=load("./database/users.json");
const u=db[sender];

const boss=bosses[Math.floor(Math.random()*bosses.length)];
const power=u.inventory[0]?.power || 10;

if(power>boss.power){
u.coins+=boss.reward;
sock.sendMessage(chat,{text:`🐉 Defeated ${boss.name}`});
}else{
u.hp-=30;
sock.sendMessage(chat,{text:`💀 ${boss.name} won`});
}

save("./database/users.json",db);
};
