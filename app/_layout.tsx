import { Stack } from 'expo-router';
import { PdfModalProvider } from '@/contexts/PdfModalContext';
import '../global.css';

export default function RootLayout() {
  return (
    <PdfModalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PdfModalProvider>
  );
}
