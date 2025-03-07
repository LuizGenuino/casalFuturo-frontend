import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    // Detecta se é iOS (Safari)
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Captura o evento de instalação no Android
    const beforeInstallPromptHandler = (e: any) => {
      e.preventDefault();
      setPromptEvent(e);
      setShowInstallMessage(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  const installPWA = () => {
    if (promptEvent) {
      promptEvent.prompt();
    }
  };

  return (
    <div>
      {/* Mostrar instrução para iOS */}
      {isIOS && showInstallMessage && (
        <div className="p-4 bg-blue-500 text-white text-center">
          📲 Para instalar, toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela Inicial</strong>.
        </div>
      )}

      {/* Botão de instalação no Android */}
      {promptEvent && (
        <button onClick={installPWA} className="bg-green-500 text-white p-2 rounded">
          Instalar App
        </button>
      )}
    </div>
  );
};

export default AddToHomeScreen;
