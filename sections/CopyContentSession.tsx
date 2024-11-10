import CopyContent from "site/islands/CopyContent.tsx";

export interface Props {
  contentCopy: string;
}

export default function Copy({
  contentCopy = "",
}: Props) {
  return <CopyContent contentCopy={contentCopy} />;
}
