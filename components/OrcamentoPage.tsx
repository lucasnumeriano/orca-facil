import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Container from '@/components/Container';
import InternalHeader from '@/components/InernalHeader';
import Input from '@/components/Input';
import Button from '@/components/Button';
import EmissorForm from '@/components/forms/EmissorForm';
import ClienteForm from '@/components/forms/ClienteForm';
import OrcamentoForm from '@/components/forms/OrcamentoForm';
import MateriaisForm from '@/components/forms/MateriaisForm';
import T from '@/components/T';
import { useOrcamento } from '@/contexts/OrcamentoContext';
import { normalizeDinheiro } from '@/util/normalize';

interface CampoEspecifico {
  label: string;
  field: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric';
  aplicarNormalizacao?: boolean;
}

interface OrcamentoPageProps {
  title: string;
  camposEspecificos: CampoEspecifico[];
}

export const OrcamentoPage: React.FC<OrcamentoPageProps> = ({ title, camposEspecificos }) => {
  const {
    formData,
    materials,
    updateFormData,
    addMaterial,
    removeMaterial,
    updateMaterial,
    generateBudget,
    isGenerating,
  } = useOrcamento();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height + 30);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Container className="bg-slate-900">
      <InternalHeader title={title} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}>
        <ScrollView
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: keyboardHeight || 40 }}>
          <View className="gap-4">
            {/* Seção Específica */}
            <View className="rounded-lg bg-white p-4">
              <View className="mb-4">
                <T variant="h3" color="text-slate-700">
                  Dados do Serviço
                </T>
              </View>

              <View className="gap-3">
                {camposEspecificos.map((campo) => (
                  <Input
                    key={campo.field}
                    label={campo.label}
                    value={formData[campo.field as keyof typeof formData] as string}
                    onChangeText={(value) =>
                      updateFormData(
                        campo.field as keyof typeof formData,
                        campo.aplicarNormalizacao ? normalizeDinheiro(value) : value
                      )
                    }
                    placeholder={campo.placeholder}
                    keyboardType={campo.keyboardType || 'default'}
                  />
                ))}
              </View>
            </View>

            {/* Materiais */}
            <MateriaisForm
              materials={materials}
              onAddMaterial={addMaterial}
              onRemoveMaterial={removeMaterial}
              onUpdateMaterial={updateMaterial}
            />

            {/* Dados do Emissor */}
            <EmissorForm
              emitidoPor={formData.emitidoPor}
              cpfCnpj={formData.cpfCnpjEmissor}
              endereco={formData.enderecoEmissor}
              telefone={formData.telefoneEmissor}
              onUpdate={updateFormData}
            />

            {/* Dados do Cliente */}
            <ClienteForm
              para={formData.para}
              cpfCnpj={formData.cpfCnpjCliente}
              endereco={formData.enderecoCliente}
              telefone={formData.telefoneCliente}
              cidade={formData.cidade}
              estado={formData.estado}
              onUpdate={updateFormData}
            />

            {/* Dados do Orçamento */}
            <OrcamentoForm
              tituloOrcamento={formData.tituloOrcamento}
              servico={formData.servico}
              prazoEntrega={formData.prazoEntrega}
              validade={formData.validade}
              data={formData.data}
              onUpdate={updateFormData}
            />

            {/* Botão Gerar Orçamento */}
            <View className="mb-24">
              <Button
                title={isGenerating ? 'Gerando PDF...' : 'Gerar Orçamento'}
                onPress={generateBudget}
                bgColor="bg-blue-600"
                color="text-white"
                disabled={isGenerating}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
