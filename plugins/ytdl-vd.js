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
    react: "📀", 
    desc: "Download YouTube song",
    category: "main", 
    use: '.song <Yt url or Name>', 
    filename: __filename 
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("❌ Please provide a YouTube URL or song name.");

        // Initial message
        await reply("🎶 Downloading Audio... Please wait for *SHABAN-MD* user!");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ No results found!");

        let yts = yt.results[0];  
        let apiUrl = `https://apis.giftedtech.web.id/api/download/ytmp3?apikey=gifted-md&url=${encodeURIComponent(yts.url)}`;

        console.log("🔗 API URL:", apiUrl); // Debugging

        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("📥 API Response:", data); // Debugging

        if (!data.success || !data.result || !data.result.download_url) {
            return reply("❌ Failed to fetch the audio. Please try again later.");
        }

        let thumbnailUrl = data.result.thumbnail || yts.thumbnail;

        // Download Thumbnail Image as Buffer
        let thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();

        let ytmsg = `🎶 *SHABAN-MD MUSIC DOWNLOADER* 🎶

📀 *Title:* ${data.result.title}
🔊 *Quality:* ${data.result.quality}

> *© Powered By Shaban-MD ♡*`;

        // Send Thumbnail Image
        await conn.sendMessage(from, { 
            image: { url: thumbnailUrl }, 
            caption: ytmsg 
        }, { quoted: mek });

        console.log("🎼 Sending audio from URL:", data.result.download_url); 

        // Send Audio File with Thumbnail
        await conn.sendMessage(from, { 
            audio: { url: data.result.download_url }, 
            mimetype: "audio/mpeg", 
            ptt: false, 
            jpegThumbnail: thumbnailBuffer
        }, { quoted: mek });

        console.log("✅ Audio sent successfully!");

    } catch (e) {
        console.log("❌ Error:", e); 
        reply("❌ An error occurred. Please try again later.");
    }
});