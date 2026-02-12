import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';

// Определяем, где мы запущены
const isWeb = Platform.OS === 'web';

// Компонент-обёртка
export default function igrulia() {
  if (isWeb) {
    // Браузер: используем iframe
    return (
      <iframe
        src="/components/c3p/index.html"  // путь в папке public твоего веб-проекта
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Game"
      />
    );
  } else {
    // Нативное: WebView
    return (
      <WebView
        source={{ uri: 'file:///components/c3p/index.html' }}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
      />
    );
  }
}