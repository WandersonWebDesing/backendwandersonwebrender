const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

// ✅ ROTA PRINCIPAL (resolve seu erro)
app.get('/', (req, res) => {
    res.send('🚀 API WandersonWeb ONLINE!');
});

// webhook Twilio
app.post('/webhook', (req, res) => {
    const mensagem = req.body.Body;

    const twiml = `
        <Response>
            <Message>Recebido: ${mensagem}</Message>
        </Response>
    `;

    res.set('Content-Type', 'text/xml');
    res.send(twiml);
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});