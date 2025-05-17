import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// In Next.js 16, params is an async property
type PageProps = {
  params: Promise<{ slug: string }>;
}

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
    // Add other lesson fields if needed for display
  }>;
  // Add other fields as necessary
}

async function getCourse(slug: string): Promise<CourseData | null> {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    title,
    slug,
    image,
    details,
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
    // Fetch other fields as needed
  }`;
  const course = await client.fetch(query, { slug });
  return course;
}

// Generate static paths for each course
export async function generateStaticParams() {
  const courses = await client.fetch<Array<{ current: string }>>(`*[_type == "course" && defined(slug.current)].slug`);
  // Return params in the format expected by Next.js 16
  return courses.map((slugObj) => ({ slug: slugObj.current }));
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  // Optionally, access existing metadata from parent
  // const previousImages = (await parent).openGraph?.images || [];

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

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    notFound(); // Triggers 404 page
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <div className="relative my-4 w-full h-96">
          <Image src={urlFor(value).url()} alt={value.alt || course.title} fill className="object-contain" />
        </div>
      ),
      // You can add custom components for other block types here
    },
    // Custom marks, blocks, lists etc. can be defined here
  };

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        {course.image && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg mb-6">
            <Image
              src={urlFor(course.image).width(1200).height(630).url()}
              alt={course.title}
              fill
              className="object-cover"
              priority // Good for LCP
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

          {course.lessons && course.lessons.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Lessons in this Course</h3>
              <ul className="space-y-2">
                {course.lessons.map((lesson) => (
                  <li key={lesson._key} className="p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow">
                    {/* For now, just display title. Later, this could be a link to the lesson page */}
                    <span className="text-gray-800">{lesson.title}</span>
                    {/* <Link href={`/online-courses/${course.slug.current}/lessons/${lesson.slug.current}`}>
                      <a className="text-blue-600 hover:underline">{lesson.title}</a>
                    </Link> */}
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
