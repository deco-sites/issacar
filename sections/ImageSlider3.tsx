import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface SlideImage {
  /**
   * @title Image
   */
  image: ImageWidget;
  /**
   * @title Alternative Text
   */
  alt: string;
}

interface Props {
  /**
   * @title Images
   * @description List of images to be displayed in the slider
   * @minItems 2
   */
  images: SlideImage[];
  /**
   * @title Call to Action Form
   */
  showCTA?: boolean;
}

const defaultProps: Props = {
  images: [
    {
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC",
      alt: "Slide 1"
    },
    {
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC",
      alt: "Slide 2"
    }
  ],
  showCTA: true
};

export default function ImageSlider(props: Props) {
  props.images ??= defaultProps.images;
  props.showCTA ??= defaultProps.showCTA;

  const { images, showCTA } = props;

  return (
    <div class="relative w-full">
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-300" id="slider-container">
          {images.map((slide) => (
            <div class="w-full flex-none">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={800}
                height={600}
                class="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
        id="prev-btn"
      >
        {"<"}
      </button>
      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
        id="next-btn"
      >
        {">"}
      </button>

      <div class="flex justify-center gap-2 mt-4" id="dots-container"></div>

      {showCTA && (
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 p-4 rounded">
          <form class="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="border p-2 rounded"
            />
            <button class="bg-blue-500 text-white p-2 rounded">Subscribe</button>
          </form>
        </div>
      )}

      <script
        dangerouslySetInnerHTML={{
          __html: useScript(({ totalSlides }: { totalSlides: number }) => {
            let currentSlide = 0;
            const container = document.getElementById("slider-container");
            const prevBtn = document.getElementById("prev-btn");
            const nextBtn = document.getElementById("next-btn");
            const dotsContainer = document.getElementById("dots-container");

            const updateSlider = () => {
              if (container) {
                container.style.transform = `translateX(-${currentSlide * 100}%)`;
              }
              updateDots();
            };

            const updateDots = () => {
              if (dotsContainer) {
                dotsContainer.innerHTML = "";
                for (let i = 0; i < totalSlides; i++) {
                  const dot = document.createElement("button");
                  dot.classList.add(
                    "w-3",
                    "h-3",
                    "rounded-full",
                    i === currentSlide ? "bg-blue-500" : "bg-gray-300"
                  );
                  dot.onclick = () => {
                    currentSlide = i;
                    updateSlider();
                  };
                  dotsContainer.appendChild(dot);
                }
              }
            };

            prevBtn?.addEventListener("click", () => {
              currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
              updateSlider();
            });

            nextBtn?.addEventListener("click", () => {
              currentSlide = (currentSlide + 1) % totalSlides;
              updateSlider();
            });

            updateDots();
          }, { totalSlides: props.images.length }),
        }}
      />
    </div>
  );
}

export function Preview() {
  return <ImageSlider {...defaultProps} />;
}