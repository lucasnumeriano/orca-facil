import { Material } from '@/components/MaterialInput';

/**
 * Interface base para dados de orçamento
 */
export interface BaseFormData {
  // Dados padrão presentes em todos os orçamentos
  tituloOrcamento: string;
  emitidoPor: string;
  cpfCnpjEmissor: string;
  enderecoEmissor: string;
  telefoneEmissor: string;
  para: string;
  enderecoCliente: string;
  telefoneCliente: string;
  cidade: string;
  estado: string;
  cpfCnpjCliente: string;
  prazoEntrega: string;
  validade: string;
  data: string;
  servico: string;
}

/**
 * Campos específicos para cada tipo de orçamento
 */
export interface OrcamentoEspecifico {
  // Por Hora
  valorHora?: string;
  quantidadeHoras?: string;

  // Por Dia
  valorDiaria?: string;
  quantidadeDias?: string;

  // Por Metro²
  valorMetroQuadrado?: string;
  totalMetros?: string;
}

/**
 * Interface completa para dados de orçamento
 */
export interface FormData extends BaseFormData, OrcamentoEspecifico {}

/**
 * Tipo de orçamento
 */
export type TipoOrcamento = 'por-hora' | 'por-dia' | 'por-metro-quadrado';

/**
 * Estado completo do orçamento incluindo materiais
 */
export interface OrcamentoState {
  formData: FormData;
  materials: Material[];
  tipoOrcamento: TipoOrcamento;
}

/**
 * Valores iniciais padrão para o formulário
 */
export const initialFormData: FormData = {
  // Dados específicos
  valorHora: '',
  quantidadeHoras: '',
  valorDiaria: '',
  quantidadeDias: '',
  valorMetroQuadrado: '',
  totalMetros: '',

  // Dados padrão
  tituloOrcamento: '',
  emitidoPor: '',
  cpfCnpjEmissor: '',
  enderecoEmissor: '',
  telefoneEmissor: '',
  para: '',
  enderecoCliente: '',
  telefoneCliente: '',
  cidade: '',
  estado: '',
  cpfCnpjCliente: '',
  prazoEntrega: '',
  validade: '',
  data: new Date().toLocaleDateString('pt-BR'),
  servico: '',
};

/**
 * Campos obrigatórios por tipo de orçamento
 */
export const camposObrigatoriosPorTipo: Record<TipoOrcamento, (keyof FormData)[]> = {
  'por-hora': ['valorHora', 'quantidadeHoras', 'emitidoPor', 'para'],
  'por-dia': ['valorDiaria', 'quantidadeDias', 'emitidoPor', 'para'],
  'por-metro-quadrado': ['valorMetroQuadrado', 'totalMetros', 'emitidoPor', 'para'],
};
