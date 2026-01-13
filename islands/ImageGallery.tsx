import Image from "apps/website/components/Image.tsx";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string; // link público do Drive (se houver)
}

interface Props {
  files?: DriveFile[];

  displayStyle?: "grid" | "list";
}

export default function ImageGalleryList(props: Props) {
  const {
    files = [],
    displayStyle = "grid",
  } = props;

  function handleDownload(file: DriveFile) {
    if (!file.webContentLink) {
      alert("Link de download indisponível");
      return;
    }

    const a = document.createElement("a");
    a.href = file.webContentLink;
    a.target = "_blank"; // ou remover se preferir
    // a.download = file.name; // Nem sempre Drive respeita esse nome
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div class="w-full p-4">
      <div
        class={displayStyle === "grid"
          ? "grid grid-cols-2 md:grid-cols-4 gap-4"
          : "flex flex-col gap-4"}
      >
        {files.map((file) => (
          <div key={file.id} class="relative group">
            <Image
              src={file.webContentLink || ""}
              alt={file.name}
              width={200}
              height={200}
              class="w-full h-auto"
            />
            <button
              class="absolute bottom-2 right-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
              onClick={() => handleDownload(file)}
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
  const mockFiles: DriveFile[] = [
    {
      id: "1",
      name: "Exemplo",
      mimeType: "image/png",
      webContentLink: "https://via.placeholder.com/200?text=Mock",
    },
  ];

  return <ImageGalleryList files={mockFiles} displayStyle="grid" />;
}
