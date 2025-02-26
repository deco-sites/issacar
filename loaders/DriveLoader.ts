// apps/website/loaders/myDriveLoader.ts
import { google } from "npm:googleapis@latest";
import { AppContext } from "site/apps/site.ts";

/**
 * Props que o Admin DECO pode preencher ao configurar esse bloco/loader.
 */
export interface Props {
  folderId?: string;
  pageSize?: number;
}

/**
 * Estrutura de arquivo que retornaremos ao componente.
 */
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

/**
 * A visibilidade controla se este loader está disponível para outros blocos e apps.
 * Você pode usar "public", "private", etc.
 */
export const defaultVisibility = "public";

/**
 * Loader no novo formato:
 * (props: Props, req: Request, ctx: AppContext) => Promise<...>
 */
const loader = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<DriveFile[] | null> => {
  try {
    // Lê props do bloco
    const folderId = props.folderId ?? "xxxxxx";
    const pageSize = props.pageSize ?? 10;

    // Lê a credencial do Service Account do environment
    const serviceAccountJson = Deno.env.get("SERVICE_ACCOUNT_JSON");
    if (!serviceAccountJson) {
      console.error("Falta SERVICE_ACCOUNT_JSON no env!");
      return null;
    }

    // Parse do JSON da Service Account
    const credentials = JSON.parse(serviceAccountJson);

    // Cria o Auth via Service Account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    // Cria a instância da API Drive
    const drive = google.drive({ version: "v3", auth });

    // Monta a query para listar arquivos na pasta
    const query = `'${folderId}' in parents`;
    const response = await drive.files.list({
      q: query,
      pageSize,
      fields: "files(id,name,mimeType)",
    });

    // Mapeia a resposta em objetos DriveFile
    const files = response.data.files?.map((file) => ({
      id: file.id ?? "",
      name: file.name ?? "",
      mimeType: file.mimeType ?? "",
    })) || [];

    return files;
  } catch (err) {
    console.error("Erro no loader myDriveLoader:", err);
    return null;
  }
};

export default loader;
