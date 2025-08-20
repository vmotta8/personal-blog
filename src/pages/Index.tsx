import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { posts } from "@/data/posts";

const Index = () => {
  const featured = posts[0];

  return (
    <>
      <Helmet>
        <title>Vinicius Motta</title>
        <meta name="description" content="Personal Blog." />
        <link rel="canonical" href="/" />
      </Helmet>
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32">
        <div className="relative crt">
          {/* About block */}
          <section className="retro-card p-4">
            <p className="text-sm text-muted-foreground leading-6 caret">
              Software engineer who enjoys building scalable solutions and solving real problems with code. I like sharing what I learn, exploring new technologies, and collaborating on projects.
            </p>
          </section>

          {/* Featured article */}
          {featured && (
            <section className="mt-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Featured</p>
              <Link to={`/blog/${featured.slug}`} className="group mt-2 block">
                <div className="retro-card p-3">
                  <div className="flex gap-3 items-start">
                    <img
                      src={featured.thumbnail}
                      alt={`${featured.title} thumbnail`}
                      className="h-20 w-32 object-cover border border-border"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-medium group-hover:underline underline-offset-4 truncate">
                        {featured.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {featured.excerpt}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">
                        {new Date(featured.date).toLocaleDateString()} • {featured.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mt-3">
                <Button asChild size="sm" variant="outline">
                  <Link to="/blog">More Posts →</Link>
                </Button>
              </div>
            </section>
          )}

          {/* Now / links */}
          <section className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span>Now: building, learning, writing.</span>
            <span className="hidden sm:inline">|</span>
            <a href="https://github.com/vmotta8" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vmotta8" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <Link to="/blog" className="hover:underline">RSS</Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
