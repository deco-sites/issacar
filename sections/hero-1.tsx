import { ImageWidget } from "apps/admin/widgets.ts";

interface ImageItem {
  image: ImageWidget;
  alt: string;
}

interface Props {
  /**
   * @description List of images for the gallery
   */
  images?: ImageItem[];
  /**
   * @description Title of the gallery
   * @format string
   */
  title?: string;
  /**
   * @description Background color of the gallery
   * @format color-input
   */
  backgroundColor?: string;
}

export const LoadingFallback = () => {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
};

export default function ImageGallery({
  images = [
    {
      image:
        "https://decoims.com/issacar/f0683107-98cf-422f-9eed-211112e9f8b1/ff6bb37e-0eab-40e1-a454-86856efc278e.jpg",
      alt: "Image 1",
    },
    {
      image:
        "https://decoims.com/issacar/f0683107-98cf-422f-9eed-211112e9f8b1/ff6bb37e-0eab-40e1-a454-86856efc278e.jpg",
      alt: "Image 2",
    },
    {
      image:
        "https://decoims.com/issacar/f0683107-98cf-422f-9eed-211112e9f8b1/ff6bb37e-0eab-40e1-a454-86856efc278e.jpg",
      alt: "Image 3",
    },
  ],
  title = "Image Gallery",
  backgroundColor = "#f3f4f6",
}: Props) {
  return (
    <div style={{ backgroundColor }} class="p-8">
      <h2 class="text-3xl font-bold mb-6 text-center">{title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <div key={index} class="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.alt}
              class="w-auto h-auto  shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
