const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        // Send the owner details message with a digital touch
        await conn.sendMessage(from, {
            text: `╭━━━◆  *SHABAN-MD*  ◆━━━╮
┃▏➤ *Owner Details:*
┃▏◈ *Name* ➤ ${ownerName}
┃▏◈ *Number* ➤ ${ownerNumber}
┃▏◈ *Bot Version* ➤ 3.0.0 Beta
┃▏◈ *Status* ➤ Active 🔥
┃▏◈ *Powered By* ➤ Sʜᴀʙᴀɴ Mᴅ
┃▏◈ *Date* ➤ ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
╰━━━━━━━━━━━━━━━━━━━━╯
> 📡 *Sʜᴀʙᴀɴ Mᴅ | Digital Assistant*`
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
