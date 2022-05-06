import { feedbackTypes, FeedbackType } from ".."
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
    return (<>
        <header>
            <span className="tex-xl leading-6">Deixe eu feedback</span>
            <CloseButton />
        </header>
        <div className="flex py-8 gap-2 w-full">
            {Object.entries(feedbackTypes).map(([key, value]) => {
                return (
                    <button
                        key={key}
                        //Função resgatada por propriedade do componente pai
                        onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                        type="button"
                        className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                );
            })}
        </div>
        <footer className="text-xs text-neutral-400">
            Feito com 🤍 pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
        </footer>
    </>)
}