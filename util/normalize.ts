/**
 * Normaliza um valor para formato de CPF (000.000.000-00)
 */
export function normalizeCPF(value: string): string {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
}

/**
 * Normaliza um valor para formato de CNPJ (00.000.000/0000-00)
 */
export function normalizeCNPJ(value: string): string {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8)
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  if (numbers.length <= 12)
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
}

/**
 * Normaliza um valor para CPF ou CNPJ automaticamente
 */
export function normalizeCPFCNPJ(value: string): string {
  const numbers = value.replace(/\D/g, '');

  // Se tem mais de 11 dígitos, formata como CNPJ
  if (numbers.length > 11) {
    return normalizeCNPJ(value);
  }

  // Caso contrário, formata como CPF
  return normalizeCPF(value);
}

/**
 * Normaliza um valor para formato de telefone brasileiro
 * Suporta: (00) 0000-0000 e (00) 00000-0000
 */
export function normalizeTelefone(value: string): string {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 0) return '';
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

/**
 * Normaliza um valor para formato de dinheiro (R$ 0.000,00)
 */
export function normalizeDinheiro(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  if (!numbers) return '';

  // Converte para número e divide por 100 para ter os centavos
  const amount = parseInt(numbers, 10) / 100;

  // Formata o número
  return amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Remove formatação de dinheiro e retorna apenas números
 */
export function denormalizeDinheiro(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Converte valor formatado em dinheiro para número
 */
export function dinheiroParaNumero(value: string): number {
  const numbers = value.replace(/\D/g, '');
  return parseInt(numbers || '0', 10) / 100;
}

/**
 * Converte número para formato de dinheiro
 */
export function numeroParaDinheiro(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
