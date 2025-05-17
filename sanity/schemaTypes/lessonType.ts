import { defineType, defineField } from 'sanity';

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'courseReference',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'Optional video for this section',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Used to order lessons within a course',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      course: 'courseReference.title',
    },
    prepare({ title, course }) {
      return {
        title,
        subtitle: course ? `Course: ${course}` : '',
      };
    },
  },
});
