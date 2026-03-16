const http = require('http');
const https = require('https');

const PORT = 8080;
const KILO_API_URL = 'https://api.kilo.ai/api/openrouter/chat/completions';
const KILO_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjFkZDY3MzU1LTE3NTgtNGE5MC05ZTc4LWY4MjljNTBmZjk2MyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzM2NDI1NDEsImV4cCI6MTkzMTMyMjU0MX0.LWoQvoXSu-QhpQH91-vPXZaPVkXcSd6hnjw4FzNhkC4';
const TARGET_MODEL = 'kilo-auto/free';

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const anthropicReq = JSON.parse(body);
                
                // Map Anthropic Messages to OpenAI Chat Completions
                const openAIReq = {
                    model: TARGET_MODEL,
                    messages: anthropicReq.messages.map(m => ({
                        role: m.role,
                        content: typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('\n')
                    })),
                    max_tokens: anthropicReq.max_tokens,
                    stream: anthropicReq.stream || false
                };

                // Add system prompt if present
                if (anthropicReq.system) {
                    openAIReq.messages.unshift({ role: 'system', content: anthropicReq.system });
                }

                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${KILO_JWT}`,
                        'Content-Type': 'application/json'
                    }
                };

                const kiloReq = https.request(KILO_API_URL, options, (kiloRes) => {
                    res.writeHead(kiloRes.statusCode, kiloRes.headers);
                    kiloRes.pipe(res);
                });

                kiloReq.on('error', (e) => {
                    console.error('Kilo Request Error:', e);
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: 'Proxy Request Failed' }));
                });

                kiloReq.write(JSON.stringify(openAIReq));
                kiloReq.end();

            } catch (err) {
                console.error('Parse Error:', err);
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Claude-to-Kilo Proxy running at http://localhost:${PORT}`);
    console.log(`Targeting model: ${TARGET_MODEL}`);
});
