import { ImageWidget } from 'apps/admin/widgets.ts';

interface Product {
  image: ImageWidget;
  name: string;
  price: number;
  purchaseUrl: string;
}

interface Props {
  /**
   * @description Title of the product shelf
   * @format rich-text
   */
  title?: string;
  /**
   * @description List of products to display
   */
  products?: Product[];
  /**
   * @description Background color of the shelf
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @description Text color
   * @format color-input
   */
  textColor?: string;
  /**
   * @description Number of products to show per slide
   */
  productsPerSlide?: number;
}

export default function ProductShelfSlider({
  title = "Featured Products",
  products = [
    {
      image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      name: "Product 1",
      price: 19.99,
      purchaseUrl: "#"
    },
    {
      image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      name: "Product 2",
      price: 24.99,
      purchaseUrl: "#"
    },
    {
      image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      name: "Product 3",
      price: 29.99,
      purchaseUrl: "#"
    },
    {
      image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      name: "Product 4",
      price: 34.99,
      purchaseUrl: "#"
    }
  ],
  backgroundColor = "#f3f4f6",
  textColor = "#1f2937",
  productsPerSlide = 3
}: Props) {
  return (
    <div style={{ backgroundColor, color: textColor }} class="p-8">
      <h2 class="text-3xl font-bold mb-6 text-center">{title}</h2>
      <div class="carousel w-full">
        {Array.from({ length: Math.ceil(products.length / productsPerSlide) }).map((_, slideIndex) => (
          <div id={`slide${slideIndex}`} class="carousel-item relative w-full" key={slideIndex}>
            <div class="flex justify-center items-center w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide).map((product, index) => (
                  <div key={index} class="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                    <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-t-lg mb-4" />
                    <h3 class="text-xl font-semibold mb-2">{product.name}</h3>
                    <p class="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                    <a href={product.purchaseUrl} class="btn btn-primary w-full">
                      Buy Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${(slideIndex - 1 + Math.ceil(products.length / productsPerSlide)) % Math.ceil(products.length / productsPerSlide)}`} class="btn btn-circle">❮</a> 
              <a href={`#slide${(slideIndex + 1) % Math.ceil(products.length / productsPerSlide)}`} class="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}