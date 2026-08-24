const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. سيرفر ويب وهمي عشان استضافة Render تظل نشطة 24 ساعة
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bedrock Bot is online!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});

// 2. إعدادات بوت ماين كرفت بيدروك (بدون تحديد بورت خارجي معقد، نعتمد على الـ Host المباشر)
function createBot() {
    console.log('جاري الاتصال بسيرفر أترنوس...');
    
    const client = bedrock.createClient({
        host: 'LastEzdeath.aternos.me', // رابط السيرفر الأساسي بدون بورت
        port: 45027,                   // البورت الحالي
        username: 'A',                 // اسم البوت
        version: '1.26.44.3',          // الإصدار المطابق تماماً
        offline: true                  // ضروري لسيرفرات أترنوس المكركة
    });

    client.on('spawn', () => {
        console.log('تم دخول البوت (A) إلى السيرفر بنجاح! 🚀');
    });

    client.on('error', (err) => {
        console.log('خطأ في البوت:', err);
    });

    client.on('close', () => {
        console.log('انقطع الاتصال، سيتم إعادة المحاولة خلال 10 ثواني...');
        setTimeout(createBot, 10000); // إعادة محاولة تلقائية لو فصل السيرفر
    });
}

createBot();
