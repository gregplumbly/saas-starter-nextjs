import { client } from './sanity';

// Type definition for a blog post
export interface BlogPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  excerpt?: string;
  body: any; // This would be the Portable Text content
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
}

// Fetch all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      mainImage,
      excerpt,
      body,
      "author": author->{name, image}
    }`
  );
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      slug,
      mainImage,
      excerpt,
      body,
      "author": author->{name, image}
    }`,
    { slug }
  );
}

// Fetch all post slugs (useful for generating static pages)
export async function getAllPostSlugs(): Promise<string[]> {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  return slugs;
}
