import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @description Google Drive folder ID to fetch images from
   */
  folderId: string;
  /**
   * @description OAuth token for Google Drive authentication
   */
  accessToken: string;
  /**
   * @description Maximum number of images to display
   */
  maxImages?: number;
  /**
   * @description Layout style for displaying images
   */
  displayStyle?: "grid" | "list";
}

const defaultProps: Props = {
  folderId: "mock-folder-id",
  accessToken: "mock-access-token",
  maxImages: 10,
  displayStyle: "grid",
};

export default function ImageGallery(props: Props) {
  props.folderId ??= defaultProps.folderId;
  props.accessToken ??= defaultProps.accessToken;
  props.maxImages ??= defaultProps.maxImages;
  props.displayStyle ??= defaultProps.displayStyle;

  const { displayStyle } = props;

  return (
    <div class="w-full p-4">
      <div class={displayStyle === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div class="relative group">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC"
              alt={`Image ${i + 1}`}
              width={200}
              height={200}
              class="w-full h-auto"
            />
            <button class="absolute bottom-2 right-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-100">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Preview() {
  return <ImageGallery {...defaultProps} />;
}