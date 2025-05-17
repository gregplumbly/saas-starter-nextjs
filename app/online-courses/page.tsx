import { client } from '@/lib/sanity';
import CourseCard from '@/components/CourseCard';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Online Courses | Level Up AI Skills',
  description: 'Browse our collection of online courses to level up your AI skills.',
};

async function getCourses() {
  const query = `*[_type == "course" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
    title,
    slug,
    image,
    description,
    "categories": categories[]->{ title, slug },
    "teacher": teacher->name
  }`;
  const courses = await client.fetch(query);
  return courses;
}

async function getCategories() {
  // Only fetch categories that have at least one associated course
  const query = `*[_type == "category" && defined(slug.current) && count(*[_type=="course" && references(^._id)]) > 0] | order(title asc) {
    title,
    slug,
    description,
    "courseCount": count(*[_type=="course" && references(^._id)])
  }`;
  const categories = await client.fetch(query);
  return categories;
}

export default async function OnlineCoursesPage() {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories()
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Our Online Courses</h1>
      
      {/* Category Navigation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category: any) => (
            <Link 
              key={category.slug.current}
              href={`/online-courses/${category.slug.current}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors flex items-center gap-2"
            >
              <span>{category.title}</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                {category.courseCount}
              </span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => {
            // Get the first category for the course URL, or use a default
            const primaryCategory = course.categories && course.categories.length > 0 
              ? course.categories[0].slug.current 
              : 'uncategorized';
              
            return (
              <div key={course.slug.current} className="course-card-wrapper">
                <CourseCard 
                  course={course}
                  linkPrefix={`/online-courses/${primaryCategory}`}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No courses available at the moment. Check back soon!</p>
      )}
    </div>
  );
}
