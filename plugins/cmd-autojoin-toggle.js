let handler = async (m, { conn, args, set, isOwner, usedPrefix }) => {
    
    // CEK OTORITAS: Hanya Owner yang boleh menggunakan perintah ini
    if (!isOwner) {
        return m.reply('Perintah ini hanya bisa digunakan oleh *Owner* bot.');
    }

    // PARSING ARGUMEN (on/off)
    let type = args[0] ? args[0].toLowerCase() : null;

    if (type === 'on') {
        // AKTIFKAN
        set.autojoinGrup = true;
        m.reply('✅ Fitur Auto Join Grup berhasil **diaktifkan**.');
        
    } else if (type === 'off') {
        // MATIKAN
        set.autojoinGrup = false;
        m.reply('❌ Fitur Auto Join Grup berhasil **dimatikan**.');
        
    } else {
        // BANTUAN PENGGUNAAN
        m.reply(`⚠️ Penggunaan salah. Contoh:\n→ *${usedPrefix}autojoingrub on*\n→ *${usedPrefix}autojoingrub off*`);
    }
}

handler.command = /^(autojoingrub)$/i 
handler.owner = true // Menandakan perintah ini hanya untuk owner
module.exports = handler
