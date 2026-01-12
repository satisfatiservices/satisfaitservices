import { client } from "@/sanity/lib/client";
import { Footer } from "./Footer";

async function getFooterData() {
  try {
    // Skip if projectId is not configured (placeholder value)
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder-project-id') {
      return null;
    }
    const query = `*[_type == "footer"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch footer data from Sanity:', error);
    return null;
  }
}

export async function FooterWrapper() {
  const data = await getFooterData();
  return <Footer data={data} />;
}
