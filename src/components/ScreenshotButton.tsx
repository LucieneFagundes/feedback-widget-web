import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        //O ponto de explamação o fim da linha, é para dizer que nunca vai ser NULL
        //Vai ser tirado uma foto da tela
        const canvas = await html2canvas(document.querySelector("html")!);
        // E aqui vai ser convertido em png com o BASE64
        const base64image = canvas.toDataURL('image.png');
        // "onScreenshotTook" vai retornar o endereço da foto obtida para a função pai
        onScreenshotTook(base64image);
        setIsTakingScreenshot(false);
    }

    if(screenshot){
        return (<>
            <button 
            type="button"
            className="p-1 w-10 h-10 rounded-md border-tranparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,
            }}
            onClick={() => onScreenshotTook(null)}
            >
                <Trash weight="fill"/>
            </button>
        </>);
        
    }

    return (<>
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {/* Se estiver tirando o print, imprima o icone de loading. Se não, mantenha a camera pronta */}
            {isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6 text-zinc-100" />}
        </button>
    </>)
}