import React from 'react';
import { Modal, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import T from './T';
import Button from './Button';

interface PdfSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const PdfSuccessModal: React.FC<PdfSuccessModalProps> = ({
  visible,
  onClose,
  onDownload,
  onShare,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <View className="mb-6 items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <MaterialIcons name="check-circle" size={56} color="#22c55e" />
            </View>
            <T variant="h2" color="text-slate-800" align="text-center">
              Orçamento Gerado!
            </T>
            <View className="mt-2">
              <T variant="body" color="text-slate-600" align="text-center">
                Seu orçamento foi gerado com sucesso. Escolha uma ação abaixo:
              </T>
            </View>
          </View>

          {/* Actions */}
          <View className="mb-4 gap-3">
            <Button
              title="Compartilhar"
              onPress={onShare}
              bgColor="bg-blue-600"
              color="text-white"
              startIcon={<MaterialIcons name="share" size={20} color="white" />}
            />
            <Button
              title="Baixar"
              onPress={onDownload}
              bgColor="bg-green-600"
              color="text-white"
              startIcon={<MaterialIcons name="file-download" size={20} color="white" />}
            />
          </View>

          {/* Close Button */}
          <Pressable
            onPress={onClose}
            className="items-center rounded-lg border border-slate-300 py-3">
            <T variant="body" color="text-slate-700">
              Fechar
            </T>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PdfSuccessModal;
