import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { FormData, TipoOrcamento } from '@/types/orcamento.types';
import { Material } from '@/components/MaterialInput';

interface GeneratePDFParams {
  formData: FormData;
  materials: Material[];
  tipoOrcamento: TipoOrcamento;
}

export const generateBudgetPDF = async ({
  formData,
  materials,
  tipoOrcamento,
}: GeneratePDFParams): Promise<string> => {
  const html = createHTMLContent(formData, materials, tipoOrcamento);

  const { uri } = await Print.printToFileAsync({
    html,
    base64: false,
  });

  return uri;
};

export const sharePDF = async (uri: string) => {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Compartilhar Orçamento',
    });
  }
};

const createHTMLContent = (
  formData: FormData,
  materials: Material[],
  tipoOrcamento: TipoOrcamento
): string => {
  const calcularTotal = () => {
    let totalServico = 0;

    switch (tipoOrcamento) {
      case 'por-hora':
        totalServico =
          parseFloat(formData.valorHora?.replace(/\./g, '').replace(',', '.') || '0') *
          parseFloat(formData.quantidadeHoras || '0');
        break;
      case 'por-dia':
        totalServico =
          parseFloat(formData.valorDiaria?.replace(/\./g, '').replace(',', '.') || '0') *
          parseFloat(formData.quantidadeDias || '0');
        break;
      case 'por-metro-quadrado':
        totalServico =
          parseFloat(formData.valorMetroQuadrado?.replace(/\./g, '').replace(',', '.') || '0') *
          parseFloat(formData.totalMetros || '0');
        break;
    }

    const totalMateriais = materials.reduce((acc, material) => {
      const valor = parseFloat(material.valor.replace(/\./g, '').replace(',', '.') || '0');
      const quantidade = parseFloat(material.quantidade || '0');
      return acc + valor * quantidade;
    }, 0);

    return {
      servico: totalServico,
      materiais: totalMateriais,
      total: totalServico + totalMateriais,
    };
  };

  const totais = calcularTotal();

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const getTituloPorTipo = () => {
    switch (tipoOrcamento) {
      case 'por-hora':
        return 'Orçamento - Por Hora';
      case 'por-dia':
        return 'Orçamento - Por Dia';
      case 'por-metro-quadrado':
        return 'Orçamento - Por Metro²';
    }
  };

  const getDetalheServico = () => {
    switch (tipoOrcamento) {
      case 'por-hora':
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Valor por Hora</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">R$ ${formData.valorHora}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Quantidade de Horas</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.quantidadeHoras}</td>
          </tr>
        `;
      case 'por-dia':
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Valor por Dia</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">R$ ${formData.valorDiaria}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Quantidade de Dias</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.quantidadeDias}</td>
          </tr>
        `;
      case 'por-metro-quadrado':
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Valor por Metro²</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">R$ ${formData.valorMetroQuadrado}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Total de Metros²</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.totalMetros}</td>
          </tr>
        `;
    }
  };

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${getTituloPorTipo()}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          font-size: 12px;
          color: #1e293b;
          line-height: 1.6;
          padding: 40px;
          background: #fff;
        }
        
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
        }
        
        .header-icon {
          display: inline-block;
          margin-bottom: 10px;
        }
        
        .header h1 {
          font-size: 28px;
          margin-bottom: 8px;
          font-weight: 700;
        }
        
        .header p {
          font-size: 14px;
          opacity: 0.95;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .info-section {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
        }
        
        .info-section h2 {
          font-size: 16px;
          color: #2563eb;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #2563eb;
        }
        
        .info-row {
          margin-bottom: 8px;
        }
        
        .info-label {
          font-weight: 600;
          color: #64748b;
          display: inline-block;
          width: 100px;
        }
        
        .info-value {
          color: #1e293b;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 18px;
          color: #2563eb;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        thead {
          background: #f1f5f9;
        }
        
        thead th {
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          font-size: 13px;
        }
        
        tbody tr:hover {
          background: #f8fafc;
        }
        
        tbody td {
          padding: 10px 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .text-right {
          text-align: right;
        }
        
        .total-section {
          background: #f8fafc;
          border: 2px solid #2563eb;
          border-radius: 8px;
          padding: 20px;
          margin-top: 30px;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .total-row.main {
          font-size: 18px;
          font-weight: 700;
          color: #2563eb;
          padding-top: 15px;
          border-top: 2px solid #cbd5e1;
          margin-top: 10px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 11px;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <!-- <div class="header-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.78 12.83C18.97 12.25 18.14 11.71 17.32 11.17C16.27 10.5 15.23 9.83 14.18 9.17C13.84 8.96 13.5 8.75 13.16 8.54C12.82 8.33 12.48 8.12 12.14 7.91C11.8 7.7 11.46 7.49 11.12 7.28C10.78 7.07 10.44 6.86 10.1 6.65C9.76 6.44 9.42 6.23 9.08 6.02C8.74 5.81 8.4 5.6 8.06 5.39C7.72 5.18 7.38 4.97 7.04 4.76C6.7 4.55 6.36 4.34 6.02 4.13C5.68 3.92 5.34 3.71 5 3.5C4.66 3.29 4.32 3.08 3.98 2.87C3.64 2.66 3.3 2.45 2.96 2.24C2.62 2.03 2.28 1.82 1.94 1.61C1.6 1.4 1.26 1.19 0.92 0.98C0.58 0.77 0.24 0.56 -0.1 0.35C-0.44 0.14 -0.78 -0.07 -1.12 -0.28C-1.46 -0.49 -1.8 -0.7 -2.14 -0.91C-2.48 -1.12 -2.82 -1.33 -3.16 -1.54C-3.5 -1.75 -3.84 -1.96 -4.18 -2.17C-4.52 -2.38 -4.86 -2.59 -5.2 -2.8" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="none"/>
            <path d="M8 10C8 10.55 7.55 11 7 11C6.45 11 6 10.55 6 10C6 9.45 6.45 9 7 9C7.55 9 8 9.45 8 10Z" fill="white"/>
            <path d="M12 18C14 18 16 16 16 14C16 12 14 10 12 10C10 10 8 12 8 14C8 16 10 18 12 18Z" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </div> -->
        <h1>${formData.tituloOrcamento || getTituloPorTipo()}</h1>
        <p>Documento gerado em ${formData.data}</p>
      </div>
      
      <div class="info-grid">
        <div class="info-section">
          <h2>📤 Emitido Por</h2>
          <div class="info-row">
            <span class="info-label">Nome:</span>
            <span class="info-value">${formData.emitidoPor}</span>
          </div>
          ${formData.cpfCnpjEmissor ? `<div class="info-row"><span class="info-label">CPF/CNPJ:</span><span class="info-value">${formData.cpfCnpjEmissor}</span></div>` : ''}
          ${formData.enderecoEmissor ? `<div class="info-row"><span class="info-label">Endereço:</span><span class="info-value">${formData.enderecoEmissor}</span></div>` : ''}
          ${formData.telefoneEmissor ? `<div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${formData.telefoneEmissor}</span></div>` : ''}
        </div>
        
        <div class="info-section">
          <h2>📥 Cliente</h2>
          <div class="info-row">
            <span class="info-label">Nome:</span>
            <span class="info-value">${formData.para}</span>
          </div>
          ${formData.cpfCnpjCliente ? `<div class="info-row"><span class="info-label">CPF/CNPJ:</span><span class="info-value">${formData.cpfCnpjCliente}</span></div>` : ''}
          ${formData.enderecoCliente ? `<div class="info-row"><span class="info-label">Endereço:</span><span class="info-value">${formData.enderecoCliente}</span></div>` : ''}
          ${formData.telefoneCliente ? `<div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${formData.telefoneCliente}</span></div>` : ''}
          ${formData.cidade && formData.estado ? `<div class="info-row"><span class="info-label">Local:</span><span class="info-value">${formData.cidade} - ${formData.estado}</span></div>` : ''}
        </div>
      </div>
      
      ${
        formData.servico || formData.prazoEntrega || formData.validade
          ? `
      <div class="section">
        <h2 class="section-title">📋 Informações do Orçamento</h2>
        <table>
          <tbody>
            ${formData.servico ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Serviço</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.servico}</td></tr>` : ''}
            ${formData.prazoEntrega ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Prazo de Entrega</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.prazoEntrega}</td></tr>` : ''}
            ${formData.validade ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Validade</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formData.validade}</td></tr>` : ''}
          </tbody>
        </table>
      </div>
      `
          : ''
      }
      
      <div class="section">
        <h2 class="section-title">💼 Detalhamento do Serviço</h2>
        <table>
          <tbody>
            ${getDetalheServico()}
            <tr style="background: #f1f5f9; font-weight: 600;">
              <td style="padding: 12px 8px;">Subtotal Serviço</td>
              <td style="padding: 12px 8px; text-align: right; color: #2563eb;">${formatarMoeda(totais.servico)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      ${
        materials.length > 0
          ? `
      <div class="section">
        <h2 class="section-title">🛠️ Materiais</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-right">Valor Unit.</th>
              <th class="text-right">Qtd./Metros</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${materials
              .map((material) => {
                const valor = parseFloat(
                  material.valor.replace(/\./g, '').replace(',', '.') || '0'
                );
                const quantidade = parseFloat(material.quantidade || '0');
                const total = valor * quantidade;
                const unidade = material.tipoMedida === 'metros' ? 'm' : 'un';
                return `
                <tr>
                  <td>${material.nome}</td>
                  <td class="text-right">R$ ${material.valor}</td>
                  <td class="text-right">${material.quantidade} ${unidade}</td>
                  <td class="text-right">${formatarMoeda(total)}</td>
                </tr>
              `;
              })
              .join('')}
            <tr style="background: #f1f5f9; font-weight: 600;">
              <td colspan="3" style="padding: 12px 8px;">Subtotal Materiais</td>
              <td style="padding: 12px 8px; text-align: right; color: #2563eb;">${formatarMoeda(totais.materiais)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      `
          : ''
      }
      
      <div class="total-section">
        <div class="total-row">
          <span>Subtotal Serviço:</span>
          <span>${formatarMoeda(totais.servico)}</span>
        </div>
        ${
          materials.length > 0
            ? `
        <div class="total-row">
          <span>Subtotal Materiais:</span>
          <span>${formatarMoeda(totais.materiais)}</span>
        </div>
        `
            : ''
        }
        <div class="total-row main">
          <span>VALOR TOTAL:</span>
          <span>${formatarMoeda(totais.total)}</span>
        </div>
      </div>
      
      <div class="footer">
        <p>Este orçamento é válido até ${formData.validade || 'a data especificada'}</p>
        <p style="margin-top: 8px;">Documento gerado eletronicamente - ${new Date().toLocaleString('pt-BR')}</p>
      </div>
    </body>
    </html>
  `;
};
