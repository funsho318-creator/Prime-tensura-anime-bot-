const { load, save } = require("../utils/database");

module.exports = async(sock,chat,p1,p2)=>{
const db=load("./database/users.json");

const a=db[p1];
const b=db[p2];

const pa=a.inventory[0]?.power || 10;
const pb=b.inventory[0]?.power || 10;

if(pa>pb){
a.coins+=100;
sock.sendMessage(chat,{text:"⚔️ You win"});
}else{
a.hp-=20;
sock.sendMessage(chat,{text:"💀 You lose"});
}

save("./database/users.json",db);
};
