import { defineType, defineField } from 'sanity';

export const courseType = defineType({
  name: 'course',
  title: 'Course',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teacher',
      title: 'Teacher',
      type: 'reference',
      to: [{ type: 'teacher' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPaid',
      title: 'Is Paid Course',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      hidden: ({ document }) => !document?.isPaid,
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'lesson' }],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'details',
      title: 'Full Course Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      teacher: 'teacher.name',
      media: 'image',
      paid: 'isPaid',
    },
    prepare({ title, teacher, media, paid }) {
      return {
        title,
        subtitle: `${teacher ? `by ${teacher}` : ''} ${paid ? '(Paid)' : '(Free)'}`,
        media,
      };
    },
  },
});
