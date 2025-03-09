import { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const AddToHomeScreen = () => {
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [show, setShow] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    // Detecta se é iOS (Safari)
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setShowInstallMessage(window.innerWidth < 600 ? true : false)

    // Captura o evento de instalação no Android
    const beforeInstallPromptHandler = (e: any) => {
      e.preventDefault();
      setPromptEvent(e);
      setShow(true)
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
      {isIOS && showInstallMessage && show && (
        <div className="p-4 fixed bottom-0 right-[5vw] left-[5vw] bg-white w-[90vw] border-2 rounded-t-lg shadow-xl" >
          <div className="flex items-center" >
            <Image src={Logo} alt="Logo" className="size-20 p-1" />
            <p>📲 Para instalar, toque em <strong>Compartilhar</strong>  <span role="img" aria-label="share icon">
              {' '}
              ⎋{' '}
            </span> e depois em <strong>Adicionar à Tela Inicial</strong>  <span role="img" aria-label="plus icon">
                {' '}
                ➕{' '}
              </span>.</p>
          </div>
          <div className="flex justify-end mt-2" >
            <button onClick={() => setShow(false)} className="bg-red-500 text-white p-2 rounded">
              Fechar
            </button>
          </div>
        </div>
      )
      }

      {/* Botão de instalação no Android */}
      {
        promptEvent && show && showInstallMessage && (
          <div className="p-4 fixed bottom-0 right-[5vw] left-[5vw] bg-white w-[90vw] border-2 rounded-t-lg shadow-xl" >
            <div className="flex items-center" >
              <Image src={Logo} alt="Logo" className="size-20 p-1" />
              <p> Deseja Intalar o App da sua area de tabalho?</p>
            </div>
            <div className="flex justify-around mt-2" >
              <button onClick={() => setShow(false)} className="bg-red-500 text-white p-2 rounded">
                Fechar
              </button>
              <button onClick={installPWA} className="bg-green-500 text-white p-2 rounded">
                Instalar
              </button>
            </div>

          </div>

        )
      }
    </div >
  );
};

export default AddToHomeScreen;
