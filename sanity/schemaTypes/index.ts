import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {courseType} from './courseType'
import {teacherType} from './teacherType'
import {lessonType} from './lessonType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, courseType, teacherType, lessonType],
}
