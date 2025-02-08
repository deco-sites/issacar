import { useEffect, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";

interface Props {
  folderId: string;
  accessToken: string;
  maxImages?: number;
  displayStyle?: "grid" | "list";
}

const defaultProps: Props = {
  folderId: "mock-folder-id",
  accessToken: "mock-access-token",
  maxImages: 10,
  displayStyle: "grid",
};

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  // ...
}

export default function ImageGalleryList(props: Props) {
  props = { ...defaultProps, ...props };

  const { folderId, accessToken, maxImages, displayStyle } = props;

  const [images, setImages] = useState<{ id: string; url: string; name: string }[]>([]);

  useEffect(() => {
    if (!folderId || !accessToken) return;

    async function fetchImages() {
      try {
        // 1) Listar arquivos na pasta (apenas imagens)
        //    &fields=files(id,name,mimeType,...) para filtrar dados que você quer
        const listRes = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,mimeType)&pageSize=${maxImages}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const listData = await listRes.json() as { files: DriveFile[] };

        // 2) Para cada arquivo, buscar o conteúdo (blob) usando alt=media
        //    e então criar um ObjectURL para exibir no <img>.
        const imageDataPromises = listData.files.map(async (file) => {
          const fileRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!fileRes.ok) {
            throw new Error(`Falha ao buscar arquivo ${file.name}`);
          }

          const blob = await fileRes.blob();
          const url = URL.createObjectURL(blob);

          return {
            id: file.id,
            name: file.name,
            url,
          };
        });

        const imagesResult = await Promise.all(imageDataPromises);
        
        setImages(imagesResult);
      } catch (err) {
        console.error("Erro ao carregar imagens do Drive:", err);
      }
    }

    fetchImages();
  }, [folderId, accessToken, maxImages]);

  function handleDownload(image: { id: string; name: string; url: string }) {
    // Você pode simplesmente criar um link e "clicar" nele
    const a = document.createElement("a");
    a.href = image.url;
    a.download = image.name; // Nome do arquivo no download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div class="w-full p-4">
      <div class={displayStyle === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {images.map((img) => (
          <div key={img.id} class="relative group">
            <Image
              src={img.url}
              alt={img.name}
              width={200}
              height={200}
              class="w-full h-auto"
            />
            <button
              class="absolute bottom-2 right-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
              onClick={() => handleDownload(img)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Preview() {
  return <ImageGalleryList {...defaultProps} />;
}

