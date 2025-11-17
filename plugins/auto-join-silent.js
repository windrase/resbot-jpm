let handler = m => m

// Fungsi Jeda/Delay: Penting untuk menghindari banned!
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

handler.before = async function (m, { conn, set }) {
    
    // Logika Pengontrolan Fitur (Sesuai Logika Awal Anda)
    // Berjalan hanya jika dari grup && fitur diaktifkan
    if (!m.isGroup || !set.autojoinGrup) return true

    // Logika Deteksi Link (Sesuai Logika Awal Anda)
    if (m.text && !m.fromMe) {
        
        try {
            // Regex untuk mencari kode invite grup WA
            // Regex ini lebih spesifik mencari kode antara 20-24 karakter
            const regex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
            const match = m.text.match(regex);
            
            if (match && match[1]) {
                const inviteCode = match[1]; 
                
                console.log(`[AUTO-JOIN SILENT] Link terdeteksi. Mencoba masuk ke: ${inviteCode}`);
                
                // JEDA AMAN (Minimal 2.5 Detik): Mengurangi risiko banned!
                await sleep(2500); 
                
                // Eksekusi Join (sock diganti jadi conn)
                await conn.groupAcceptInvite(inviteCode);
                
                // TIDAK ADA m.reply() atau conn.sendMessage()
                
                console.log(`[AUTO-JOIN SILENT] ✅ Berhasil Join: ${inviteCode}`);
            }
        } catch (err) {
            // Log Error (untuk developer)
            console.log(`[AUTO-JOIN SILENT] ❌ Gagal Join ${m.text}. Error: ${err.message}`);
        }
    }
    
    return true
}

module.exports = handler
