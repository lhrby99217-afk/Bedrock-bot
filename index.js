const { createClient } = require('bedrock-protocol');
const express = require('express');

// سيرفر ويب وهمي عشان تظل الاستضافة شغالة 24/7
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bedrock Bot is running 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// بيانات سيرفر الماين كرفت
function startBot() {
    const client = createClient({
        host: 'LastEzdeath.aternos.me', 
        port: 45027,                  
        username: 'AfkBot',          
        offline: true,               
        skipPing: true               // هذا السطر الجديد يمنع مشكلة التايم آوت ويتصل مباشرة
    });

    client.on('spawn', () => {
        console.log('تم دخول البوت إلى السيرفر بنجاح!');
    });

    client.on('error', (err) => {
        console.log('خطأ في البوت:', err);
    });

    client.on('close', () => {
        console.log('انفصل البوت، جارِ إعادة المحاولة بعد 10 ثوانٍ...');
        setTimeout(startBot, 10000);
    });
}

startBot();
