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

export const LoadingFallback = () => {
  return (
    <div style={{ height: "716px" }} className="flex justify-center items-center">
      <span className="loading loading-spinner" />
    </div>
  );
};

export default function ProgressBar({
  title = "Page Title",
  description = "Little resume",
  targetValue = 1000,
  currentValue = 900,
  buttonLink = "#",
  buttonText = "Call to action"
}: Props) {
  return (
    <div className="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{description}</p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div id="progress-bar" className="bg-blue-600 h-4 rounded-full w-0"></div>
      </div>

      <p id="progress-text" className="text-lg mb-8"></p>

      <a href={buttonLink} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        {buttonText}
      </a>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const current = ${currentValue};
            const target = ${targetValue};
            const percentage = Math.min(Math.round((current / target) * 100), 100);
            const progressBar = document.getElementById("progress-bar");
            const progressText = document.getElementById("progress-text");
          
            if (progressBar && progressText) {
              progressBar.style.width = \`\`;
              progressText.textContent = \`Faltam \${100 -atingir o valor total\`;
            }
          });
        `
      }} />
    </div>
  );
}

export function Preview() {
  return <ProgressBar />;
}