import { useEffect } from "preact/hooks";

interface Props {
  /**
   * @title Page Title
   */
  title?: string;
  /**
   * @title Page Description
   */
  description?: string;
  /**
   * @title Target Value
   * @description The goal value to be reached (in money or units)
   */
  targetValue?: number;
  /**
   * @title Current Value
   * @description The current value achieved (in money or units)
   */
  currentValue?: number;
  /**
   * @title Button Link
   * @description URL to redirect when clicking the button
   */
  buttonLink?: string;
  /**
   * @title Button Text
   */
  buttonText?: string;
}

const defaultProps: Props = {
  title: "Page Title",
  description: "Little resume",
  targetValue: 1000,
  currentValue: 900,
  buttonLink: "#",
  buttonText: "Call to action"
};

export default function ProgressBar({
  title = defaultProps.title,
  description = defaultProps.description,
  targetValue = defaultProps.targetValue,
  currentValue = defaultProps.currentValue,
  buttonLink = defaultProps.buttonLink,
  buttonText = defaultProps.buttonText,
}: Props) {

  useEffect(() => {
    if (!currentValue || !targetValue) return;
    const percentage = Math.min(Math.round((currentValue / targetValue) * 100), 100);
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (progressBar && progressText) {
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `Faltam ${100 - percentage}% para atingir o valor total`;
    } else {
      console.error("ProgressBar not found");
    }
  }, [currentValue, targetValue]);

  return (
    <div className="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
      <p className="text-lg mb-8 text-center">{description}</p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div id="progress-bar" className="bg-blue-600 h-4 rounded-full w-0"></div>
      </div>

      <p id="progress-text" className="text-lg mb-8"></p>

      <a href={buttonLink} className="bg-blue-600 text-white px-6 py-2  hover:bg-blue-700">
        {buttonText}
      </a>
    </div>
  );
}

export function Preview() {
  return <ProgressBar {...defaultProps} />;
}
