import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";

interface Props {
  /**
   * @description Images to be displayed in the slider
   * @minItems 2
   */
  images: ImageWidget[];
  /**
   * @description Time in milliseconds between each slide transition
   */
  interval?: number;
}

const defaultProps: Props = {
  images: [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC",
  ],
  interval: 3000,
};

export default function ImageSlider(props: Props) {
  props.images ??= defaultProps.images;
  props.interval ??= defaultProps.interval;

  const { images, interval } = props;

  return (
    <div class="relative overflow-hidden">
      <div class="flex transition-transform duration-500" id="slider-container">
        {images.map((image) => (
          <div class="w-full flex-none">
            <Image
              src={image}
              width={800}
              height={600}
              class="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: useScript(
            ({ interval }: { interval: number }) => {
              const container = document.getElementById("slider-container");
              let currentSlide = 0;

              setInterval(() => {
                currentSlide = (currentSlide + 1) % container.children.length;
                container.style.transform = `translateX(-${
                  currentSlide * 100
                }%)`;
              }, interval);
            },
            { interval },
          ),
        }}
      />
    </div>
  );
}

export function Preview() {
  return <ImageSlider {...defaultProps} />;
}
