import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Retorna todos os dias necessários para preencher a grade de um mês
 * incluindo os dias "vizinhos" da semana anterior e posterior.
 */
export const getDaysInMonthGrid = (date) => {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  
  const startGrid = startOfWeek(startMonth, { weekStartsOn: 0 }); // 0 = Domingo
  const endGrid = endOfWeek(endMonth, { weekStartsOn: 0 });

  return eachDayOfInterval({
    start: startGrid,
    end: endGrid,
  });
};

/**
 * Formata a exibição do cabeçalho (ex: Abril de 2026)
 */
export const formatMonthHeader = (date) => {
  return format(date, "MMMM 'de' yyyy", { locale: ptBR });
};

/**
 * Verifica se um dia é hoje para estilização de destaque
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Funções de navegação simples
 */
export const getNextMonth = (date) => addMonths(date, 1);
export const getPrevMonth = (date) => subMonths(date, 1);