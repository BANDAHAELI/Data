const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 


cmd({ 
    pattern: "mp4", 
    alias: ["video", "song"], 
    react: "🎬", 
    desc: "Download YouTube Video", 
    category: "main", 
    use: ".mp4 <YouTube URL or Name>", 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("❌ *Error:* Please provide a YouTube URL or video name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("🚫 *No results found!* Try another search.");

        let yts = yt.results[0];  
        let apiUrl = `https://apis.giftedtech.web.id/api/download/ytmp4?apikey=gifted-md&url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("⚠️ *Failed to fetch the video.* Please try again later.");
        }

        // 🎥 Digital UI Message (Added "Downloading By Shaban MD")
        let ytmsg = `🎬 *SHABAN-MD VIDEO DOWNLOADER* 🎬

🎥 *Quality:* ${data.result.quality}
📥 *Downloading By Shaban MD*`;

        // ⬇️ Send Video File with Thumbnail
        await conn.sendMessage(from, { 
            video: { url: data.result.download_url }, 
            mimetype: "video/mp4",
            caption: ytmsg,
            contextInfo: { externalAdReply: { 
                body: "🎥 YouTube Video - Downloading By Shaban MD", 
                thumbnailUrl: data.result.thumbnail, 
                mediaType: 2, 
                renderLargerThumbnail: true
            }} 
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("⚠️ *An error occurred.* Please try again later.");
    }
});

// mp3

cmd({ 
    pattern: "mp3", 
    alias: ["play", "audio"], 
    react: "🎵", 
    desc: "Download YouTube song",
    category: "main", 
    use: '.song <Yt url or Name>', 
    filename: __filename 
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("🚫 *Error:* Please provide a YouTube URL or song name.");

        // 🔄 Initial Loading Message
        await reply("⏳ *Processing your request...*");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ *No results found!* Try another search.");

        let yts = yt.results[0];  
        let apiUrl = `https://apis.giftedtech.web.id/api/download/ytmp3?apikey=gifted-md&url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data.success || !data.result || !data.result.download_url) {
            return reply("⚠️ *Failed to fetch the audio.* Please try again later.");
        }

        // 🎵 Digital UI Message (Premium Look)
        let ytmsg = `🎼 *SHABAN-MD MUSIC DOWNLOADER* 🎼

🎧 *Now Playing:*  
🔉 *Quality:* ${data.result.quality}  
📥 *Downloading By:* _Shaban MD_  

✨ _Enjoy Your Music!_ ✨`;

        // 🎤 Send Audio as Voice Note with Thumbnail
        await conn.sendMessage(from, { 
            audio: { url: data.result.download_url }, 
            mimetype: "audio/mpeg",
            ptt: true, // 🎙 Voice Note Format
            contextInfo: { externalAdReply: { 
                title: "🎶 Now Playing...",
                body: "Shaban-MD YouTube Music", 
                thumbnailUrl: data.result.thumbnail, 
                mediaType: 2, 
                renderLargerThumbnail: true,
                sourceUrl: yts.url // 🔗 YouTube Link
            }} 
        }, { quoted: mek });

    } catch (e) {
        console.log("❌ Error:", e); 
        reply("⚠️ *An error occurred.* Please try again later.");
    }
});