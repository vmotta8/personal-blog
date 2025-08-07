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
      <header className="pt-24 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Hi, I'm Vinicius =]</h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            I'm a software engineer who enjoys building scalable solutions and solving real problems with code. I like sharing what I learn, exploring new technologies, and collaborating on projects.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="https://github.com/vmotta8" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:underline">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/vmotta8" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:underline">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24">
        <section>
          <h2 className="text-2xl font-semibold uppercase tracking-wider">Latest Posts</h2>
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
