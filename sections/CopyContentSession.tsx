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

  buttonTextValue?:string 


}

export default function Copy({
  contentCopy = "",
  backgroundColor="#f3f4f6",
  buttonTextValue="Copiar"
}: Props) {

  return (
    <div class="p-2 rounded-lg" style={{ backgroundColor }}>
      <CopyContent contentCopy={contentCopy} buttonText={buttonTextValue} />
    </div>
   
  )
  
  
}
