import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity'; // Assuming urlFor is in sanity.ts or a similar util

interface Course {
  title: string;
  slug: { current: string };
  image: any; // Sanity image asset
  description: string;
  // Add other relevant fields if needed, e.g., teacher name, price
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/online-courses/${course.slug.current}`}>
        <div className="relative h-48 w-full">
          {course.image && (
            <Image
              src={urlFor(course.image).width(400).height(300).url()}
              alt={course.title}
              fill
              className="object-cover" // Handles object-fit
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-700 text-sm mb-4">
            {course.description.substring(0, 100)}...
          </p>
          {/* You can add more details here, e.g., teacher, price, tags */}
        </div>
      </Link>
    </div>
  );
}
