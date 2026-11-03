type PublicPageMetaProps = {
  title: string;
  description: string;
  robots?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphType?: "website" | "article";
  canonicalPath?: string;
};

function getPublicSiteOrigin() {
  const configuredOrigin = import.meta.env.VITE_PUBLIC_SITE_ORIGIN?.trim();
  if (!configuredOrigin) return undefined;

  try {
    const url = new URL(configuredOrigin);
    const hostname = url.hostname.toLowerCase();
    const isPreviewHost =
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".trycloudflare.com") ||
      hostname.endsWith(".vercel.app") ||
      hostname.endsWith(".netlify.app") ||
      hostname.endsWith(".pages.dev");

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.port ||
      isPreviewHost
    ) {
      return undefined;
    }

    return url.origin;
  } catch {
    return undefined;
  }
}

export default function PublicPageMeta({
  title,
  description,
  robots,
  openGraphTitle,
  openGraphDescription,
  openGraphType = "website",
  canonicalPath,
}: PublicPageMetaProps) {
  const origin = canonicalPath?.startsWith("/") ? getPublicSiteOrigin() : undefined;
  const canonicalUrl = origin && canonicalPath ? new URL(canonicalPath, origin).href : undefined;

  useEffect(() => {
    document.getElementById("jobfree-title-fallback")?.remove();
    document.getElementById("jobfree-description-fallback")?.remove();
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      <meta property="og:title" content={openGraphTitle ?? title} />
      <meta property="og:description" content={openGraphDescription ?? description} />
      <meta property="og:type" content={openGraphType} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
    </>
  );
}
import { useEffect } from "react";
