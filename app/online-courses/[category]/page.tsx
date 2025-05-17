import { client } from '@/lib/sanity';
import CourseCard from '@/components/CourseCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate metadata dynamically based on category
export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = await getCategory(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found | Level Up AI Skills',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.title} Courses | Level Up AI Skills`,
    description: category.description || `Browse our collection of ${category.title} courses to level up your AI skills.`,
  };
}

async function getCategory(slug: string) {
  console.log('Fetching category with slug:', slug);
  const query = `*[_type == "category" && slug.current == $slug][0] {
    title,
    description
  }`;
  
  const result = await client.fetch(query, { slug });
  console.log('Category query result:', result);
  return result;
}

async function getCoursesByCategory(categorySlug: string) {
  console.log('Fetching courses for category slug:', categorySlug);
  const query = `*[_type == "course" && defined(slug.current) && defined(publishedAt) && 
    count((categories[]->slug.current)[@ == $categorySlug]) > 0] | order(publishedAt desc) {
    title,
    slug,
    image,
    description,
    "categories": categories[]->{ title, slug },
    "teacher": teacher->name
  }`;
  
  const courses = await client.fetch(query, { categorySlug });
  console.log('Courses query result count:', courses?.length || 0);
  return courses;
}

export async function generateStaticParams() {
  const query = `*[_type == "category" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);
  
  return slugs.map((slug: string) => ({
    category: slug,
  }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCategory(params.category);
  
  if (!category) {
    notFound();
  }
  
  const courses = await getCoursesByCategory(params.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/online-courses" className="text-blue-600 hover:underline">
          ← Back to All Courses
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2">{category.title} Courses</h1>
      {category.description && (
        <p className="text-center text-gray-600 mb-8">{category.description}</p>
      )}
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <div key={course.slug.current} className="course-card-wrapper">
              <CourseCard 
                course={course}
                linkPrefix={`/online-courses/${params.category}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No courses available in this category at the moment. Check back soon!</p>
      )}
    </div>
  );
}
