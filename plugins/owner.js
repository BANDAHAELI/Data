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

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send vCard and image in a single message
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/0rt9jy.jpg' }, // Image URL from your request
            caption: `╭━━〔 *SHABAN-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Here is the owner details*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 3.0.0 Beta
┃◈└───────────┈⊷
╰──────────────┈⊷
> © ᴘᴏᴡᴇʀᴇʀᴅ ʙʏ Sʜᴀʙᴀɴ Mᴅ`, // Display the owner's details
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }] // Send vCard in the same message
            }
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});