import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import PostCard from "@/components/PostCard";

const Index = () => {
  const latest = posts.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>Vinicius Motta</title>
        <meta name="description" content="Personal Blog." />
        <link rel="canonical" href="/" />
      </Helmet>
      <header className="pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-left">
          <p className="mt-0 text-sm text-muted-foreground max-w-2xl">
            Software engineer who enjoys building scalable solutions and solving real problems with code. I like sharing what I learn, exploring new technologies, and collaborating on projects.
          </p>
          <div className="mt-6 flex items-center justify-start gap-4">
            <a href="https://github.com/vmotta8" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:underline">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/vmotta8" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:underline">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24">
        <section>
          <h2 className="text-xl font-semibold uppercase tracking-wider">Latest Posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="retro">
              <Link to="/blog">See All Posts</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
