export interface Props {
  /**
   * @description The text content to be copied
   * @format textarea
   */
  contentCopy: string;

  /**
   * @description The text for the copy button
   */
  buttonText?: string;
}

export default function Copy({
  contentCopy = "",
  buttonText = "Copiar",
}: Props) {
  // Função para copiar texto
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contentCopy);
      alert("Texto copiado com sucesso!"); // Exibe a mensagem de sucesso
    } catch (err) {
      console.info("ERRO", err);
    }
  };

  return (
    <div class="flex flex-col bg-base-200 rounded-lg shadow-md max-w-md mx-auto justify-center">
      <p class="text-2xl text-center font-black mb-8">{contentCopy}</p>
      <button class="btn btn-secondary btn-large" onClick={copyToClipboard}>
        {buttonText}
      </button>
    </div>
  );
}
