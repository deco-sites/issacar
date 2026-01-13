import ProgressBar from "../islands/Rifometer.tsx";

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

export const LoadingFallback = () => {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
};

export default function RifometerSession({
  title = "Page Title",
  description = "Little resume",
  targetValue = 1000,
  currentValue = 900,
  buttonLink = "#",
  buttonText = "Call to action",
}: Props) {
  return (
    <ProgressBar
      title={title}
      description={description}
      targetValue={targetValue}
      currentValue={currentValue}
      buttonLink={buttonLink}
      buttonText={buttonText}
    />
  );
}
