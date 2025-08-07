import fm from "front-matter";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  readTime: string; // e.g., "6 min read"
  excerpt: string;
  tags: string[];
  thumbnail: string;
  content: string; // markdown
};

interface PostFrontMatter {
  slug?: string;
  title?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  tags?: string[];
  thumbnail?: string;
}

// Load markdown files (raw content) from src/posts
const markdownFiles = import.meta.glob("../posts/*.md", { eager: true, as: "raw" });

// Load asset urls to resolve thumbnails
const imageFiles = import.meta.glob("../assets/*", { eager: true, as: "url" });

function resolveThumbnail(fileName?: string): string {
  if (!fileName) return "";
  for (const [path, url] of Object.entries(imageFiles)) {
    if (path.endsWith(fileName)) return url as string;
  }
  return "";
}

export const posts: Post[] = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const { attributes, body } = fm<PostFrontMatter>(raw as string);
    const d = attributes || {};
    const slug = d.slug ?? path.split("/").pop()!.replace(/\.md$/, "");
    return {
      slug,
      title: d.title ?? slug,
      date: d.date ?? "",
      readTime: d.readTime ?? "",
      excerpt: d.excerpt ?? "",
      tags: Array.isArray(d.tags) ? d.tags : [],
      thumbnail: resolveThumbnail(d.thumbnail),
      content: body,
    } as Post;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
