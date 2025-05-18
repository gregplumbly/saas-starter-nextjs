import { urlFor } from "@/lib/sanity";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Utility function to extract YouTube video ID from various YouTube URL formats
function getYouTubeVideoId(url: string): string | null {
  // Regular expression to match YouTube URLs and extract video ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Custom YouTube component to avoid nesting div inside p (which causes hydration errors)
function YouTubeEmbed({ id, caption }: { id: string; caption?: React.ReactNode }) {
  return (
    <div className="my-8">
      <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
        <iframe 
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
      {caption && <p className="text-sm text-gray-500 mt-2">{caption}</p>}
    </div>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | Level Up AI Skills",
    };
  }
  
  return {
    title: `${post.title} | Level Up AI Skills`,
    description: post.excerpt || `Read about ${post.title}`,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog post image"}
            fill
            className="object-contain"
          />
        </div>
      );
    },
    // Add support for code blocks
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4">
          <code>{value?.code}</code>
        </pre>
      );
    },
    // Add custom YouTube block type
    youtube: ({ value }: any) => {
      if (!value?.url) return null;
      const youtubeId = getYouTubeVideoId(value.url);
      if (!youtubeId) return null;
      
      return <YouTubeEmbed id={youtubeId} caption={value.caption} />;
    },
  },
  // Style marks like bold, italic, etc.
  marks: {
    link: ({ children, value }: any) => {
      const href = value.href || '';
      const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined;
      
      // Check if this is a YouTube link
      const youtubeId = getYouTubeVideoId(href);
      
      if (youtubeId) {
        // Use a span with display:inline-block instead of div to avoid hydration errors
        // when the link is inside a paragraph
        return (
          <span className="inline-block">
            <Link href={href} rel={rel} className="text-orange-500 hover:underline">
              {children}
            </Link>
          </span>
        );
      }
      
      // Regular link
      return (
        <Link
          href={href}
          rel={rel}
          className="text-orange-500 hover:underline"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm">{children}</code>
    ),
    underline: ({ children }: any) => <span className="underline">{children}</span>,
    'strike-through': ({ children }: any) => <span className="line-through">{children}</span>,
    highlight: ({ children }: any) => <span className="bg-yellow-200 dark:bg-yellow-800">{children}</span>,
  },
  // Block styles for headings, lists, etc.
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 my-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 my-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = post._createdAt
    ? new Date(post._createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/blog" className="text-orange-500 hover:underline mb-8 inline-block">
        ← Back to all posts
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-8">{post.title}</h1>
      
      <div className="flex items-center mb-8">
        {post.author?.image && (
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          {post.author?.name && (
            <p className="font-medium">{post.author.name}</p>
          )}
          {formattedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
          )}
        </div>
      </div>
      
      {post.mainImage && (
        <div className="relative w-full h-[60vh] mb-12">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.body ? (
          <PortableText value={post.body} components={ptComponents} />
        ) : (
          <p>No content available for this post.</p>
        )}
      </div>
    </article>
  );
}
