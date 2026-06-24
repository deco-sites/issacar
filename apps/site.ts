import website, { Props } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type App, type AppContext as AC } from "@deco/deco";
type WebsiteApp = ReturnType<typeof website>;
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://decoims.com/issacar/e4294445-575d-4364-a38e-6a5edb488f07/0ac02239-61e6-4289-8a36-e78c0975bcc8.jpg
 */
export default function Site(state: Props): App<Manifest, Props, [
  WebsiteApp,
]> {
  return {
    state,
    manifest,
    dependencies: [
      website(state),
    ],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
