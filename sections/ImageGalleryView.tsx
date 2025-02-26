import ImageGalleryList from "site/islands/ImageGallery.tsx";

export interface Props {
  folderId?: string;
  pageSize?: number;
}
export default function ImageGalleryView({
    folderId = "mock-folder-id",
  pageSize = 10,
}: Props) {
   
  return (
    <ImageGalleryList folderId={folderId} accessToken={accessToken} maxImages={maxImages} displayStyle={displayStyle} />
  );
}