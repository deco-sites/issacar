import CopyContent from "site/islands/CopyContent.tsx";

export interface Props {
  /**
   * @description The content to be copied
   * @format string
   */
  contentCopy: string;
  /**
   * @description The background color of the copy section
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @description The content to be copied
   * @format string
   */

  buttonTextValue?: string;
}

export const LoadingFallback = () => {
  return (
   <div style={{ height: "716px" }} class="flex justify-center items-center">
     <span class="loading loading-spinner" />
   </div>
  );
};

export default function Copy({
  contentCopy = "",
  backgroundColor = "#f3f4f6",
  buttonTextValue = "Copiar",
}: Props) {
  return (
    <nav class="lg:container lg:mx-auto mx-4  p-4 relative  " id="pixdata">
      <div class="p-2 rounded-lg" style={{ backgroundColor }}>
        <CopyContent contentCopy={contentCopy} buttonText={buttonTextValue} />
      </div>
    </nav>
  );
}
