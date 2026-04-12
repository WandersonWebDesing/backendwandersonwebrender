const flow = {
  start: (nome) => `Olá! 👋 Seja bem-vindo à WandersonWeb 🚀\n\nPra te atender melhor, me diz seu nome 😊`,

  askLocation: (nome) => `Prazer, ${nome}! 🙌\n\n📍 Você está em qual cidade?`,

  askService: (nome) => `
Show, ${nome}! 📍

👉 Qual desses serviços você tem interesse?

1️⃣ Fotografia  
2️⃣ Vídeos  
3️⃣ Marketing Digital  
4️⃣ Site  
5️⃣ E-commerce  
6️⃣ Bot WhatsApp
`,

  services: {
    "1": (nome) => `Perfeito, ${nome}! 📸 Qual tipo de fotografia você precisa?`,
    "2": (nome) => `Top, ${nome}! 🎬 Quer gravação ou edição?`,
    "3": (nome) => `Excelente, ${nome}! 📈 Já anuncia ou vai começar?`,
    "4": (nome) => `Ótimo, ${nome}! 🌐 Já tem site ou quer criar?`,
    "5": (nome) => `Perfeito, ${nome}! 🛒 Já vende algo?`,
    "6": (nome) => `Top, ${nome}! 🤖 Quer automatizar atendimento ou vendas?`
  }
};

module.exports = flow;