const express = require('express');
const app = express();

// 🔹 middleware
app.use(express.urlencoded({ extended: false }));

// 🔹 "memória simples" (temporário)
const usuarios = {};

// 🔹 rota teste
app.get('/', (req, res) => {
    res.send('🚀 API WandersonWeb ONLINE!');
});

// 🔥 webhook
app.post('/webhook', (req, res) => {
    const telefone = req.body.From;
    const msg = req.body.Body.trim().toLowerCase();

    let resposta = '';

    // 🔹 se não tem usuário ainda
    if (!usuarios[telefone]) {
        usuarios[telefone] = { etapa: 'nome' };
        resposta = '👋 Olá! Bem-vindo à WandersonWeb.\n\n✨ Qual seu nome?';
    }

    // 🔹 etapa: capturar nome
    else if (usuarios[telefone].etapa === 'nome') {
        usuarios[telefone].nome = msg;
        usuarios[telefone].etapa = 'menu';

        resposta = `🤝 Prazer, ${msg}!\n\nEscolha uma opção:\n\n1️⃣ Foto\n2️⃣ Vídeo\n3️⃣ WhatsBot\n4️⃣ Site\n5️⃣ Pacote de Marketing`;
    }

    // 🔹 etapa: menu
    else if (usuarios[telefone].etapa === 'menu') {
        const nome = usuarios[telefone].nome;

        if (msg === '1') {
            resposta = `📸 ${nome}, nossas artes e fotos profissionais aumentam seu engajamento!\n💰 A partir de R$97`;
        } 
        else if (msg === '2') {
            resposta = `🎬 ${nome}, vídeos que vendem e geram autoridade!\n💰 A partir de R$147`;
        } 
        else if (msg === '3') {
            resposta = `🤖 ${nome}, WhatsBot automático para vender 24h!\n🔥 Ideal para negócios locais`;
        } 
        else if (msg === '4') {
            resposta = `🌐 ${nome}, criamos sites modernos e rápidos!\n🚀 Perfeito para captar clientes`;
        } 
        else if (msg === '5') {
            resposta = `📊 ${nome}, pacote completo de marketing!\n🔥 Estratégia + automação + vendas`;
        } 
        else {
            resposta = `❌ Opção inválida, ${nome}.\n\nDigite:\n1️⃣ Foto\n2️⃣ Vídeo\n3️⃣ WhatsBot\n4️⃣ Site\n5️⃣ Marketing`;
        }
    }

    res.set('Content-Type', 'text/xml');
    res.send(`
        <Response>
            <Message>${resposta}</Message>
        </Response>
    `);
});

// 🔹 porta
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});