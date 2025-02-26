import Icon from "../components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export const LoadingFallback = () => {
  return (
    <div style={{ height: "60px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
};

export default function Social(
  { content, vertical = false, position }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
    position?: "start" | "center" | "end";
  },
) {
  return (
    <nav class="lg:container lg:mx-auto mx-4  p-4 relative  " id="#social">
      <div class={`flex flex-col items-${position} gap-8 relative`}>
        {content && content.items && content.items.length > 0 && (
          <div class={`flex flex-col gap-4 `}>
            {content.title && (
              <h3 class="text-4xl leading-snug">{content.title}</h3>
            )}
            <ul
              class={`list-none flex gap-2 ${
                vertical
                  ? "lg:flex-col lg:items-start"
                  : "flex-wrap items-center"
              } `}
            >
              {content.items.map((item) => {
                return (
                  <li>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} Logo`}
                      class="flex gap-1 items-center relative"
                    >
                      <span class="block p-1 ">
                        <Icon size={30} id={item.label} />
                      </span>
                      {vertical && (
                        <div class="text-sm hidden lg:block">{item.label}</div>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
