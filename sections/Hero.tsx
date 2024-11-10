import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaActive: boolean;
  /**
   * @format color-input
   */
  textColor?: string;
  /**
   * @format color-input
   */
  ctaBackgroundColor?: string;
  /**
   * @format color-input
   */
  ctaTextColor?: string;
  backgroundImage?: ImageWidget;
}

export default function HeroSection({
  title = "Welcome to Our Website",
  subtitle = "Discover amazing products and services",
  ctaText = "Get Started",
  ctaHref = "#",
  textColor = "#ffffff",
  ctaBackgroundColor = "#4CAF50",
  ctaActive = true,
  ctaTextColor = "#ffffff",
  backgroundImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
}: Props) {
  return (
    <div class="relative h-screen flex items-center justify-center text-center">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      </div>
      {ctaActive == true &&
        <div class="absolute inset-0 bg-black opacity-50"></div>}
      <div class="relative z-10 px-4">
        <h1
          class="text-4xl md:text-6xl font-bold mb-4"
          style={{ color: textColor }}
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </h1>
        <p
          class="text-xl md:text-2xl mb-8"
          style={{ color: textColor }}
        >
          {subtitle}
        </p>
        {ctaActive &&
          (
            <a
              href={ctaHref}
              class="btn btn-lg"
              style={{
                backgroundColor: ctaBackgroundColor,
                color: ctaTextColor,
              }}
            >
              {ctaText}
            </a>
          )}
      </div>
    </div>
  );
}
