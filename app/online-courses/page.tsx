import { client } from '@/lib/sanity'; // Assuming client is exported from sanity.ts
import CourseCard from '@/components/CourseCard'; // Adjust path if necessary
import { Metadata } from 'next';

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
    // Add any other fields you need for the card, e.g., teacher->{name}
  }`;
  const courses = await client.fetch(query);
  return courses;
}

export default async function OnlineCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Online Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <CourseCard key={course.slug.current} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No courses available at the moment. Check back soon!</p>
      )}
    </div>
  );
}
