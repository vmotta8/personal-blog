import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { posts as allPosts } from "@/data/posts";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PAGE_SIZE = 6;

const BlogList = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const tags = useMemo(() => {
    const set = new Set<string>();
    allPosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allPosts.filter((p) => {
      const matchesQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const go = (n: number) => setPage(Math.min(totalPages, Math.max(1, n)));

  const count = filtered.length;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24">
      <Helmet>
        <title>Vinicius Motta - Blog</title>
        <meta name="description" content="Blog." />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <div className="relative crt">
        <h1 className="text-2xl font-semibold tracking-wider uppercase">Latest Posts</h1>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{count} posts</p>
        <p className="mt-1 text-xs text-muted-foreground">Search and filter by tag.</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Input
            placeholder="Search posts..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            aria-label="Search posts"
            className="h-8 text-sm"
          />
          <Button size="sm" variant="retro" onClick={() => { setQuery(""); setActiveTag(null); setPage(1); }}>
            Clear
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTag === null ? "retro" : "outline"}
            onClick={() => { setActiveTag(null); setPage(1); }}
          >All</Button>
          {tags.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={activeTag === t ? "retro" : "outline"}
              onClick={() => { setActiveTag(t === activeTag ? null : t); setPage(1); }}
            >{t.toUpperCase()}</Button>
          ))}
        </div>

        <Separator className="my-5" />

        {pageItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts match your search.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pageItems.map((p) => (
              <Link to={`/blog/${p.slug}`} key={p.slug} className="group block">
                <div className="retro-card p-3">
                  <div className="flex gap-3 items-start">
                    <img
                      src={p.thumbnail}
                      alt={`${p.title} thumbnail`}
                      className="h-20 w-32 object-cover border border-border"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-medium group-hover:underline underline-offset-4 truncate">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {p.excerpt}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">
                        {new Date(p.date).toLocaleDateString()} • {p.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button size="sm" variant="outline" onClick={() => go(page - 1)} disabled={page === 1}>
            Prev
          </Button>
          <p className="text-xs uppercase tracking-wider">Page {page} / {totalPages}</p>
          <Button size="sm" variant="outline" onClick={() => go(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BlogList;
