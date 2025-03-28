const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 


cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
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

        // 🎥 Digital UI Message
        let ytmsg = `🎬 *SHABAN-MD VIDEO DOWNLOADER* 🎬

📌 *Title:* ${data.result.title}
🎥 *Quality:* ${data.result.quality}`;

        // ⬇️ Send Video File with Thumbnail
        await conn.sendMessage(from, { 
            video: { url: data.result.download_url }, 
            mimetype: "video/mp4",
            caption: ytmsg,
            contextInfo: { externalAdReply: { 
                title: data.result.title, 
                body: "🎥 YouTube Video", 
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