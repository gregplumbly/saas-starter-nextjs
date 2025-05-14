import { urlFor } from "@/lib/sanity";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
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
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-orange-500 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
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
