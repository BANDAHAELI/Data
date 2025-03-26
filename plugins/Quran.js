const fetch = require('node-fetch'); 
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const { translate } = require('@vitalets/google-translate-api');
const axios = require('axios')

cmd({
  pattern: "quran",
  alias: ["surah"],
  react: "🤍",
  desc: "Get Quran Surah details and explanation.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    let surahInput = args[0];

    if (!surahInput) {
      return reply('Type Surah Number or Type *.Surahmenu* for getting Surah numbers');
    }

    let surahListRes = await fetchJson('https://quran-endpoint.vercel.app/quran');
    let surahList = surahListRes.data;

    let surahData = surahList.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      return reply(`Couldn't find surah with number or name "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    
    if (!res.ok) {
      let error = await res.json(); 
      return reply(`API request failed with status ${res.status} and message ${error.message}`);
    }

    let json = await res.json();

    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });
    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true });

    let quranSurah = `
🕋 *Quran: The Holy Book ♥️🌹قرآن مجید🌹♥️*\n
📖 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
💫Type: ${json.data.type.en}\n
✅Number of verses: ${json.data.ayahCount}\n
⚡🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
⚡🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}`;

    await conn.sendMessage(
      from,
      {
        image: { url: `https://files.catbox.moe/8fy6up.jpg` },
        caption: quranSurah,
        contextInfo: {
          mentionedJid: [m.sender], 
          forwardingScore: 999,  
          isForwarded: true,   
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363358310754973@newsletter', 
            newsletterName: 'SʜᴀʙᴀɴMᴅ', 
            serverMessageId: 143
          }
        }
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
});

cmd({
    pattern: "quranmenu",
    alias: ["surahmenu", "surahlist"],
    desc: "menu the bot",
    category: "menu",
    react: "❤️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `❤️  ⊷┈ *QURAN KAREEM* ┈⊷  🤍

 💫 𝘈𝘭𝘭 𝘴𝘶𝘳𝘢𝘩 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘧𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 𝘴𝘶𝘳𝘢𝘩 𝘵𝘺𝘱𝘦 .𝘴𝘶𝘳𝘢𝘩 36 💫🌸`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/8fy6up.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363358310754973@newsletter',
                        newsletterName: 'SʜᴀʙᴀɴMᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});