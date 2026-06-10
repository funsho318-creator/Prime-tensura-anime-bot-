const { load, save } = require("../utils/database");
const chars = require("../data/characters.json");

const DB = "./database/users.json";

function getUser(db,sender){
if(!db[sender])
db[sender]={level:1,xp:0,coins:1000,hp:100,inventory:[]};
return db[sender];
}

function roll(){
return chars[Math.floor(Math.random()*chars.length)];
}

module.exports.pull = async(sock,chat,sender)=>{
const db=load(DB);
const u=getUser(db,sender);

if(u.coins<100)
return sock.sendMessage(chat,{text:"❌ Not enough coins"});

u.coins-=100;
u.inventory.push(roll());

save(DB,db);

sock.sendMessage(chat,{text:"🎰 Summon done"});
};

module.exports.pull10 = async(sock,chat,sender)=>{
const db=load(DB);
const u=getUser(db,sender);

if(u.coins<900)
return sock.sendMessage(chat,{text:"❌ Not enough coins"});

u.coins-=900;

for(let i=0;i<10;i++)
u.inventory.push(roll());

save(DB,db);

sock.sendMessage(chat,{text:"🎰 10x summon complete"});
};
