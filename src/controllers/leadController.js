import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const handleWhatsAppWebhook = async (req: Request, res: Response) => {
    const { Body, From } = req.body;
    
    // Trim básico para evitar espaços vazios
    const mensagemRecebida = Body?.toString().trim();
    const numeroTelefone = From?.toString().trim(); // Garante que é string

    if (!mensagemRecebida || !numeroTelefone) {
        return res.status(200).send('Dados incompletos');
    }

    try {
        // 1. Busca o lead
        let { data: lead, error: fetchError } = await supabase
            .from('leads')
            .select('*')
            .eq('telefone', numeroTelefone)
            .maybeSingle(); // maybeSingle não gera erro se não encontrar nada

        if (fetchError) throw fetchError;

        // CASO A: Novo Lead
        if (!lead) {
            const { error: insertError } = await supabase
                .from('leads')
                .insert([
                    { 
                        telefone: numeroTelefone, 
                        status: 'aguardando_nome' 
                    }
                ]);

            if (insertError) {
                console.error("Erro ao inserir lead:", insertError.message);
                return res.status(500).json({ error: "Erro ao salvar novo lead" });
            }

            return res.status(200).json({
                message: "Olá! Bem-vindo à WandersonWeb. Para começarmos, qual é o seu nome?"
            });
        }

        // CASO B: Aguardando Nome
        if (lead.status === 'aguardando_nome') {
            const { error: updateError } = await supabase
                .from('leads')
                .update({ 
                    nome: mensagemRecebida, 
                    status: 'menu_ativo' 
                })
                .eq('id', lead.id);

            if (updateError) throw updateError;

            const menu = `Prazer, ${mensagemRecebida}! Como posso ajudar hoje?\n\n` +
                         `1. Criar um Site Profissional\n` +
                         `2. Design UX/UI (Protótipos)\n` +
                         `3. Consultoria de SEO e Marketing\n\n` +
                         `Digite o número da opção desejada:`;

            return res.status(200).json({ message: menu });
        }

        // CASO C: Menu Ativo
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

    } catch (err: any) {
        console.error("Erro crítico no webhook:", err.message);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};