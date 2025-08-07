import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts } from "@/data/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

const assetModules = import.meta.glob('../assets/*', { eager: true, as: 'url' });

const VideoComponent = ({ src, alt }: { src?: string; alt?: string }) => {
  if (!src) return null;

  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const isVideo = videoExtensions.some(ext => src.toLowerCase().includes(ext));

  if (isVideo) {
    let videoUrl = src;
    for (const [path, url] of Object.entries(assetModules)) {
      if (path.endsWith(src)) {
        videoUrl = url as string;
        break;
      }
    }

    return (
      <video controls className="w-full my-4">
        <source src={videoUrl} type="video/mp4" />
        {alt && <p>{alt}</p>}
        Your browser does not support the video element.
      </video>
    );
  }

  return <img src={src} alt={alt} />;
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-24">
        <h1 className="text-3xl font-semibold uppercase tracking-wider">Post Not Found</h1>
        <p className="mt-2 text-muted-foreground">The post you are looking for does not exist.</p>
        <div className="mt-6">
          <Button asChild variant="retro"><Link to="/blog">Back to Blog</Link></Button>
        </div>
      </main>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: { '@type': 'Person', name: 'Vinicius' },
    datePublished: post.date,
    image: post.thumbnail,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-24">
      <Helmet>
        <title>{post.title} — Vinicius</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight uppercase">{post.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">
          {new Date(post.date).toLocaleDateString()} • {post.readTime}
        </p>
      </header>

      <figure className="border border-border">
        <img src={post.thumbnail} alt={`${post.title} hero image`} className="w-full" loading="lazy" />
      </figure>

      <article className="prose dark:prose-invert max-w-none mt-8 
                          dark:prose-headings:text-gray-100 
                          dark:prose-p:text-gray-200 
                          dark:prose-li:text-gray-200 
                          dark:prose-strong:text-gray-100
                          dark:prose-code:text-gray-200
                          dark:prose-pre:bg-gray-800
                          dark:prose-blockquote:text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: VideoComponent,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="mt-10">
        <Button asChild variant="outline"><Link to="/blog">← Back to Blog</Link></Button>
      </div>
    </main>
  );
};

export default BlogPost;
