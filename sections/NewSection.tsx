import type { AppContext } from "../apps/site.ts";

interface Props {
  /**
   * @description The label for the input field
   * @format rich-text
   */
  inputLabel?: string;
  /**
   * @description The placeholder text for the input field
   */
  placeholder?: string;
  /**
   * @description The text for the copy button
   */
  copyButtonText?: string;
  /**
   * @description The background color of the component
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @description The text color of the component
   * @format color-input
   */
  textColor?: string;
  /**
   * @description The current input text
   */
  inputText?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const inputText = form.get("inputText")?.toString() || "";
  return { ...props, inputText };
}

export function loader(props: Props) {
  return props;
}

export default function TextInputAndCopy({
  inputLabel = "Enter your text:",
  placeholder = "Type something...",
  copyButtonText = "Copy Text",
  backgroundColor = "#f3f4f6",
  textColor = "#1f2937",
  inputText = ""
}: Props) {
  return (
    <div style={{ backgroundColor, color: textColor }} class="p-6 rounded-lg shadow-md">
      <label class="block mb-2 font-bold">{inputLabel}</label>
      <form
        hx-post="/api/sections/TextInputAndCopy"
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        <input
          type="text"
          name="inputText"
          value={inputText}
          placeholder={placeholder}
          class="w-full p-2 mb-4 border rounded"
          hx-trigger="keyup changed delay:500ms"
          hx-post="/api/sections/TextInputAndCopy"
          hx-target="closest div"
          hx-swap="outerHTML"
        />
        <div class="flex items-center justify-between">
          <p class="text-lg">{inputText || "Your text will appear here"}</p>
          <button
            class="btn btn-primary"
            type="button"
          >
            {copyButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}