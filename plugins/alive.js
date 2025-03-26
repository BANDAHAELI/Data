const { cmd, commands } = require('../command');
const os = require("os");
const fs = require("fs");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // System Information
        const platform = os.platform(); // OS Name
        const release = os.release(); // OS Version
        const cpuModel = os.cpus()[0].model; // CPU Model

        // Bot RAM Usage Calculation
        const botUsedMem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2); // Bot Process RAM
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Heap Used
        const externalMem = (process.memoryUsage().external / 1024 / 1024).toFixed(2); // External Memory Used

        // Stylish system status message
        const status = `╭───❰ 𝑺𝑯𝑨𝑩𝑨𝑵-𝑴𝑫 ❱───➤
┃ ✨ 𝗨𝗽𝘁𝗶𝗺𝗲: *${runtime(process.uptime())}*
┃ 💾 𝗕𝗼𝘁 𝗥𝗮𝗺: *${botUsedMem}MB (RSS)*
┃ 📦 𝗛𝗲𝗮𝗽 𝗨𝘀𝗲𝗱: *${heapUsed}MB*
┃ 🔗 𝗘𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗠𝗲𝗺: *${externalMem}MB*
┃ 🖥 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: *${platform} ${release}*
┃ 🔧 𝗖𝗣𝗨: *${cpuModel}*
┃ 👨‍💻 𝗢𝘄𝗻𝗲𝗿: *𝗠𝗿 𝗦𝗵𝗮𝗯𝗮𝗻*
┃ 🧬 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: *𝟯.𝟬.𝟬 𝗕𝗘𝗧𝗔*
╰───────────────➤
💥 𝗣𝗼𝘄𝗲𝗿𝗲𝗗 𝗕𝗬: 𝗠𝗿 𝗦𝗵𝗮𝗯𝗮𝗻`;

        // Send image + caption
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/tasodv.jpg` },  
            caption: status
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});