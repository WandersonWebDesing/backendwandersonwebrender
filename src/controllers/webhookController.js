import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const handleWhatsAppWebhook = async (req: Request, res: Response) => {
    const { Body, From } = req.body;
    const mensagemRecebida = Body?.trim();
    const numeroTelefone = From; // Ex: 'whatsapp:+556199788904'

    if (!mensagemRecebida) return res.status(200).send('Mensagem vazia');

    try {
        // 1. Tenta buscar o lead no banco pelo telefone
        let { data: lead, error: fetchError } = await supabase
            .from('leads')
            .select('*')
            .eq('telefone', numeroTelefone)
            .single();

        // 2. Lógica de Fluxo (Máquina de Estados)
        
        // CASO A: Novo Lead (Não existe no banco)
        if (!lead) {
            await supabase.from('leads').insert([
                { 
                    telefone: numeroTelefone, 
                    status: 'aguardando_nome' 
                }
            ]);

            return res.status(200).json({
                message: "Olá! Bem-vindo à WandersonWeb. Para começarmos, qual é o seu nome?"
            });
        }

        // CASO B: Lead existe e estamos esperando o nome
        if (lead.status === 'aguardando_nome') {
            const nomeUsuario = mensagemRecebida;

            await supabase
                .from('leads')
                .update({ 
                    nome: nomeUsuario, 
                    status: 'menu_ativo' 
                })
                .eq('id', lead.id);

            const menu = `Prazer, ${nomeUsuario}! Como posso ajudar hoje?\n\n` +
                         `1. Criar um Site Profissional\n` +
                         `2. Design UX/UI (Protótipos)\n` +
                         `3. Consultoria de SEO e Marketing\n\n` +
                         `Digite o número da opção desejada:`;

            return res.status(200).json({ message: menu });
        }

        // CASO C: Lead já tem nome e está escolhendo no menu
        if (lead.status === 'menu_ativo') {
            let resposta = "";

            switch (mensagemRecebida) {
                case '1':
                    resposta = "Excelente! Sites modernos em React e Tailwind são minha especialidade. Posso te enviar um orçamento?";
                    break;
                case '2':
                    resposta = "Design focado em conversão! Vamos falar sobre sua identidade visual?";
                    break;
                case '3':
                    resposta = "SEO é a alma do negócio. Quer que eu analise seu site atual?";
                    break;
                default:
                    resposta = "Ops, não entendi. Digite apenas o número 1, 2 ou 3.";
            }

            return res.status(200).json({ message: resposta });
        }

        return res.status(200).send('OK');

    } catch (err) {
        console.error("Erro crítico no webhook:", err);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};