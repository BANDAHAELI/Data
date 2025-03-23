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
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total System RAM

        // Disk Space (for Linux-based systems)
        let diskSpace = "Not Available";
        try {
            const diskStat = fs.statSync('/');
            diskSpace = `${(diskStat.blksize / 1024 / 1024).toFixed(2)}MB`;
        } catch (err) {
            console.log("Disk space info not available", err);
        }

        // Stylish system status message
        const status = `╭───❰ 𝑺𝑯𝑨𝑩𝑨𝑵-𝑴𝑫 ❱───➤
┃ ✨ 𝗨𝗽𝘁𝗶𝗺𝗲: *${runtime(process.uptime())}*
┃ 💾 𝗕𝗼𝘁 𝗥𝗮𝗺: *${botUsedMem}MB (RSS)*
┃ 📦 𝗛𝗲𝗮𝗽 𝗨𝘀𝗲𝗱: *${heapUsed}MB*
┃ 🔗 𝗘𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗠𝗲𝗺: *${externalMem}MB*
┃ 🖥 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: *${platform} ${release}*
┃ 🔧 𝗖𝗣𝗨: *${cpuModel}*
┃ 📀 𝗗𝗶𝘀𝗸 𝗦𝗽𝗮𝗰𝗲: *${diskSpace}*
┃ 👨‍💻 𝗢𝘄𝗻𝗲𝗿: *𝗠𝗿 𝗦𝗵𝗮𝗯𝗮𝗻*
┃ 🧬 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: *𝟯.𝟬.𝟬 𝗕𝗘𝗧𝗔*
╰───────────────➤
💥 𝗣𝗼𝘄𝗲𝗿𝗲𝗗 𝗕𝗬: 𝗠𝗿 𝗦𝗵𝗮𝗯𝗮𝗻`;

        // Send image + caption + audio
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/tasodv.jpg` },  
            caption: status
        }, { quoted: mek });

        // Send audio as voice note
        await conn.sendMessage(from, { 
            audio: { url: 'https://github.com/MRSHABAN40/SHABAN-MD_DATABASE/raw/refs/heads/main/Menu_Data/alive.mp3' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});