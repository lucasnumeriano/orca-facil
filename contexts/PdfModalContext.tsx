import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { sharePDF } from '@/util/pdfGenerator';

interface PdfModalContextData {
  pdfUri: string | null;
  showModal: boolean;
  openModal: (uri: string) => void;
  closeModal: () => void;
  handleSharePDF: () => Promise<void>;
  handleDownloadPDF: () => void;
}

const PdfModalContext = createContext<PdfModalContextData>({} as PdfModalContextData);

export const PdfModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback((uri: string) => {
    setPdfUri(uri);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setPdfUri(null);
  }, []);

  const handleSharePDF = useCallback(async () => {
    if (pdfUri) {
      try {
        await sharePDF(pdfUri);
      } catch (error) {
        console.error('Erro ao compartilhar PDF:', error);
        Alert.alert('Erro', 'Não foi possível compartilhar o orçamento.');
      }
    }
  }, [pdfUri]);

  const handleDownloadPDF = useCallback(() => {
    if (pdfUri) {
      Alert.alert('PDF Salvo', `O orçamento foi salvo e está disponível para visualização.`, [
        { text: 'OK' },
      ]);
    }
  }, [pdfUri]);

  return (
    <PdfModalContext.Provider
      value={{
        pdfUri,
        showModal,
        openModal,
        closeModal,
        handleSharePDF,
        handleDownloadPDF,
      }}>
      {children}
    </PdfModalContext.Provider>
  );
};

export const usePdfModal = () => {
  const context = useContext(PdfModalContext);

  if (!context) {
    throw new Error('usePdfModal must be used within a PdfModalProvider');
  }

  return context;
};
