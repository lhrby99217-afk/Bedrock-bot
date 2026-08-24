const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. سيرفر ويب وهمي لمنع انطفاء استضافة Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});

// 2. إعدادات البوت برابط المشاركة المباشر من أترنوس
function createBot() {
    console.log('جاري الاتصال بالسيرفر...');
    
    const client = bedrock.createClient({
        host: 'LastEzdeath.aternos.me', // رابط السيرفر
        port: 45027,                   // تأكد إنه نفس البورت الحالي بأترنوس
        username: 'A',                 // اسم البوت
        version: '1.26.44.3',          // الإصدار
        offline: true                  
    });

    client.on('spawn', () => {
        console.log('تم دخول البوت (A) إلى السيرفر بنجاح! ');
    });

    client.on('error', (err) => {
        console.log('خطأ في الاتصال:', err);
    });

    client.on('close', () => {
        console.log('انقطع الاتصال، جاري إعادة المحاولة بعد 10 ثواني...');
        setTimeout(createBot, 10000);
    });
}

createBot();
