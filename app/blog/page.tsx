import { urlFor } from "@/lib/sanity";
import { getAllPosts } from "@/lib/sanity-utils";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Level Up AI Skills",
  description: "Read our latest articles on AI skills and development",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
        Blog
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post._id} 
            href={`/blog/${post.slug.current}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group-hover:translate-y-[-5px]">
              {post.mainImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center">
                  {post.author?.image && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={urlFor(post.author.image).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {post.author?.name && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
