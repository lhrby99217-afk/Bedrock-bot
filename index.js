const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. إنشاء سيرفر ويب وهمي عشان استضافة Render ما تطفي
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running and alive!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});

// 2. إعدادات بوت ماين كرفت بيدروك
function createBot() {
    console.log('جاري محاولة الاتصال بسيرفر أترنوس...');
    
    const client = bedrock.createClient({
        host: 'LastEzdeath.aternos.me',
        port: 45027,       // البورت المحدث
        username: 'A',     // اسم البوت
        version: '1.26.44.3', // إصدار السيرفر الحالي
        offline: true      // لأن السيرفر مكرك/أترنوس
    });

    client.on('spawn', () => {
        console.log('تم دخول البوت (A) إلى السيرفر بنجاح! 🚀');
    });

    client.on('error', (err) => {
        console.log('خطأ في البوت:', err);
    });

    client.on('close', () => {
        console.log('انقطع الاتصال بالسيرفر، سيتم إعادة المحاولة بعد 10 ثواني...');
        setTimeout(createBot, 10000); // يحاول يدخل تلقائيًا لو فصل
    });
}

createBot();
