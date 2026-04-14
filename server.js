const express = require('express');
const app = express();

// 🔹 middleware (OBRIGATÓRIO antes das rotas)
app.use(express.urlencoded({ extended: false }));

// 🔹 rota principal (teste no navegador)
app.get('/', (req, res) => {
    res.send('🚀 API WandersonWeb ONLINE!');
});

// 🔥 👉 COLOQUE SEU WEBHOOK AQUI (EXATAMENTE AQUI)
app.post('/webhook', (req, res) => {
    const msg = req.body.Body.toLowerCase();

    let resposta = '';

    if (msg.includes('oi') || msg.includes('olá')) {
        resposta = '👋 Olá! Bem-vindo à WandersonWeb.\nDigite:\n👉 preço\n👉 serviço\n👉 contratar';
    } 
    else if (msg.includes('preço')) {
        resposta = '💰 Nossos serviços começam em R$97.\nQuer ver as opções?';
    } 
    else if (msg.includes('serviço')) {
        resposta = '🚀 Oferecemos:\n- Criação de Sites\n- Bots WhatsApp\n- Automação de vendas';
    } 
    else if (msg.includes('contratar')) {
        resposta = '🔥 Perfeito! Vou te direcionar para atendimento agora.';
    } 
    else {
        resposta = '🤖 Não entendi.\nDigite:\n👉 preço\n👉 serviço\n👉 contratar';
    }

    res.set('Content-Type', 'text/xml');
    res.send(`
        <Response>
            <Message>${resposta}</Message>
        </Response>
    `);
});

// 🔹 porta (SEMPRE no final)
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});