import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

interface Course {
  title: string;
  slug: { current: string };
  image: any;
  description: string;
  teacher?: string;
  categories?: Array<{ title: string; slug: { current: string } }>;
}

interface CourseCardProps {
  course: Course;
  linkPrefix?: string;
}

export default function CourseCard({ course, linkPrefix = '/online-courses' }: CourseCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`${linkPrefix}/${course.slug.current}`}>
        <div className="relative h-48 w-full">
          {course.image && (
            <Image
              src={urlFor(course.image).width(400).height(300).url()}
              alt={course.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-700 text-sm mb-4">
            {course.description.substring(0, 100)}...
          </p>
          {course.teacher && (
            <p className="text-sm text-gray-500">Instructor: {course.teacher}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
