const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const config = require("./config");

const menu = require("./commands/menu");
const profile = require("./commands/profile");
const gacha = require("./commands/gacha");
const inventory = require("./commands/inventory");
const battle = require("./commands/battle");
const boss = require("./commands/boss");
const fusion = require("./commands/fusion");

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) start();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text || "";

    const chat = m.key.remoteJid;
    const sender = m.key.participant || chat;

    if (!text.startsWith(config.prefix)) return;

    const cmd = text.split(" ")[0].toLowerCase();

    switch (cmd) {
      case ".menu":
        return menu(sock, chat);

      case ".profile":
        return profile(sock, chat, sender);

      case ".pull":
        return gacha.pull(sock, chat, sender);

      case ".pull10":
        return gacha.pull10(sock, chat, sender);

      case ".inventory":
        return inventory(sock, chat, sender);

      case ".battle": {
        const target =
          m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

        if (!target)
          return sock.sendMessage(chat, { text: "Tag a user" });

        return battle(sock, chat, sender, target);
      }

      case ".boss":
        return boss(sock, chat, sender);

      case ".fuse":
        return fusion(sock, chat, sender);
    }
  });
}

start();
