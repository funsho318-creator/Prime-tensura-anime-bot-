const { load } = require("../utils/database");

module.exports = async (sock, chat, sender) => {
const db = load("./database/users.json");

if (!db[sender]) {
db[sender] = {
level: 1,
xp: 0,
coins: 100,
hp: 100,
inventory: []
};
}

const u = db[sender];

await sock.sendMessage(chat,{
text:`🎮 PROFILE

⭐ Level: ${u.level}
💰 Coins: ${u.coins}
❤️ HP: ${u.hp}
🎒 Characters: ${u.inventory.length}`
});
};
