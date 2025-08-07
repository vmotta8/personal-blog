import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { posts as allPosts } from "@/data/posts";
import PostCard from "@/components/PostCard";
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

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24">
      <Helmet>
        <title>Vinicius Motta - Blog</title>
        <meta name="description" content="Blog." />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <h1 className="text-3xl font-semibold tracking-wider uppercase">Latest Posts</h1>
      <p className="mt-2 text-sm text-muted-foreground">Search and filter by tag.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          aria-label="Search posts"
        />
        <Button variant="retro" onClick={() => { setQuery(""); setActiveTag(null); setPage(1); }}>
          Clear
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={activeTag === null ? "retro" : "outline"}
          onClick={() => { setActiveTag(null); setPage(1); }}
        >All</Button>
        {tags.map((t) => (
          <Button
            key={t}
            variant={activeTag === t ? "retro" : "outline"}
            onClick={() => { setActiveTag(t === activeTag ? null : t); setPage(1); }}
          >{t.toUpperCase()}</Button>
        ))}
      </div>

      <Separator className="my-6" />

      {pageItems.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {pageItems.map((p) => (
            <PostCard post={p} key={p.slug} />
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button variant="outline" onClick={() => go(page - 1)} disabled={page === 1}>
          Prev
        </Button>
        <p className="text-xs uppercase tracking-wider">Page {page} / {totalPages}</p>
        <Button variant="outline" onClick={() => go(page + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </main>
  );
};

export default BlogList;
