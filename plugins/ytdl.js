const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video Mp4

cmd({ 
    pattern: "mp4", 
    alias: ["mp4+"], 
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


// David Mp3

cmd({ 
    pattern: "play", 
    alias: ["play2",], 
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
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(yts.url)}`;

        console.log("🔗 API URL:", apiUrl); // Debugging

        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("📥 API Response:", data); // Debugging

        if (!data.success || !data.result || !data.result.download_url) {
            return reply("❌ Failed to fetch the audio. Please try again later.");
        }

        let ytmsg = `🎶 *SHABAN-MD MUSIC DOWNLOADER* 🎶

📀 *Title:* ${data.result.title}
🔊 *Quality:* ${data.result.quality}
🔗 *YouTube Link:* ${yts.url}

> *© Powered By Shaban-MD ♡*`;

        // Thumbnail Selection
        let thumbnailUrl = data.result.thumbnail || yts.thumbnail;

        // Send Thumbnail Image
        await conn.sendMessage(from, { 
            image: { url: thumbnailUrl }, 
            caption: ytmsg 
        }, { quoted: mek });

        console.log("🎼 Sending audio from URL:", data.result.download_url); 

        // Send Audio File
        await conn.sendMessage(from, { 
            audio: { url: data.result.download_url }, 
            mimetype: "audio/mpeg" 
        }, { quoted: mek });

        console.log("✅ Audio sent successfully!");

    } catch (e) {
        console.log("❌ Error:", e); 
        reply("❌ An error occurred. Please try again later.");
    }
});

// Gifted Mp3

cmd({ 
    pattern: "mp3", 
    alias: ["mp3+", "mp3-"], 
    react: "🔪", 
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

        let ytmsg = `🎶 *SHABAN-MD MUSIC DOWNLOADER* 🎶

📀 *Title:* ${data.result.title}
🔊 *Quality:* ${data.result.quality}
🔗 *YouTube Link:* ${yts.url}

> *© Powered By Shaban-MD ♡*`;

        // Thumbnail Selection
        let thumbnailUrl = data.result.thumbnail || yts.thumbnail;

        // Send Thumbnail Image
        await conn.sendMessage(from, { 
            image: { url: thumbnailUrl }, 
            caption: ytmsg 
        }, { quoted: mek });

        console.log("🎼 Sending audio from URL:", data.result.download_url); 

        // Send Audio File
        await conn.sendMessage(from, { 
            audio: { url: data.result.download_url }, 
            mimetype: "audio/mpeg" 
        }, { quoted: mek });

        console.log("✅ Audio sent successfully!");

    } catch (e) {
        console.log("❌ Error:", e); 
        reply("❌ An error occurred. Please try again later.");
    }
});

// Gifted Mp4

cmd({ 
    pattern: "video", 
    alias: ["video2"], 
    react: "🐦‍🔥", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 <Yt url or Name>', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.giftedtech.web.id/api/download/ytmp4?apikey=gifted-md&url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        // Message template
        let ytmsg = `🎬 *SHABAN-MD VIDEO DOWNLOADER* 🎬

📌 *Title:* ${data.result.title}
📺 *Quality:* ${data.result.quality}
📸 *Thumbnail:* [View](${data.result.thumbnail})
🔗 *Download:* [Click Here](${data.result.download_url})`;

        // Send thumbnail and video link
        await conn.sendMessage(from, { image: { url: data.result.thumbnail }, caption: ytmsg }, { quoted: mek });
        
        // Send video
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});