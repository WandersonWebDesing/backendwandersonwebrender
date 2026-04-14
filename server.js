const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
    const msg = req.body.Body;
    const from = req.body.From;

    console.log("Mensagem recebida:", msg);
    console.log("De:", from);

    // resposta simples (SEM HubSpot ainda)
    const response = `
        <Response>
            <Message>
                Olá! 👋 Recebemos sua mensagem: "${msg}"
                Em breve vamos te atender 🚀
            </Message>
        </Response>
    `;

    res.set('Content-Type', 'text/xml');
    res.send(response);
});

app.listen(4001, () => {
    console.log('🚀 Servidor rodando na porta 4001');
});