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

export default function Social(
    { content, vertical = false }: {
        content?: { title?: string; items?: SocialItem[] };
        vertical?: boolean;
    },
) {
    return (
        <nav class="lg:container lg:mx-auto mx-4">
            <div class="flex flex-col items-center gap-8">
                {content && content.items && content.items.length > 0 && (
                    <div class="flex flex-col gap-4">
                        {content.title && <h3 class="text-4xl leading-snug">{content.title}</h3>}
                        <ul
                            class={`flex gap-4 ${vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
                                }`}
                        >
                            {content.items.map((item) => {
                                return (
                                    <li>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${item.label} Logo`}
                                            class="flex gap-2 items-center"
                                        >
                                            <span class="block p-1 border rounded-full">
                                                <Icon size={40} id={item.label} />
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
