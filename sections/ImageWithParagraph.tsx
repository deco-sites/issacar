import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Copy from "site/sections/CopyContentSession.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  tagline?: string;
  showImage?: boolean;
  image?: ImageWidget;
  isMobile?: boolean;
  copyContent?: string;
  backgroundColor?: string;
  buttonTextValue?: string;
  idcustom?: string;
  placement?: "left" | "right" | "top" | "bottom";
  cta?: CTA[];
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const PLACEMENT = {
  left: "flex-col md:flex-row-reverse",
  right: "flex-col md:flex-row",
  top: "flex-col md:flex-col sm:flex-col",
  bottom: "flex-col-reverse md:flex-col-reverse sm:flex-col-reverse",
};

export const LoadingFallback = (props: Props) => {
  return (
   <div style={{ height: "716px" }} class="flex justify-center items-center">
     <span class="loading loading-spinner" />
   </div>
  );
};

export function ErrorFallback({ error = { name: "Error", message: "Unknown error" } }: { error?: Error }) {
  // Your error handling logic goes here
  // You can display an error message, log the error, or render a fallback UI
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
};

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/772e246e-1959-46ac-a309-3f25ab20af6f";

export default function ImageWithParagraph({
  title = "Here's an intermediate size heading you can edit",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  tagline = "Tagline",
  image = DEFAULT_IMAGE,
  showImage = true,
  isMobile=false,
  placement = "left",
  disableSpacing,
  backgroundColor="#000000",
  buttonTextValue="Copiar",
  copyContent="Your content here",
  idcustom="setyourid",
  cta = [
    { id: "change-me-1", href: "/", text: "Change me", style: "Outline" },
    { id: "change-me-2", href: "/", text: "Change me", style: "Ghost" },
  ],
}: Props) {
  return (
    <nav id={idcustom} >
    <div class="lg:container md:max-w-6xl lg:mx-auto mx-4 text-sm">
      <div
        class={`flex ${
          PLACEMENT[placement]
        } gap-2 md:gap-20 text-left items-center z-10 ${
          disableSpacing?.top ? "" : "pt-12 lg:pt-28"
        } ${disableSpacing?.bottom ? "" : "pb-12 lg:pb-28"}`}
      >
        <div class="w-full md:w-1/2  overflow-hidden">
          {showImage && (
            <Image
              width={640}
              height={640}
              class="object-fit z-10"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              decoding="async"
              loading="lazy"
            />
          )}{
            isMobile && (
              <Copy contentCopy={copyContent} backgroundColor={backgroundColor} buttonTextValue={buttonTextValue}/>
            )
          }
        </div>
        <div class="w-full md:w-1/2 space-y-2 md:space-y-4 md:max-w-xl gap-2 z-10">
          <p class="text-sm font-semibold text-center xl:text-left sm:text-left">
            {tagline}
          </p>
          <p class="text-4xl leading-snug text-center xl:text-left sm:text-left">
            {title}
          </p>
          <p class="leading-normal text-center xl:text-left sm:text-left">
            {description}
          </p>
          <div class="flex justify-center gap-2 pt-4">
            {cta?.map((item) => (
              <a
                key={item?.id}
                id={item?.id}
                href={item?.href}
                target={item?.href.includes("http") ? "_blank" : "_self"}
                class={`font-normal btn btn-secondary
                  ${!item.style || item.style == "Outline" && "btn-outline"}
                  ${item.style == "Ghost" && "btn-ghost"}
                `}
              >
                {item?.text}
                {item.style == "Ghost" && (
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.70697 16.9767L15.414 11.2697L9.70697 5.56274L8.29297 6.97674L12.586 11.2697L8.29297 15.5627L9.70697 16.9767Z"
                      fill="#18181B"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
</nav>
  );
}
