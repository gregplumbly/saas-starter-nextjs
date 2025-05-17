import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// Define the structure of your course data
interface CourseData {
  title: string;
  slug: { current: string };
  image: any;
  details: any[]; // Portable Text
  teacher: {
    name: string;
    image?: any;
    bio?: any[]; // Portable Text
  };
  lessons: Array<{
    _key: string;
    title: string;
    slug: { current: string };
  }>;
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
}

async function getCourse(slug: string): Promise<CourseData | null> {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    title,
    slug,
    image,
    details,
    "categories": categories[]->{ title, slug },
    teacher->{
      name,
      image,
      bio
    },
    lessons[]->{
      _key,
      title,
      slug
    }
  }`;
  const course = await client.fetch(query, { slug });
  return course;
}

// Define types for generateStaticParams
interface CourseWithCategories {
  slug: string;
  categories: string[];
}

// Generate static paths for each course with its category
export async function generateStaticParams() {
  const query = `*[_type == "course" && defined(slug.current) && count(categories) > 0] {
    "slug": slug.current,
    "categories": categories[]->slug.current
  }`;
  
  const courses = await client.fetch<CourseWithCategories[]>(query);
  
  // Create params for each course under each of its categories
  const params: Array<{category: string, slug: string}> = [];
  
  courses.forEach((course: CourseWithCategories) => {
    // If a course has multiple categories, create a path for each category
    if (course.categories && course.categories.length > 0) {
      course.categories.forEach((categorySlug: string) => {
        params.push({
          category: categorySlug,
          slug: course.slug
        });
      });
    } else {
      // Fallback to "uncategorized" if no categories (optional)
      params.push({
        category: "uncategorized",
        slug: course.slug
      });
    }
  });
  
  return params;
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: Promise<{ category: string, slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} | Level Up AI Skills`,
    description: course.details ? course.details.map(block => block.children.map((child:any) => child.text).join('')).join(' ').substring(0, 160) : 'Learn more about this course.',
    openGraph: {
      title: course.title,
      description: course.details ? course.details.map(block => block.children.map((child:any) => child.text).join('')).join(' ').substring(0, 160) : 'Learn more about this course.',
      images: course.image ? [urlFor(course.image).width(1200).height(630).url()] : [],
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    notFound(); // Triggers 404 page
  }

  // Verify that this course belongs to the specified category
  const belongsToCategory = course.categories?.some(
    category => category.slug.current === resolvedParams.category
  );

  if (!belongsToCategory) {
    // Either redirect to the correct category or show 404
    notFound();
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <div className="relative my-4 w-full h-96">
          <Image src={urlFor(value).url()} alt={value.alt || course.title} fill className="object-contain" />
        </div>
      ),
    },
  };

  return (
    <article>
      <header className="mb-8">
        <div className="mb-4">
          <Link href={`/online-courses/${resolvedParams.category}`} className="text-blue-600 hover:underline">
            ← Back to {resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)} Courses
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        {course.image && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg mb-6">
            <Image
              src={urlFor(course.image).width(1200).height(630).url()}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-semibold mb-3">Course Details</h2>
          {course.details ? (
            <PortableText value={course.details} components={portableTextComponents} />
          ) : (
            <p>No details available for this course.</p>
          )}
        </div>

        <aside className="md:col-span-1 space-y-6">
          {course.teacher && (
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">About the Instructor</h3>
              {course.teacher.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={urlFor(course.teacher.image).width(100).height(100).url()}
                    alt={course.teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h4 className="text-lg font-medium text-center">{course.teacher.name}</h4>
              {course.teacher.bio && (
                <div className="text-sm text-gray-600 mt-2 prose prose-sm">
                  <PortableText value={course.teacher.bio} />
                </div>
              )}
            </section>
          )}

          {course.categories && course.categories.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {course.categories.map((category) => (
                  <Link 
                    key={category.slug.current}
                    href={`/online-courses/${category.slug.current}`}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {course.lessons && course.lessons.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Lessons in this Course</h3>
              <ul className="space-y-2">
                {course.lessons.map((lesson) => (
                  <li key={lesson._key} className="p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-gray-800">{lesson.title}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </article>
  );
}
