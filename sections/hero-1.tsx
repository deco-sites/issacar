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
   * @format rich-text
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
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      alt: "Image 1",
    },
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      alt: "Image 2",
    },
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
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
              class="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <a
              href={item.image}
              download
              class="mt-4 btn btn-primary"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
