export interface CTA {
  id?: string;
  href: string;
  text: string;
  complement?:string;
  style?: "Outline" | "Ghost";
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  tagline?: string;
  showMap?: boolean;
  api?: string;
  mapWidth: string;
  mapHeight: string;
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

export const LoadingFallback = () => {
  return (
   <div style={{ height: "716px" }} class="flex justify-center items-center">
     <span class="loading loading-spinner" />
   </div>
  );
};


export default function Maps({
  title = "Here's an intermediate size heading you can edit",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  tagline = "Tagline",
  api = "",
  showMap = true,
  placement = "left",
  mapWidth = "600",
  mapHeight = "450",
  disableSpacing,
  cta = [
    { id: "change-me-1", href: "/", text: "Change me", style: "Outline" },
    { id: "change-me-2", href: "/", text: "Change me", style: "Ghost" },
  ],
}: Props) {
  return (
    <nav class="lg:container md:max-w-6xl lg:mx-auto mx-4 text-sm" id="local">
      <div
        class={`flex ${
          PLACEMENT[placement]
        } gap-12 md:gap-20 text-left items-center z-10 ${
          disableSpacing?.top ? "" : "pt-12 lg:pt-28"
        } ${disableSpacing?.bottom ? "" : "pb-12 lg:pb-28"}`}
      >
        <div class="w-full md:w-1/2 border border-secondary rounded-lg overflow-hidden">
          {showMap && (
            <iframe
              width={mapWidth}
              height={mapHeight}
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${api}&q=Issacar+Church+Lugar+de+Adoração`}
              class="w-100 flex justify-center"
            />
          )}
        </div>
        <div class="w-full md:w-1/2 space-y-2 md:space-y-4 md:max-w-xl gap-4 z-10">
          <p class="text-sm font-semibold xl:text-left md:text-left text-center">
            {tagline}
          </p>
          <p class="text-4xl leading-snug xl:text-left md:text-left text-center">
            {title}
          </p>
          <p class="leading-normal xl:text-left md:text-left text-center">
            {description}
          </p>
          <div class="flex gap-3 pt-4 xl:flex-row md:flex-row flex-col justify-center">
            {cta.length > 0 && cta?.map((item) => (
              <a
                key={item?.id}
                id={item?.id}
                href={item?.href}
                target={item?.href.includes("http") ? "_blank" : "_self"}
                class={`font-normal btn btn-primary
                    ${!item.style || item.style == "Outline" && "btn-outline"}
                    ${item.style == "Ghost" && "btn-ghost"}
                  `}
              >
                <div class={`flex flex-col `}>
                  <p class={`font-medium`}>{item?.text}</p>
                  <p class={`font-bold`}>{item?.complement}</p> 
                  {item.style == "Ghost"} 
                </div>
                
                
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
