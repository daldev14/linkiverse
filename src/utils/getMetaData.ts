import { LINKS } from "../data/links";
import * as cheerio from "cheerio";

export async function getAllMetadaData() {
  return await Promise.all(
    LINKS.map(async (link) => {
      const metadata = await getMetaData(link.url);
      return {
        ...link,
        ...metadata,
      };
    })
  );
}

async function getMetaData(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error("No se pudo obtener el contenido de la URL");

    const content = await response.text();
    const $ = cheerio.load(content);

    const metadata = {
      title: $("title").text(),
      description: $('meta[name="description"]').attr("content"),
      imageUrl: $('meta[property="og:image"]').attr("content"),
      ogDescription: $('meta[property="og:description"]').attr("content"),
      ogTitle: $('meta[property="og:title"]').attr("content"),
      ogImageAlt: $('meta[property="og:image:alt"]').attr("content"),
      ogType: $('meta[property="og:type"]').attr("content"),
      appName: $('meta[name="application-name"]').attr("content"),
      favicon: $('link[rel="icon"], link[rel="shortcut icon"]').attr("href"),
    };

    return metadata;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error al obtener los metadatos:", error.message);
    return null;
  }
}
