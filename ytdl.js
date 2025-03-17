const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video Mp4

cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
    react: "🐦‍🔥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        // Clean and modern message look
        let ytmsg = `🎬 *SHABAN-MD VIDEO DOWNLOADER* 🎬

📌 *Title:* ${yts.title}
⏱️ *Duration:* ${yts.timestamp}
👁️ *Views:* ${yts.views}
👤 *Author:* ${yts.author.name}
🔗 *Link:* ${yts.url}`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

//Mp4 Extra

cmd({ 
    pattern: "video2", 
    alias: ["video3", "video5"], 
    react: "🤩", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song <Yt url or Name>', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("❌ *Please provide a YouTube URL or song name.*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("⚠️ *No results found!*");

        let yts = yt.results[0];  
        let apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data.status || !data.data || !data.data.dl) {
            return reply("❌ *Failed to fetch the video. Please try again later.*");
        }

        // Stylish and clean message look
        let ytmsg = `🎥 *SHABAN-MD VIDEO DOWNLOADER* 🎥

📌 *Title:* ${data.data.title}
🌐 *Source:* YouTube
🔗 *Link:* ${yts.url}

💾 *Downloading your video... Please wait!*`;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.data.dl }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("⚠️ *An unexpected error occurred. Please try again later.*");
    }
});
       
// play Mp3

cmd({ 
    pattern: "play", 
    alias: ["play2", "mp3"], 
    react: "🎶", 
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
        let apiUrl = `https://bandahealimaree-api-ytdl.hf.space/api/ytmp3?url=${encodeURIComponent(yts.url)}`;

        console.log("🔗 API URL:", apiUrl); // Debugging

        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("📥 API Response:", data); // Debugging

        if (!data.status || !data.download || !data.download.downloadUrl) {
            return reply("❌ Failed to fetch the audio. Please try again later.");
        }

        let ytmsg = `🎶 *SHABAN-MD MUSIC DOWNLOADER* 🎶

📀 *Title:* ${data.download.title}
⏳ *Duration:* ${data.result.duration} sec
🔗 *YouTube Link:* ${yts.url}
🕒 *Expires In:* ${data.download.expiresIn}

> *© Powered By Shaban-MD ♡*`;

        // Thumbnail URL selection
        let thumbnailUrl = data.result.thumbnail[0]?.url || yts.thumbnail;

        // Generate GIF Thumbnail
        let gifThumbnail = await getGifThumbnail(thumbnailUrl);
        if (gifThumbnail) {
            await conn.sendMessage(from, {
                video: { url: gifThumbnail },
                mimetype: "video/mp4",
                caption: ytmsg,
                gifPlayback: true
            }, { quoted: mek });
        } else {
            // If GIF fails, send normal image
            await conn.sendMessage(from, { 
                image: { url: thumbnailUrl }, 
                caption: ytmsg 
            }, { quoted: mek });
        }

        console.log("🎼 Sending audio from URL:", data.download.downloadUrl); 

        // Send audio file
        await conn.sendMessage(from, { 
            audio: { url: data.download.downloadUrl }, 
            mimetype: "audio/mpeg" 
        }, { quoted: mek });

        console.log("✅ Audio sent successfully!");

    } catch (e) {
        console.log("❌ Error:", e); 
        reply("❌ An error occurred. Please try again later.");
    }
});