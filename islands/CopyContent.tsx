import { useState } from "preact/hooks";

export interface Props {
  contentCopy: string;
}

export default function Copy({
  contentCopy = "",
}: Props) {
  const [copySuccess, setCopySuccess] = useState(""); // Estado para mensagem de sucesso

  // Função para copiar texto
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contentCopy);
      setCopySuccess("Texto copiado com sucesso!"); // Exibe a mensagem de sucesso
    } catch (err) {
      console.info("ERRO", err);
      setCopySuccess("Falha ao copiar o texto."); // Exibe a mensagem de erro
    }
  };

  return (
    <div>
      <p>{contentCopy}</p>
      <button onClick={copyToClipboard}>Copiar</button>
      {/* Mensagem de sucesso ou erro */}
      {copySuccess && <p>{copySuccess}</p>}
    </div>
  );
}
