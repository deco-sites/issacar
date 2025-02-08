import ImageGalleryList from "site/islands/ImageGallery.tsx";

interface Props {
    folderId: string;
    accessToken: string;
    maxImages?: number;
    displayStyle?: "grid" | "list";
  }
export default function ImageGalleryView({
    folderId = "mock-folder-id",
    accessToken = "mock-access-token",
    maxImages = 10,
    displayStyle = "grid",
}: Props) {
   
  return (
    <ImageGalleryList folderId={folderId} accessToken={accessToken} maxImages={maxImages} displayStyle={displayStyle} />
  );
}