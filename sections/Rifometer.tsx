import { useScript } from "@deco/deco/hooks";

interface Props {
  /**
   * @title Page Title
   */
  title: string;
  /**
   * @title Page Description
   */
  description: string;
  /**
   * @title Target Value
   * @description The goal value to be reached (in money or units)
   */
  targetValue: number;
  /**
   * @title Current Value
   * @description The current value achieved (in money or units)
   */
  currentValue: number;
  /**
   * @title Button Link
   * @description URL to redirect when clicking the button
   */
  buttonLink: string;
  /**
   * @title Button Text
   */
  buttonText: string;
}

const defaultProps: Props = {
  title: "Page Title",
  description: "Little resume",
  targetValue: 1000,
  currentValue: 900,
  buttonLink: "#",
  buttonText: "Call to action"
};


export const LoadingFallback = () => {
  return (
   <div style={{ height: "716px" }} class="flex justify-center items-center">
     <span class="loading loading-spinner" />
   </div>
  );
};

export default function ProgressBar(props: Props) {
  props.title ??= defaultProps.title;
  props.description ??= defaultProps.description;
  props.targetValue ??= defaultProps.targetValue;
  props.currentValue ??= defaultProps.currentValue;
  props.buttonLink ??= defaultProps.buttonLink;
  props.buttonText ??= defaultProps.buttonText;

  const { title, description, targetValue, currentValue, buttonLink, buttonText } = props;

  return (
    <div class="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{title}</h1>
      <p class="text-lg mb-8">{description}</p>

      <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div id="progress-bar" class="bg-blue-600 h-4 rounded-full w-0"></div>
      </div>

      <p id="progress-text" class="text-lg mb-8"></p>

      <a href={buttonLink} class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        {buttonText}
      </a>

      <script dangerouslySetInnerHTML={{
        __html: useScript(({ current, target }) => {
          const percentage = Math.min(Math.round((current / target) * 100), 100);
          const progressBar = document.getElementById("progress-bar");
          const progressText = document.getElementById("progress-text");

          if (progressBar && progressText) {
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `Faltam ${100 - percentage}% para atingir o valor total`;
          }
        }, { current: currentValue, target: targetValue })
      }} />
    </div>
  );
}

export function Preview() {
  return <ProgressBar {...defaultProps} />;
}