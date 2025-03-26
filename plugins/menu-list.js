const config = require('../config')
const { cmd, commands } = require('../command');

cmd({
    pattern: "list",
    alias: ["listcmd","commands"],
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━❮ *QURAN MENU* ❯━⊷  
┃ 🕌 .quranmenu (1-10)  
┃ 🕋 .prayertime  
╰━━━━━━━━━━━━━━━  

╭━❮ *AI MENU* ❯━⊷  
┃ 🤖 .ai | .fluxai | .imagine2 | .imagine3  
┃ 🤖 .wallpaper | .image  
╰━━━━━━━━━━━━━━━  

╭━❮ *ANIME IMAGES* ❯━⊷  
┃ 🖼️ .anime | .garl | .waifu | .neko | .maid  
┃ 🖼️ .awoo | .animegirl (1-5) | .dog  
╰━━━━━━━━━━━━━━━  

╭━❮ *REACTIONS* ❯━⊷  
┃ 😍 .cry | .cuddle | .hug | .lick | .pat | .wink  
┃ 😍 .smug | .bonk | .wave | .smile | .poke | .slap  
┃ 😍 .blush | .bite | .dance | .kill | .kiss  
╰━━━━━━━━━━━━━━━  

╭━❮ *CONVERT MENU* ❯━⊷  
┃ 🔄 .sticker | .topdf | .gif | .attp | .tts (1-3)  
┃ 🔄 .trt | .fancy | .gitclone | .url | .logo | .emoji  
╰━━━━━━━━━━━━━━━  

╭━❮ *FUN MENU* ❯━⊷  
┃ 🎉 .define | .happy | .heart | .angry | .sad | .roast  
┃ 🎉 .moon | .nikal | .aura | .joke | .hack | .8ball  
╰━━━━━━━━━━━━━━━  

╭━❮ *DOWNLOAD MENU* ❯━⊷  
┃ ⬇️ .capcut | .ringtone | .tiktok (1-2) | .ytsearch  
┃ ⬇️ .instagram | .facebook | .twitter | .mediafire  
┃ ⬇️ .apk | .gdrive | .likee | .pinterest  
┃ ⬇️ .mp3 | .mp4 | .play (1-2) | .img  
╰━━━━━━━━━━━━━━━  

╭━❮ *GROUP MENU* ❯━⊷  
┃ 👥 .tagall | .hidetag | .unmute | .unlockgc  
┃ 👥 .kick (all) | .removeadmins | .leave | .invite  
┃ 👥 .resetglink | .jid1 | .gjid  
╰━━━━━━━━━━━━━━━  

╭━❮ *OTHER MENU* ❯━⊷  
┃ 🧩 .githubstalk | .wikipedia | .movie | .srepo  
┃ 🧩 .weather | .rcolor | .roll | .coinflip | .time  
╰━━━━━━━━━━━━━━━  

╭━❮ *OWNER MENU* ❯━⊷  
┃ 👑 .alive | .version | .antidelete | .update  
┃ 👑 .menu | .list | .owner | .shutdown | .ping  
┃ 👑 .repo | .broadcast | .speed | .fetch | .report  
╰━━━━━━━━━━━━━━━