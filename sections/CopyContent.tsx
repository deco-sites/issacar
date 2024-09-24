import { useState } from 'preact/hooks';

export interface Props {
    contentCopy: string;
}

export default function Copy({
    contentCopy = ""
}: Props) {


    const [copySuccess, setCopySuccess] = useState("");

    // Função para copiar texto
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(contentCopy);
            setCopySuccess("Texto copiado com sucesso!");
        } catch (err) {
            setCopySuccess("Falha ao copiar o texto."); // Exibe a mensagem de erro
        }
    };

    return (
        <div>
            <button onClick={copyToClipboard}>Copiar Texto</button>
            {copySuccess && <p>{copySuccess}</p>}
        </div>
    );

}