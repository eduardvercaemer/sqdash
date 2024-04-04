import type { RequestHandler } from "@builder.io/qwik-city";
import type { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

function isCloudflarePagesPlatform(p: any): p is PlatformCloudflarePages {
  return !!p.ctx;
}

// noinspection JSUnusedGlobalSymbols
export const onRequest: RequestHandler = async (e) => {
  const platform = e.platform;
  if (isCloudflarePagesPlatform(platform)) {
    e.sharedMap.set("pages", true);
    e.sharedMap.set("db", platform.env!["DB"]);
  } else {
    const { binding } = await import("cf-bindings-proxy");
    e.sharedMap.set("pages", false);
    e.sharedMap.set("db", binding("DB"));
  }
};
