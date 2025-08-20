import { Link } from "react-router-dom";
import { Post } from "@/data/posts";
import { Card } from "@/components/ui/card";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <article>
      <Link to={`/blog/${post.slug}`} className="block group">
        <Card className="retro-card rounded-none shadow-none">
          <div className="aspect-video w-full overflow-hidden border-b border-border">
            <img
              src={post.thumbnail}
              alt={`${post.title} thumbnail`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-medium group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <p className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString()} • {post.readTime}
            </p>
          </div>
        </Card>
      </Link>
    </article>
  );
};

export default PostCard;
